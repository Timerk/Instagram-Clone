import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers"
import SeeAllModal from "../Modals/SeeAllModal"
import  { SuggestedUser }  from "./SuggestedUser"
import SuggestedUsersHeader from "./SuggestedUsersHeader"
import { VStack, Flex, Box, Text, Link as ChakraLink, Skeleton, SkeletonCircle, Stack, HStack, useDisclosure } from "@chakra-ui/react"

export const SuggestedUsers = ({inNotificationsTab, usersToFetch}) => {
  const { isLoading, suggestedUsers} = useGetSuggestedUsers({ usersToFetch })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const limitedSuggestedUsers = inNotificationsTab ? suggestedUsers.slice(0, 10) : suggestedUsers.slice(0, 3);

  return (
    <>
      {isLoading && 
        <VStack py={8} px={6} gap={4}>
          {[0, 1, 2, 3].map((_, idx) =>(
              <HStack gap="5" key={idx}>
                <SkeletonCircle size="12" />
                <Stack flex="1">
                  <Skeleton height="2" width={"80%"}/>
                  <Skeleton height="2" width={"100px"}/>
                </Stack>
              </HStack>
          ))}
        </VStack>
      }

      {!isLoading &&  	      
    	  <VStack py={8} px={ !inNotificationsTab ? 6 : 0 } gap={4}>
          {!inNotificationsTab && (<SuggestedUsersHeader/>)}
          {limitedSuggestedUsers.length !== 0 && (    	      
            <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} fontSize={12} fontWeight={"medium"}>
    	        <Text fontSize={12} fontWeight={"bold"} color={"whiteAlpha.700"}>
    	          Suggested for you
    	        </Text>
    	        <Text cursor={"pointer"} fontSize={12} fontWeight={"bold"} color={"blue.500"} _hover={{color: "whiteAlpha.700"}} onClick={onOpen}>
    	          See All
    	        </Text>
    	      </Flex>
          )}

          {limitedSuggestedUsers.map(user =>(
    	      <SuggestedUser user={user} key={user.id} inNotificationsTab={inNotificationsTab}/>
    	    ))}

          {!inNotificationsTab && (    	    
            <Box fontSize={12} color={"whiteAlpha.700"} mt={5} alignSelf={"start"}>
    	        © 2024 BUILT BY{" "}
    	        <ChakraLink href="https://github.com/Timerk" isExternal fontSize={14} color="blue.500">
    	          Tim Berk
    	        </ChakraLink>
    	      </Box>
          )}
    	  </VStack>
      }

      <SeeAllModal isOpen={isOpen} onClose={onClose} elementsToDisplay={suggestedUsers} isNotifications={false}/>
    </>

  )
}
