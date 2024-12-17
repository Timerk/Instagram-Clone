import { Input, InputGroup, InputRightElement, Button, Alert, AlertIcon } from "@chakra-ui/react"
import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword"
import useShowToast from "../../hooks/useShowToast"

export const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullname:'',
        username:'',
        email:'',
        password:'',
      })

    const [showPassword, setShowPassword] = useState(false)
    const showToast = useShowToast()

    const{loading, error, signUp} = useSignUpWithEmailAndPassword()
    const allInputsFilled = Object.values(inputs).every(value => value !== '')

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    }

    const handleSignUp = () => {
        if (allInputsFilled && !validatePassword(inputs.password)) {
            showToast("Error", "Das Passwort muss mindestens 8 Zeichen lang sein, Groß- und Kleinbuchstaben sowie mindestens eine Zahl enthalten.", "error")
            return;
        }
        signUp(inputs);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        const newValue = name === 'username' || name === 'password' || name === 'email'
            ? value.replace(/\s/g, '')
            : value;
    
        setInputs({
            ...inputs,
            [name]: newValue
        });
    };

    return (
      <>
          <Input placeholder='Email' name="email" fontSize={14} type='email'
              size={"sm"}
              value={inputs.email}
              onChange={handleInputChange}
          />
          <Input placeholder='Username' name="username" fontSize={14} type='text'
              size={"sm"}
              value={inputs.username}
              onChange={handleInputChange}
          />
          <Input placeholder='Full Name' name="fullname" fontSize={14} type='text'
              size={"sm"}
              value={inputs.fullname}
              onChange={handleInputChange}
          />
          <InputGroup>
              <Input placeholder='Password' name="password" fontSize={14} type={showPassword ? "text" : "password"}
                  size={"sm"}
                  value={inputs.password}
                  onChange={handleInputChange}
              />
              <InputRightElement h={"full"}>
                  <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                  </Button>
              </InputRightElement>
          </InputGroup>

          {error && (
              <Alert status={"error"} p={2} fontSize={13} borderRadius={4}>
                  <AlertIcon fontSize={12}/>
                      {error.message}
              </Alert>
          )}

          <Button w={'full'} fontSize={14} colorScheme='blue' size={'sm'} isLoading={loading} onClick={handleSignUp}>
            Sign Up
          </Button>
      </>
    )
}
