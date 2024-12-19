import { Box, VStack } from '@chakra-ui/react'
import Notification from './Notification'
import { SuggestedUsers } from '../SuggestedUsers/SuggestedUsers'

const NotificationsTab = () => {
    return (
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
                <Notification username={"mossi"} liked={true}/>
                <Notification username={"timberk3"} liked={false}/>
                <Notification username={"ssssssssssssssssss"} liked={true}/>
                <Box flex={3} maxW={"full"} py={5}>
                    <SuggestedUsers inNotificationsTab={true}/>
                </Box>
            </VStack>
        </Box>  
    )
}

export default NotificationsTab