import { useState, useEffect } from "react";
import { Heading, Input, InputGroup, InputRightElement, Flex, Box, IconButton, Skeleton, Tooltip, Spinner, Text, Progress, Button  } from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { CreateUserModel, ConfigProps } from '../CreateUserModel';

type Props = {
    title: string;
    passwordType: "password" | "confirmPassword";
    configProps: ConfigProps;
    passwordsMatch: boolean;
    setPasswordCheck: Function;
    passwordCheck: boolean;
}

// type Timeout = ReturnType<typeof setTimeout> | undefined;

export default function _PasswordField (props: Props) {
    let Model = new CreateUserModel(props.configProps);

    let [passwordVisible, setPasswordVisible] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');
    let [isVerifying, setIsVerifying] = useState(false);

    const setPasswordState: Function = Model[props.passwordType].setState;
    const passwordState: string = Model[props.passwordType].state;

    useEffect(() => {
        Model.runChecks(
            props.setPasswordCheck, 
            props.passwordType,
            setErrorMessage,
            setIsVerifying, 
        );

        props.setPasswordCheck(props.passwordCheck);
    }, [passwordState, props.passwordsMatch]);

    return (
        <Box w={{sm: "100%", md: "calc(50% - 8px)", lg: "calc(50% - 8px)"}}>
            <Heading mb="4px" size="md">{props.title}</Heading>
            <InputGroup>
                <Input 
                    bg="white" 
                    type={passwordVisible ? "text" : "password"} 
                    onChange={(event) => setPasswordState(event?.currentTarget?.value)}
                    placeholder="*****"
                    isInvalid={!props.passwordCheck || !props.passwordsMatch}
                    value={passwordState}
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
            <Text m="8px" fontSize="md" color="red.500" fontWeight="700">{errorMessage}</Text>
        </Box>
    );
}