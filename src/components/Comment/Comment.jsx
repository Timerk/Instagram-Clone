import { Avatar, Flex, Text, Skeleton, SkeletonCircle } from "@chakra-ui/react"
import useGetUserProfileById from "../../hooks/useGetUserProfileById"
import { Link } from "react-router-dom"

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

const getTimeAgo = (createdAt) => {
  const currentDate = Date.now();
  const timeDifference = currentDate - createdAt;

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  }
};

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
  
