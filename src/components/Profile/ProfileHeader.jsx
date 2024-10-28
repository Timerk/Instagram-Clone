import { Flex, Avatar, Text, AvatarGroup, VStack, Button } from "@chakra-ui/react"

export const ProfileHeader = ({username, avatar}) => {
  return (
    <Flex gap={{base:4, sm:10}} py={10} direction={{base:"column", sm:"row"}}>
            <AvatarGroup size={{base:"xl", md:"2xl"}} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
                <Avatar src={avatar} alt="user"/>
            </AvatarGroup>
            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
                <Flex gap={4} direction={{base:"column", sm:"row"}}
                    justifyContent={{base:"center", sm:"flex-start"}}
                    alignItems={"center"}
                    w={"full"}
                >
                    <Text fontSize={{base:"sm", md:"lg"}}>
                        {username}
                    </Text>
                    <Button bg={"whiteAlpha.300"} color={"whiteAlpha.700"} _hover={{bg:"whiteAlpha.500"}} size={{base:"xs", md:"sm"}}>
                        Edit Profile
                    </Button>
                </Flex>
                <Flex alignItems={"center"} gap={{base:2, sm:4}}>
                    <Text fontSize={{base:"xs", md:"sm"}}>
                        <Text as="span" fontWeight={"bold"}  mr={1}>7</Text>
                        Posts
                    </Text>
                    <Text fontSize={{base:"xs", md:"sm"}}>
                        <Text as="span" fontWeight={"bold"}  mr={1}>100</Text>
                        Followers
                    </Text>
                    <Text fontSize={{base:"xs", md:"sm"}}>
                        <Text as="span" fontWeight={"bold"}  mr={1}>256</Text>
                        Following
                    </Text>
                </Flex>
                <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{username}</Text>
                </Flex>
                <Text fontSize={"sm"}>Test bio</Text>
            </VStack>
    </Flex>
  )
}
