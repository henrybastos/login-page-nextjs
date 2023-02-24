import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ChakraProvider, Heading, Card, Flex, Box, Skeleton, Text, useToast, CardHeader, IconButton, CardBody, Stack, StackDivider, Tooltip } from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";

export default function UserDashboard () {
    const successToast = useToast();

    const router = useRouter();
    let response;

    if (router?.query?.data) {
        response = JSON.parse(`${router.query.data}`);
    }

    useEffect(() => {
        if (router?.query?.status === "new-user") {
            if (!successToast.isActive("new-user")) {
                successToast({
                    title: "Usuário cadastrado com sucesso!",
                    id: "new-user",
                    status: "success",
                    duration: 10000,
                });
            }
        }
    }, []);


    return (
        <ChakraProvider>
            <Head>
                <title>User Dashboard</title>
            </Head>

            <Flex bg="gray.100" w="100%" h="100vh" flexDirection="column" alignItems="center">
                <Box w={{sm: "400px", md: "700px", lg: "700px", xl: "700px"}}>
                    <Box pt="56px" mb="24px" w="100%">
                        <Skeleton isLoaded={true}>
                            <Flex flexDirection="row">
                                <Tooltip hasArrow label='Login page' aria-label='Login page' openDelay={500}>
                                    <IconButton 
                                    mx="16px" 
                                    aria-label="Go to login page" 
                                    onClick={() => router.push("/")} 
                                    icon={<FiChevronLeft />} 
                                    _hover={{
                                        bg: "gray.300"
                                    }}
                                    _active={{
                                        bg: "gray.400"
                                    }}
                                    />
                                </Tooltip>
                                <Heading size="lg">Dashboard</Heading>
                            </Flex>
                        </Skeleton> 
                    </Box>
                    <Card w="100%" size="md" variant={"outline"} bg="gray.50" p="24px">
                        <CardHeader>
                            <Heading>{response?.name ?? "Unknown"}</Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing="4">
                                <Box>
                                    <Heading  size='xs' textTransform='uppercase'>Name</Heading>
                                    <Text pt="4px">{response?.name ?? "Unknown"}</Text>
                                </Box>
                                <Box>
                                    <Heading  size='xs' textTransform='uppercase'>Username</Heading>
                                    <Text pt="4px">{response?.username ?? "Unknown"}</Text>
                                </Box>
                                <Box>
                                    <Heading  size='xs' textTransform='uppercase'>Email</Heading>
                                    <Text pt="4px">{response?.email ?? "Unknown"}</Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                </Box>
            </Flex>
        </ChakraProvider>
    )
}