import { Avatar, Flex, Text, Skeleton, SkeletonCircle } from "@chakra-ui/react"
import useGetUserProfileById from "../../hooks/useGetUserProfileById"
import { Link } from "react-router-dom"
import { getTimeAgo } from "../../utils/getTimeAgo"

export const Comment = ({comment}) => {
    const timeAgo = getTimeAgo(comment.createdAt)
    const {isLoading, userProfile} = useGetUserProfileById(comment.createdBy)

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
                      {comment.comment}
                  </Text>
              </Flex>
              <Text fontSize={12} color={"gray.300"}>
                  {timeAgo}
              </Text>
          </Flex>
      </Flex>
    )
}

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} w='10' />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};
  
