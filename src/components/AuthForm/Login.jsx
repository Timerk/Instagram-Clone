import { useState } from "react"
import { Input, Button } from "@chakra-ui/react"
import useLogin from "../../hooks/useLogin"
import { Alert, AlertIcon } from "@chakra-ui/react"

export const Login = () => {
    const [inputs, setInputs] = useState({email:'', password:''})
    const { loading, error, login } = useLogin() 

    return (
      <>
          <Input placeholder='Email' fontSize={14} type='email'
            size={"sm"}
            value={inputs.email}
            onChange={(e) => setInputs({...inputs, email:e.target.value})}
          />
          <Input placeholder='Password' fontSize={14} type='password'
              size={"sm"}
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password:e.target.value})}
          />

          {error && (
                      <Alert status={"error"} p={2} fontSize={13} borderRadius={4}>
                          <AlertIcon fontSize={12} />
                              {error.message}
                      </Alert>
                  )}
  
          <Button w={'full'} fontSize={14} colorScheme='blue' size={'sm'} isLoading={loading} onClick={() => login(inputs)}>
            Log in
          </Button>
      </>
    )
}
