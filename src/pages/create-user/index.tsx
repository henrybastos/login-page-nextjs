import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head'
import { ChakraProvider, Heading, Card, Input, Flex, Box, Button, IconButton, Skeleton, Tooltip, Text, useToast } from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import _InputPassword from "../../app/components/_InputPassword";
import _InputText from "../../app/components/_InputText";
import CreateUserController from "../../app/CreateUserController";
import { CreateUserModel, ERROR_MESSAGES } from '../../app/CreateUserModel';

type Timeout = ReturnType<typeof setTimeout>;

export default function CreateUserPage() {
  const router = useRouter();
  let [loaded, setLoaded] = useState(true); // Skeleton loading test

  let [name, setName] = useState('');
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');

  let [passwordsMatch, setPasswordsMatch] = useState(true);
  let [allPasswordsCheck, setAllPasswordsCheck] = useState(true);

  let [nameCheck, setNameCheck] = useState(true);
  let [usernameCheck, setUsernameCheck] = useState(true);
  let [emailCheck, setEmailCheck] = useState(true);
  let [passwordCheck, setPasswordCheck] = useState(true);
  let [confirmPasswordCheck, setConfirmPasswordCheck] = useState(true);

  
  // setTimeout(() => { // Skeleton loading test
  //   setLoaded(true);
  // }, 2000);
    
  const ConfigProps = {
    name: {
      setState: setName, 
      state: name,
    },
    username: {
      setState: setUsername, 
      state: username,
    },
    email: {
      setState: setEmail, 
      state: email,
    },
    password: {
      setState: setPassword, 
      state: password,
    },
    confirmPassword: {
      setState: setConfirmPassword, 
      state: confirmPassword,
    },
  };

  const Model = new CreateUserModel(ConfigProps);
  const Controller = new CreateUserController(ConfigProps);
  const errorToast = useToast();
  const successToast = useToast();
  
  const debounce = (callback: Function, delay: number) => {
    let timeout: Timeout;

    return (...args: Array<unknown>) => {
      clearTimeout(timeout);
      console.log('Restart...');
      timeout = setTimeout(() => { callback(...args) }, delay);
    }
  }
  
  function addNewUserErrorHandler (_error: { message: string, targets?: Array<string>}, _id: string) {
    // console.error(_error.message);

    _error?.targets?.forEach(target => {
      switch (target) {
        case "name":
          setNameCheck(false);
          break;
        case "username":
          setUsernameCheck(false);
          break;
        case "email":
          setEmailCheck(false);
          break;
        case "password":
          setPasswordCheck(false);
          break;
        case "confirmPassword":
          setConfirmPasswordCheck(false);
          break;
      }
    });
    
    if (!errorToast.isActive("blank-input") && !errorToast.isActive("existing-user")) {
      showErrorToast(_error.message, _id);
    }
  }
  
  function showErrorToast (_title: string, _id: string) {
    errorToast({
      title: _title,
      id: _id,
      status: "error",
      duration: 10000,
    });
  }

  function closeErrorToast ( _id: string) {
    errorToast.close(_id);
  }

  function showSuccessToast (_title: string, _id: string) {
    successToast({
      title: _title,
      id: _id,
      status: "success",
      duration: 10000,
    });
  }

  function closeSuccessToast ( _id: string) {
    successToast.close(_id);
  }

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordsMatch(true);
      closeErrorToast("password-mismatch");
    } else {
      setPasswordsMatch(false);
      if (!errorToast.isActive("password-mismatch") && allPasswordsCheck) {
        showErrorToast("As senhas não podem ser diferentes.", "password-mismatch");
      }
    }

  }, [password, confirmPassword]);
  
  useEffect(() => {
    try {
      Model.checkEmail();
      setEmailCheck(true);
    } catch (err) {
      setEmailCheck(false);
    }
  },[email]);
  
  useEffect(() => {
    
    closeErrorToast("blank-input");
    closeErrorToast("existing-user");
    if(name !== '' || username !== '' || email !== '' || password !== '' || confirmPassword !== '') {
    }

    if (name !== '') { setNameCheck(true); };
    if (username !== '') { setUsernameCheck(true); };
    if (email !== '') { setEmailCheck(true); };
    if (password !== '') { setPasswordCheck(true); };
    if (confirmPassword !== '') { setConfirmPasswordCheck(true); };
  },[name, username, email, password, confirmPassword]);

  return (
    <ChakraProvider>
      <Head>
        <title>Login page • Create user</title>
      </Head>

      <Flex bg="gray.100" w="100%" h="100vh" flexDirection="column" alignItems="center">
        <Box w={{sm: "400px", md: "700px", lg: "900px", xl: "1200px"}}>
          <Box pt="56px" mb="24px" w="100%">
            <Skeleton isLoaded={loaded}>
              <Flex flexDirection="row">
                <IconButton 
                  mx="16px" 
                  aria-label="Go to login page" 
                  onClick={() => router.push("/login")} 
                  icon={<FiChevronLeft />} 
                  _hover={{
                    bg: "gray.300"
                  }}
                  _active={{
                    bg: "gray.400"
                  }}
                  />
                <Heading size="lg">Novo usuário</Heading>
              </Flex>
            </Skeleton> 
          </Box>


          <Card w="100%" p="16px" size="md" variant={"outline"} bg="gray.50">

            <Flex flexDirection={{sm: "column", md: "row", lg: "row"}} justifyContent="space-between">

              <_InputText 
                title="Nome completo" 
                textType="name"
                placeholder="John Doe"
                configProps={ConfigProps}
                setTextCheck={setNameCheck}
                textCheck={nameCheck}
                />

              <_InputText 
                title="Nome de usuário" 
                textType="username" 
                placeholder="johndoe123"
                configProps={ConfigProps}
                setTextCheck={setUsernameCheck}
                textCheck={usernameCheck}
              />
            </Flex>

            <Box w="100%" pt="24px">
              <Heading mb="4px" size="md">Email</Heading>
              <Input 
                onChange={(event) => setEmail(event.currentTarget.value)} 
                bg="white" 
                type="email" 
                placeholder="johndoe123@email.com"
                isInvalid={!emailCheck}
              />
              { (!emailCheck && email !== '') && <Text m="8px" fontSize="md" color="red.500" fontWeight="700">{ERROR_MESSAGES.email.WhiteSpaces}</Text> }
            </Box>

            <Flex flexDirection={{sm: "column", md: "row", lg: "row"}} justifyContent="space-between" mt="24px">
              <_InputPassword 
                title="Senha" 
                passwordType="password"
                configProps={ConfigProps}
                passwordsMatch={passwordsMatch}
                setPasswordCheck={setPasswordCheck}
                passwordCheck={passwordCheck}
                />
              
              <_InputPassword 
                title="Confirme sua senha" 
                passwordType="confirmPassword"
                configProps={ConfigProps}
                passwordsMatch={passwordsMatch}
                setPasswordCheck={setConfirmPasswordCheck}
                passwordCheck={confirmPasswordCheck}
              />
            </Flex>

            <Button 
              onClick={() => Controller.addNewUser(addNewUserErrorHandler, showSuccessToast)} 
              mt="24px" 
              bg="green.400" 
              color="white" 
              _hover={{ bg: "green.500" }} 
              _active={{ bg: "green.600" }}
            >
              Continuar
            </Button>

            {/* <Button onClick={() => Controller.getFromDatabase("johndoe")} mt="24px" bg="green.400" color="white" _hover={{ bg: "green.500" }} _active={{ bg: "green.600" }}>Continuar</Button> */}
          </Card>
        </Box>
      </Flex>
    </ChakraProvider>
  )
}