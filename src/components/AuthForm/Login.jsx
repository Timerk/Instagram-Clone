import { useState } from "react"
import { Input, Button } from "@chakra-ui/react"

export const Login = () => {
    const [inputs, setInputs] = useState({
        email:'',
        password:'',
      })
  
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
  
          <Button w={'full'} fontSize={14} colorScheme='blue' size={'sm'}>
            Log in
          </Button>
      </>
    )
}
