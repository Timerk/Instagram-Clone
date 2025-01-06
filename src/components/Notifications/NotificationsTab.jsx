import { Box, VStack, useDisclosure } from '@chakra-ui/react'
import Notification from './Notification'
import { SuggestedUsers } from '../SuggestedUsers/SuggestedUsers'
import useAuthStore from '../../store/authStore'
import useGetNotifications from '../../hooks/useGetNotifications'
import { Text } from '@chakra-ui/react'
import SeeAllModal from '../Modals/SeeAllModal'

const NotificationsTab = () => {
    const authUser = useAuthStore((state) => state.user)
    const { notifications, isLoading } = useGetNotifications(authUser)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const notificationsEmpty = !isLoading && notifications.length === 0

    const limitedNotifications = notifications.slice(0, 15);

    return (
        <>
            <Box
                height={"100vh"}
                borderRight={{ base: "none", sm: "1px solid" }}
                borderColor={{ base: "none", sm: "whiteAlpha.300" }}
                py={8}
                position={"sticky"}
                maxW={{ base: "full", sm: "300px" }}
                top={0}
                left={0}
                alignItems={"center"}
                justifyContent={"center"}
                px={2}
            >
                <VStack py={4} align="stretch" w={"full"}>
                    {notificationsEmpty ?
                            <VStack>
                                <Text fontWeight="bold" textAlign="center">
                                    Activity On Your Posts
                                </Text>
                                <Text textAlign="center">
                                    When someone likes or comments on one of your posts, you'll see it here.
                                </Text>
                            </VStack>
                        :(
                            (limitedNotifications.map((notification) => (
                                <Notification key={notification.id} notification={notification}/>
                            )) || <Text>No comments available</Text>)
                        )
                    }
                    {notifications.length > 4 && 
                    (<Text textAlign={"center"} 
                        cursor={"pointer"} 
                        fontSize={14} 
                        fontWeight={"bold"} 
                        color={"blue.500"} 
                        _hover={{color: "whiteAlpha.700"}}
                        onClick={onOpen}
                     >
                        View more
                    </Text>)}

                    <Box flex={3} maxW={"full"} py={5}>
                        <SuggestedUsers usersToFetch={10} inNotificationsTab={true}/>
                    </Box>
                </VStack>
            </Box> 

            <SeeAllModal isOpen={isOpen} onClose={onClose} elementsToDisplay={notifications} isNotifications={true}/>
        </>
    )
}

export default NotificationsTab