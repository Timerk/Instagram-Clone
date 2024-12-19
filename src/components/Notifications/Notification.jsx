import { Avatar, Flex, Tooltip, Text } from "@chakra-ui/react"
import useAuthStore from "../../store/authStore"
import useIsOverflowing from "../../hooks/useisOverflowing"

const Notification = ({username, liked}) => {
    const authUser = useAuthStore((state) => state.user)
    const [isOverflowing, textRef] = useIsOverflowing();

    return (
        <>
            <Flex gap={2} alignItems="center" justifyContent={"space-between"}>
                <Flex gap={2} alignItems="center" flex="1" minW="0">
                    {/* Linker Avatar */}
                    <Avatar size="sm" src={""} />
        
                    {/* Text */}
                    <Flex alignItems="flex-start" gap={1} flex="1" minW="0">
                        {isOverflowing ? ( 
                            <Tooltip label={username} hasArrow>
                                <Text 
                                  ref={textRef}
                                  fontSize={14} 
                                  fontWeight="bold" 
                                  whiteSpace="nowrap" 
                                  overflow="hidden" 
                                  textOverflow="ellipsis"
                                >
                                  {username}
                                </Text>
                            </Tooltip>
                        ) : (
                            <Text 
                                ref={textRef}
                                fontSize={14} 
                                fontWeight="bold" 
                                whiteSpace="nowrap" 
                                overflow="hidden" 
                                textOverflow="ellipsis"
                            >
                                {username}
                            </Text>    
                        )}
                        <Text fontSize={14} color="gray.400" flexShrink={0}>
                            {liked ? "liked " : "commented "}your post
                        </Text> 
                    </Flex>
                </Flex>

                {/* Rechter Avatar */}
                <Avatar size="sm" src={authUser?.profilePicURL} borderRadius="0" />
            </Flex>
        </>
    )
}

export default Notification