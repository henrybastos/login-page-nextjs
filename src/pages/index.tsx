import { useState, useEffect } from "react";
import Head from 'next/head';
import { ChakraProvider, Heading, Card, Input, Flex, Box, Button, IconButton, Skeleton, Tooltip, Text, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import _InputPassword from "../app/components/_InputPassword";
import _InputText from "../app/components/_InputText";
import { useRouter } from "next/router";
import { ConfigProps, LoginUserModel } from "@/app/LoginUserModel";
import { LoginUserController } from "@/app/LoginUserController";

export default function LoginPage () {
    const router = useRouter();
    const blankSpaces = useToast();
    const errorToast = useToast();

    let [user, setUser] = useState('');
    let [password, setPassword] = useState('');
  
    let [userCheck, setUserCheck] = useState(true);
    let [passwordCheck, setPasswordCheck] = useState(true);
    let [passwordVisible, setPasswordVisible] = useState(false);
    
    let [userErrorMessage, setUserErrorMessage] = useState('');
    let [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const ConfigProps: ConfigProps = {
        user: {
            setState: setUser, 
            state: user,
        },
        password: {
            setState: setPassword, 
            state: password,
        },
    };

    const LoginModel = new LoginUserModel(ConfigProps);
    const LoginController = new LoginUserController(ConfigProps);

    function checkBlankInputs () {
        let blanks: Array<string> = [];
        if (user === '') { blanks.push("user") };
        if (password === '') { blanks.push("password") };

        setUserCheck(true);
        setPasswordCheck(true);

        blanks.forEach(type => {
            if (type === "user") { setUserCheck(false) };
            if (type === "password") { setPasswordCheck(false) };
        })

        if (blanks.length > 0) {
            blankSpaces({
                title: "Há campos em branco.",
                status: "error",
                id: "blank-spaces",
            });
            return true;
        } else {
            blankSpaces.close("blank-spaces");
            return false;
        }
    }

    async function LogUserIn () {
        interface UserResponse {
            name: string; 
            username: string; 
            email: string; 
        }

        let blankSpacesCheck = checkBlankInputs();

        if (!blankSpacesCheck) {
            let response: UserResponse | any = await LoginController.loginUser();

            console.log(response);
            if (response !== "User not found") {
                let queryUser = {
                    name: response?.name,
                    username: response.username,
                    email: response.email,
                }
                router.push({
                    pathname: '/user-dashboard',
                    query: {data: JSON.stringify(queryUser)},
                })
            } else {
                if (!errorToast.isActive("user-not-found")) {
                    errorToast({
                        title: "Usuário ou Senha incorretos.",
                        id: "user-not-found",
                        status: "error",
                        duration: 10000,
                    });
                }
                setUserCheck(false);
                setPasswordCheck(false);
            }
        }
    }

    useEffect(() => {
        if (password !== '') {
            setPasswordCheck(true);
        }

        try {
            LoginModel.checkWhiteSpace(password, "password");
            setPasswordCheck(true);
            setPasswordErrorMessage('');
        } catch (err: any) {
            setPasswordCheck(false);
            setPasswordErrorMessage(err.message);
            console.error(err.message);
        }

        if (user !== '') {
            setUserCheck(true);
        }

        try {
            LoginModel.checkWhiteSpace(user, "user");
            setUserCheck(true);
            setUserErrorMessage('');
        } catch (err: any) {
            setUserCheck(false);
            setUserErrorMessage(err.message);
            console.error(err.message);
        }
    },[password, user])
        
    return (
        <ChakraProvider>
            <Head>
                <title>Login</title>
            </Head>

            <Flex bg="gray.100" w="100%" h="100vh" flexDirection="column" alignItems="center">
                <Box w={{sm: "400px", md: "700px", lg: "700px", xl: "700px"}}>
                    <Box pt="56px" mb="24px" w="100%">
                        <Skeleton isLoaded={true}>
                            <Heading size="lg">Login</Heading>
                        </Skeleton> 
                    </Box>


                    <Card w="100%" size="md" variant={"outline"} bg="gray.50" p="24px">

                        <Flex flexDirection="column" alignItems="center" w="100%">

                            <Box w={{sm: "100%", md: "65%"}}>
                                <Heading mb="12px" size="md">Nome de usuário ou email</Heading>
                                    <Input 
                                        bg="white" 
                                        type="text"
                                        onChange={(event) => setUser(event?.currentTarget?.value.trim())} 
                                        placeholder="johndoe123"
                                        isInvalid={!userCheck} 
                                        value={user}
                                    />
                                    <Text mt="8px" mx="8px" fontSize="md" color="red.500" fontWeight="700">{userErrorMessage}</Text>
                            </Box>

                            <Box w={{sm: "100%", md: "65%"}} mt="12px">
                                <Heading mb="12px" size="md">Senha</Heading>
                                <InputGroup>
                                    <Input 
                                        bg="white" 
                                        type={passwordVisible ? "text" : "password"} 
                                        onChange={(event) => setPassword(event?.currentTarget?.value.trim())}
                                        placeholder="*****"
                                        isInvalid={!passwordCheck}
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
                                <Text m="8px" fontSize="md" color="red.500" fontWeight="700">{passwordErrorMessage}</Text>
                            </Box>

                            <Flex flexDirection="row" w={{sm: "100%", md: "65%"}} justifyContent="space-between">
                                <Button
                                    w="calc(50% - 8px)"
                                    onClick={() => LogUserIn()} 
                                    mt="24px" 
                                    bg="green.400"
                                    isDisabled={!userCheck || !passwordCheck}
                                    color="white" 
                                    _hover={{ bg: "green.500" }} 
                                    _active={{ bg: "green.600" }}
                                >
                                    Login
                                </Button>

                                <Button
                                    w="calc(50% - 8px)"
                                    onClick={() => router.push('/create-user')} 
                                    mt="24px" 
                                    bg="green.400" 
                                    color="white" 
                                    _hover={{ bg: "green.500" }} 
                                    _active={{ bg: "green.600" }}
                                >
                                    Cadastrar-se
                                </Button>
                            </Flex>

                        </Flex>

                    </Card>
                </Box>
            </Flex>
        </ChakraProvider>
    )
}