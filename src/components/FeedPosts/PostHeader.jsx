import { Flex, Box, Avatar } from "@chakra-ui/react"
import { HiDotsHorizontal } from "react-icons/hi";
import  useGetUserProfileById  from "../../hooks/useGetUserProfileById"
import { Link } from "react-router-dom";
import { getTimeAgo } from "../../utils/getTimeAgo";
export const PostHeader = ({post, userProfile}) => {
  const timeAgo = getTimeAgo(post.createdAt)
  
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${userProfile?.username}`}>
          <Avatar src={userProfile?.profilePicURL} alt="user" size={"sm"}/>
        </Link>
        <Flex fontSize={12} fontWeight={"bold"} gap={2} alignItems={"center"}>
          <Link to={`/${userProfile?.username}`}> 
            {userProfile?.username}
          </Link>
          <Box color={"gray.500"}>• {timeAgo}</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <HiDotsHorizontal size="18px"/>
      </Box>
    </Flex>
  )
}
