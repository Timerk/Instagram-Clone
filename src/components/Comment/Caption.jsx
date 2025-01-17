import { Avatar, Flex, Text, Skeleton, SkeletonCircle } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { getTimeAgo } from "../../utils/getTimeAgo"
import useGetUserProfileById from "../../hooks/useGetUserProfileById"
import { CommentSkeleton } from "./CommentSkleton"

export const Caption = ({post}) => {
    const timeAgo = getTimeAgo(post.createdAt)
    const { isLoading, userProfile } = useGetUserProfileById(post?.createdBy)

    if (isLoading) return <CommentSkeleton/>
  
    return (
      <Flex gap={4}>
        <Link to={`/${userProfile?.username}`}>
          <Avatar src={userProfile?.profilePicURL} name="username" size={"sm"}/>
        </Link>
          <Flex direction={"column"}>
              <Flex gap={2} alignItems={"center"}>
                <Link to={`/${userProfile?.username}`}>
                  <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile?.username} 
                  </Text>
                </Link>
                  <Text fontSize={14} color={"gray.400"}>
                      {post?.caption}
                  </Text>
              </Flex>
              <Text fontSize={12} color={"gray.300"}>
                  {timeAgo}
              </Text>
          </Flex>
      </Flex>
    )
}
  
