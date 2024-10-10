import { Input, Box, VStack, Image, Button, Flex, Text } from '@chakra-ui/react'
import { px } from 'framer-motion';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email:'',
    password:'',
    confirmedPassword:''
  })

  const handleAuth = () => {
    if (!inputs.email || !inputs.password) {
      alert("Please fill in fields")
      return
    }
    
    navigate("/")
  }

  return (
    <>
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
      <VStack spacing={4}>
        <Image src='logo.png'></Image>
        <Input placeholder='Email' fontSize={14} type='email'
          value={inputs.email}
          onChange={(e) => setInputs({...inputs, email:e.target.value})}
        />
        <Input placeholder='Password' fontSize={14} type='password'
            value={inputs.password}
            onChange={(e) => setInputs({...inputs, password:e.target.value})}
        />
        {!isLogin ? <Input placeholder='Confirm password' fontSize={14} type='password' 
                      value={inputs.confirmedPassword}
                      onChange={(e) => setInputs({...inputs, confirmedPassword:e.target.value})}
                    /> 
        : null} 
        <Button w={'full'} fontSize={14} colorScheme='blue' size={'sm'} onClick={handleAuth}>
          {isLogin ? "Log In" : "Sign Up"}
        </Button>

        <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={'full'}>
          <Box flex={2} h={"1px"} bg={"gray.400"}/>
          <Text mx={1} color={"white"}>OR</Text>
          <Box flex={2} h={"1px"} bg={"gray.400"}/>
        </Flex>

        <Flex alignItems={"center"} justifyContent={"center"} gap={1} cursor={"pointer"}>
          <Image src='google.png' w={5} alt='google logo'/>
          <Text mx={2} color={"blue.500"}>
            Log in with Google
          </Text>
        </Flex>
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