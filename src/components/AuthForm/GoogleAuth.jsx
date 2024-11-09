import { Flex, Image, Text } from "@chakra-ui/react"

export const GoogleAuth = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"center"} gap={1} cursor={"pointer"}>
        <Image src='google.png' w={5} alt='google logo'/>
        <Text mx={2} color={"blue.500"}>
            Log In with Google
        </Text>
    </Flex>
  )
}
