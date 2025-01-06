import { Modal, VStack, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalHeader, Text } from "@chakra-ui/react"
import Notification from "../Notifications/Notification"
import { SuggestedUser } from "../SuggestedUsers/SuggestedUser"

const SeeAllModal = ({isOpen, onClose, elementsToDisplay ,isNotifications}) => {
    const limitedElements = elementsToDisplay.slice(0, 100);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered={true}
            maxW={{ base: "full", sm: "300px" }}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text fontSize="2xl" fontWeight="bold">{isNotifications ? "Notifications" : "Suggested Users"}</Text>
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody py={5} maxH="500px" overflowY="auto">
                    <VStack>
                        {limitedElements.map((elementToDisplay) => (isNotifications ? <Notification key={elementToDisplay.id} notification={elementToDisplay}/> 
                        : <SuggestedUser key={elementToDisplay.id} user={elementToDisplay}/>))}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SeeAllModal