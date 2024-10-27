import { Flex, Box, Text, InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react"
import { useState } from "react"
import { NotificationsLogo, UnlikeLogo, CommentLogo } from "../../assets/constants"

export const PostFooder = ({username}) => {

  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(1000)

  const handleLike = () => {
    if (liked) {
      setLiked(false)
      setLikes(likes -1)
    }else{
      setLiked(true)
      setLikes(likes +1)
    }
  }

  return (
    <Box mb={10}>
      <Flex alignItems={"center"} gap={4} mt={4} w={"full"} pt={0} mb={2}>
        <Box cursor={"pointer"} onClick={handleLike}>
          {!liked ? <NotificationsLogo/> : <UnlikeLogo/>}
        </Box>
        <Box cursor={"pointer"} fontSize={18}>
          <CommentLogo/>
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"} w={"full"}>
        {likes} likes
      </Text>
      <Text fontWeight={700} fontSize={"sm"} w={"full"}>
        {username}{" "}
        <Text fontWeight={400} fontSize={"sm"} as={"span"}>
          Nice post
        </Text>
      </Text>
      <Text fontWeight={400} fontSize={"sm"} w={"full"} cursor={"pointer"} color={"gray"}>
        View other comments
      </Text>

      <Flex justifyContent={"space-between"} alignContent={"center"} gap={2} w={"full"}>
        <InputGroup>
          <Input variant={"flushed"} placeholder={"comment"} fontSize={14}/>
          <InputRightElement>
            <Button fontSize={14} color={"whiteAlpha.800"} cursor={"pointer"} fontWeight={600} bg={"transparent"}>Post</Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  )
}
