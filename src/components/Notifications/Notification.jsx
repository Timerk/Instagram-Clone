import { Avatar, Flex, Tooltip, Text } from "@chakra-ui/react"
import useIsOverflowing from "../../hooks/useIsOverflowing"
import useGetUserProfileById from "../../hooks/useGetUserProfileById"
import useGetPostById from "../../hooks/useGetPostById"
import { NotificationSkeleton } from "./NotificationSkeleton"
import { Link } from "react-router-dom"

const Notification = ({notification}) => {
    const {isLoading , userProfile: creator} = useGetUserProfileById(notification?.createdBy);
    const {isLoading: postIsLoading, post} = useGetPostById(notification?.postId);
    const componentsLoading = isLoading || postIsLoading;
    const [isOverflowing, textRef] = useIsOverflowing([creator?.username])

    if (componentsLoading) return <NotificationSkeleton/>
        
    return (
        <>
            <Flex gap={2} alignItems="center" justifyContent={"space-between"}>
                <Flex gap={2} alignItems="center" flex="1" minW="0">
                    {/* Linker Avatar */}
                    <Link to={`${creator?.username}`}> 
                        <Avatar size="sm" src={creator?.profilePicURL} />
                    </Link>

                    {/* Text */}
                    <Flex alignItems="flex-start" gap={1} flex="1" minW="0" maxW={{ base: "full", sm: "300px" }}>
                        {isOverflowing ? ( 
                            <Tooltip label={creator?.username} hasArrow>
                                    <Text 
                                      ref={textRef}
                                      fontSize={14} 
                                      fontWeight="bold" 
                                      whiteSpace="nowrap" 
                                      overflow="hidden" 
                                      textOverflow="ellipsis"
                                    >
                                      {creator?.username}
                                    </Text>
                            </Tooltip>
                        ) : (
                            <Link to={`${creator?.username}`}>
                                <Text 
                                    ref={textRef}
                                    fontSize={14} 
                                    fontWeight="bold" 
                                    whiteSpace="nowrap" 
                                    overflow="hidden" 
                                    textOverflow="ellipsis"
                                >
                                    {creator?.username}
                                </Text>  
                            </Link>
                        )}
                        <Text fontSize={14} color="gray.400" flexShrink={0}>
                            {notification.isLike ? "liked " : "commented "}your post
                        </Text> 
                    </Flex>
                </Flex>

                {/* Rechter Avatar */}
                <Avatar size="sm" src={post?.imageURL} borderRadius="0"/>
            </Flex>
        </>
    )
}

export default Notification