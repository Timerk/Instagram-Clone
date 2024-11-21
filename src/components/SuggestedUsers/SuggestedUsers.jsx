import  { SuggestedUser }  from "./SuggestedUser"
import SuggestedUsersHeader from "./SuggestedUsersHeader"
import { VStack, Flex, Box, Text, Link as ChakraLink } from "@chakra-ui/react"

export const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedUsersHeader/>
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} fontSize={12} fontWeight={"medium"}>
        <Text fontSize={12} fontWeight={"bold"} color={"whiteAlpha.700"}>
          Suggested for you
        </Text>
        <Text cursor={"pointer"} fontSize={12} fontWeight={"bold"} color={"blue.500"} _hover={{color: "whiteAlpha.700"}}>
          See All
        </Text>
      </Flex>
      <SuggestedUser />
      <SuggestedUser />
      <SuggestedUser />
      <SuggestedUser />

      <Box fontSize={12} color={"whiteAlpha.700"} mt={5} alignSelf={"start"}>
        © 2024 BUILT BY{" "}
        <ChakraLink href="https://github.com/Timerk" isExternal fontSize={14} color="blue.500">
          Tim Berk
        </ChakraLink>
      </Box>
    </VStack>
  )
}
