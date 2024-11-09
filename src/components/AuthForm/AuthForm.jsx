import { Box, VStack, Image, Flex, Text } from '@chakra-ui/react'
import { px } from 'framer-motion';
import { useState } from 'react'
import { Login } from './Login';
import { SignUp } from './SignUp';
import { GoogleAuth } from './GoogleAuth';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
      <VStack spacing={4}>
        <Image src='logo.png'></Image>

        {isLogin ? <Login/> : <SignUp/>}

        <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={'full'}>
          <Box flex={2} h={"1px"} bg={"gray.400"}/>
          <Text mx={1} color={"white"}>OR</Text>
          <Box flex={2} h={"1px"} bg={"gray.400"}/>
        </Flex>

        <GoogleAuth/>
      </VStack>
    </Box>

    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
      <Flex alignItems={"center"} justifyContent={"center"}>
        <Box mx={2} fontSize={14}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Box>
        <Box fontSize={14} color={"blue.500"} cursor={"pointer"} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign up" : "Log In"}
        </Box>
      </Flex>
    </Box>
    </>
  )
}