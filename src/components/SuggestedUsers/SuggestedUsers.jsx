import  { SuggestedUser }  from "./SuggestedUser"
import { SuggestedUsersHeader } from "./SuggestedUsersHeader"
import { VStack, Flex, Box, Text, Link as ChakraLink } from "@chakra-ui/react"

export const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedUsersHeader username="Dim" avatar="img2.png"/>
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} fontSize={12} fontWeight={"medium"}>
        <Text fontSize={12} fontWeight={"bold"} color={"whiteAlpha.700"}>
          Suggested for you
        </Text>
        <Text cursor={"pointer"} fontSize={12} fontWeight={"bold"} color={"blue.500"} _hover={{color: "whiteAlpha.700"}}>
          See All
        </Text>
      </Flex>
      <SuggestedUser username="Skenny" avatar="img1.png" followers={400}/>
      <SuggestedUser username="Pkenny" avatar="img2.png" followers={361}/>
      <SuggestedUser username="Fkenny" avatar="img3.png" followers={491}/>
      <SuggestedUser username="Jkenny" avatar="img4.png" followers={21}/>

      <Box fontSize={12} color={"whiteAlpha.700"} mt={5} alignSelf={"start"}>
        © 2024 BUILT BY{" "}
        <ChakraLink href="https://github.com/Timerk" isExternal fontSize={14} color="blue.500">
          Tim Berk
        </ChakraLink>
      </Box>
    </VStack>
  )
}
