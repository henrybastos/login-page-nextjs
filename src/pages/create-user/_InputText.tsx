import { useState } from "react";
import { Heading, Input, InputGroup, InputRightElement, Flex, Box, IconButton, Skeleton, Tooltip, Spinner, Text, Progress, Button  } from "@chakra-ui/react";
import CreateUserModel from '../../app/CreateUserModel';
import { EventEmitter } from "events";

type Props = {
    title: string;
    validationType: string;
    placeholder?: string;
    setValidations?: Function;
    validations?: object;
    modelRunChecks?: Function;
    debounceChecks?: Function;
    emmiter?: EventEmitter;
    subscribeFunc?: Function;
}

export default function _PasswordField (props: Props) {
    let [errorMessage, setErrorMessage] = useState('');
    let [isTextValid, setIsTextValid] = useState(true);
    let [isVerifying, setIsVerifying] = useState(false);
    let [text, setText] = useState('');

    const Model = new CreateUserModel();
    const Emmiter = new EventEmitter();

    if (props?.emmiter) {
        props?.emmiter.on("shit", () => {
            console.log('I shit alot!');
        });
    }

    function calledFromInside () {
        console.log('Hello from the inside!');
    }
    
    const debounce = (callback: Function, delay: number) => {
        let timeout: ReturnType<typeof setTimeout>;

        return (...args: Array<unknown>) => {
            clearTimeout(timeout);
            console.log('Restart...');
            timeout = setTimeout(() => { callback(...args) }, delay);
        }
    }

    function callCheckEmail (event: string) {
        setText(event);
        debounce(() => {
            // Model.checkEmail(event);
            console.log('Debounce!');
        }, 2000);
    };
    
    
    function checkInput (event: string) {
        setIsVerifying(true);
        
        props?.validationType === "Username" ? setText(event?.trim()) : setText(event);

        Model.runChecks(
            event?.trim(),
            setIsTextValid, 
            setText, 
            text, 
            props.validationType, 
            setIsVerifying, 
            setErrorMessage
        );
    }

    return (
        <Box w={{sm: "100%", md: "calc(50% - 8px)", lg: "calc(50% - 8px)"}}>
            <Heading mb="4px" size="md">{props.title}</Heading>
            <InputGroup>
                <Input 
                    bg="white" 
                    type="text"
                    onChange={(event) => checkInput(event?.currentTarget?.value)} 
                    placeholder={props.placeholder || ''}
                    isInvalid={!isTextValid && !isVerifying}
                    value={text}
                />
            </InputGroup>
            {
                isVerifying ? 
                    <Progress mx="4px" my="8px" colorScheme="green" size="xs" isIndeterminate /> : 
                    !isTextValid && <Text mt="8px" mx="8px" fontSize="md" color="red.500" fontWeight="700">{errorMessage}</Text>
            }
        </Box>
    );
}