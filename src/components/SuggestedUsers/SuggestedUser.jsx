import { Flex, Box, Avatar, VStack, Text, Button } from "@chakra-ui/react"
import { useState } from "react"

export const SuggestedUser = ({username, avatar, followers}) => {
  const [followed, setIsFollowed] = useState(false)

  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
            <Avatar src={avatar} alt="user" size={"md"}/>
            <VStack spacing={2}>
              <Text fontSize={12} fontWeight={"bold"} alignSelf={"start"}>
                {username}
              </Text>
              <Text fontSize={12} fontWeight={"bold"} color={"whiteAlpha.700"}>
                {followers} followers
              </Text>
            </VStack>
        </Flex>
        <Button cursor={"pointer"} 
                fontSize={12} f
                ontWeight={"medium"} 
                color={"blue.500"} 
                bg={"transparent"} p={0} 
                h={"max-content"} 
                _hover={{color: "whiteAlpha.700"}}
                onClick={() => setIsFollowed(!followed)}
        >
            {!followed ? "follow" : "unfollow"}
        </Button>
    </Flex>
  )
}
