import { useState } from "react";
import { Heading, Input, InputGroup, InputRightElement, Flex, Box, IconButton, Skeleton, Tooltip, Spinner, Text, Progress, Button  } from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import CreateUserModel from '../../app/CreateUserModel';

type Props = {
    title: string;
    verificationType?: string;
    setValidations?: Function;
    validations?: object;
}

export default function _PasswordField (props: Props) {
    let [password, setPassword] = useState('');
    let [passwordVisible, setPasswordVisible] = useState(false);
    let [isPasswordValid, setIsPasswordValid] = useState(true);
    let [errorMessage, setErrorMessage] = useState('');
    let [isVerifying, setIsVerifying] = useState(false);

    let Model = new CreateUserModel();

    function checkInput (event: string) {
        setIsVerifying(true);
        
        setPassword(event?.trim());

        Model.runChecks(
            event?.trim(),
            setIsPasswordValid, 
            props?.setValidations, 
            props?.validations, 
            "Password",
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
                    type={passwordVisible ? "text" : "password"} 
                    onChange={(event) => checkInput(event?.currentTarget?.value)} 
                    placeholder="*****"
                    isInvalid={!isPasswordValid && !isVerifying}
                    value={password}
                />
                <InputRightElement>
                    <Tooltip hasArrow label={passwordVisible ? "Ocultar senha" : "Mostrar senha"} aria-label="Mudar visibilidade da senha.">
                    <IconButton 
                        aria-label="Mostrar senha." 
                        icon={passwordVisible ? <FiEyeOff /> : <FiEye />} 
                        variant="ghost" 
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                    </Tooltip>
                </InputRightElement>
            </InputGroup>
            {
                isVerifying ? 
                    <Progress mx="4px" my="8px" colorScheme="green" size="xs" isIndeterminate /> : 
                    !isPasswordValid && <Text m="8px" fontSize="md" color="red.500" fontWeight="700">{errorMessage}</Text>
            }
        </Box>
    );
}