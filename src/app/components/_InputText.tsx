import { useState, useEffect } from "react";
import { Heading, Input, InputGroup, InputRightElement, Flex, Box, IconButton, Skeleton, Tooltip, Spinner, Text, Progress, Button  } from "@chakra-ui/react";
import { CreateUserModel, ConfigProps } from '../CreateUserModel';

type Props = {
    title: string;
    textType: "name" | "username" | "email" | "password";
    placeholder?: string;
    configProps: ConfigProps;
    setTextCheck: Function;
    textCheck: boolean;
}

export default function _PasswordField (props: Props) {
    let [errorMessage, setErrorMessage] = useState('');
    let [isVerifying, setIsVerifying] = useState(false);
    
    const Model = new CreateUserModel(props.configProps);

    const setTextState: Function = Model[props.textType].setState;
    const textState: string = Model[props.textType].state;

    const debounce = (callback: Function, delay: number) => {
        let timeout: ReturnType<typeof setTimeout>;

        return (...args: Array<unknown>) => {
            clearTimeout(timeout);
            console.log('Restart...');
            timeout = setTimeout(() => { callback(...args) }, delay);
        }
    }
    
    useEffect(() => {
        setIsVerifying(true);
        
        props.textType === "username" ? setTextState(Model.username.state.trim()) : setTextState(Model.name.state);
    
        Model.runChecks(
            props.setTextCheck, 
            props.textType, 
            setErrorMessage,
            setIsVerifying, 
        );
    },[textState]);

    return (
        <Box w={{sm: "100%", md: "calc(50% - 8px)", lg: "calc(50% - 8px)"}}>
            <Heading mb="4px" size="md">{props.title}</Heading>
                <Input 
                    bg="white" 
                    type="text"
                    onChange={(event) => setTextState(event?.currentTarget?.value)} 
                    placeholder={props.placeholder || ''}
                    isInvalid={!props.textCheck} 
                    value={textState}
                />
                
            {/* isVerifying ? <Progress mx="4px" my="8px" colorScheme="green" size="xs" isIndeterminate /> :  */}
            {!props.textCheck && <Text mt="8px" mx="8px" fontSize="md" color="red.500" fontWeight="700">{errorMessage}</Text>}
        </Box>
    );
}