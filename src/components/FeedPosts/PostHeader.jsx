import { Flex, Box, Avatar } from "@chakra-ui/react"
import { HiDotsHorizontal } from "react-icons/hi";
import { LuDot } from "react-icons/lu";

export const PostHeader = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src="/img2.png" alt="user" size={"sm"}/>
        <Flex fontSize={12} fontWeight={"bold"} gap={2} alignItems={"center"}>
          Mossi
          <Box color={"gray.500"}>• 14 Min.</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <HiDotsHorizontal size="18px"/>
      </Box>
    </Flex>
  )
}
