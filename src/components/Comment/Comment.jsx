import { Avatar, Flex, Text } from "@chakra-ui/react"

export const Comment = ({comment}) => {
    const timeAgo = getTimeAgo(comment.createdAt)

    return (
      <Flex gap={4}>
          {/* <Avatar src={profilePic} name="username" size={"sm"}/> */}
          <Flex direction={"column"}>
              <Flex gap={2}>
                  <Text fontWeight={"bold"} fontSize={12}>
                      {/* {username} */}
                  </Text>
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
  
