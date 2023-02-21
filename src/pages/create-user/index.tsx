import { useState, useEffect } from "react";
import Head from 'next/head'
import { ChakraProvider, Heading, Card, Input, Flex, Box, Button, IconButton, Skeleton, Tooltip } from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import _InputPassword from "./_InputPassword";
import _InputText from "./_InputText";
import CreateUserController from "../../app/CreateUserController";
import { EventEmitter } from "events";

type Timeout = ReturnType<typeof setTimeout >;

export default function HomePage() {
  let [loaded, setLoaded] = useState(false);
  let [validations, setValidations] = useState({});

  let [name, setName] = useState();
  let [username, setUsername] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();

  let [subscribers, setSubscribers] = useState([]);
  
  setTimeout(() => { // Skeleton loading test
    setLoaded(true);
  }, 2000);
  
  // useEffect(() => {
    //   console.log(validations);
    // }, [validations])

  let Controller = new CreateUserController();
  const Emmiter = new EventEmitter();

  const debounce = (callback: Function, delay: number) => {
    let timeout: Timeout;

    return (...args: Array<unknown>) => {
      clearTimeout(timeout);
      console.log('Restart...');
        timeout = setTimeout(() => { callback(...args) }, delay);
      }
    }
    
  const callCheckEmail = debounce(() => {
    console.log('Email');
  },2000);

  // function callSubscribers () {
  //   subscribers.forEach(sub => sub());
  // }

  // function subscribeFunc (funcToSubscribe: Function) {
  //   setSubscribers([...subscribers: Array<function>, funcToSubscribe]);
  // }

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
                <IconButton onClick={() => alert('Cu!')} mx="16px" variant="ghost" fontSize='24px' aria-label="Return page" icon={<FiChevronLeft />}/>
                <Heading size="lg">Novo usuário</Heading>
              </Flex>
            </Skeleton> 
          </Box>


          <Card w="100%" p="16px" size="md" variant={"outline"} bg="gray.50">

            <Flex flexDirection={{sm: "column", md: "row", lg: "row"}} justifyContent="space-between">

              <_InputText 
                title="Nome completo" 
                setValidations={setName} 
                validations={name}
                emmiter={Emmiter} 
                validationType="Name"
              />

              <_InputText 
                title="Nome de usuário" 
                validationType="Username" 
                setValidations={setUsername} 
                validations={username}
              />
              
              {/* <Box w={{sm: "100%", md: "50%", lg: "50%"}} pr={{md: "16px", lg: "16px"}}>
                <Input bg="white" onChange={(e) => console.log(e.target.value)} placeholder="John Doe"/>
              </Box>

              <Box w={{sm: "100%", md: "50%", lg: "50%"}} pt={{sm: "24px", md: 0, lg: 0}}>
                <Tooltip 
                  placement="bottom-start" 
                  openDelay={750} 
                  label="Seu nome de usuário será usado para login." 
                  aria-label="Seu nome de usuário será usado para login."
                >
                  <Heading mb="4px" size="md">Nome de usuário</Heading>
                </Tooltip>
                <Input bg="white" placeholder="johndoe123"/>
              </Box> */}
            </Flex>

            <Box w="100%" pt="24px">
              <Heading mb="4px" size="md">Email</Heading>
              <Input onChange={() => callCheckEmail()} bg="white" type="email" placeholder="johndoe123@email.com"/>
            </Box>

            <Flex flexDirection={{sm: "column", md: "row", lg: "row"}} justifyContent="space-between" mt="24px">
              <_InputPassword title="Senha" setValidations={setPassword} validations={password}/>
              <_InputPassword title="Confirme sua senha" setValidations={setValidations} validations={validations}/>
            </Flex>

            <Button onClick={() => Emmiter.emit('shit')} mt="24px" bg="green.400" color="white" _hover={{ bg: "green.500" }} _active={{ bg: "green.600" }}>Continuar</Button>
            {/* onClick={() => Controller.addToDatabase(name, username, email, password)} */}
          </Card>
        </Box>
      </Flex>
    </ChakraProvider>
  )
}