import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers"
import  { SuggestedUser }  from "./SuggestedUser"
import SuggestedUsersHeader from "./SuggestedUsersHeader"
import { VStack, Flex, Box, Text, Link as ChakraLink, Skeleton, SkeletonCircle, Stack, HStack } from "@chakra-ui/react"

export const SuggestedUsers = () => {
  const { isLoading, suggestedUsers} = useGetSuggestedUsers()

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
    	  <VStack py={8} px={6} gap={4}>
    	    <SuggestedUsersHeader/>
          {suggestedUsers.length !== 0 && (    	      
            <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} fontSize={12} fontWeight={"medium"}>
    	        <Text fontSize={12} fontWeight={"bold"} color={"whiteAlpha.700"}>
    	          Suggested for you
    	        </Text>
    	        <Text cursor={"pointer"} fontSize={12} fontWeight={"bold"} color={"blue.500"} _hover={{color: "whiteAlpha.700"}}>
    	          See All
    	        </Text>
    	      </Flex>
          )}

          {suggestedUsers.map(user =>(
    	      <SuggestedUser user={user} key={user.id}/>
    	    ))}

    	    <Box fontSize={12} color={"whiteAlpha.700"} mt={5} alignSelf={"start"}>
    	      © 2024 BUILT BY{" "}
    	      <ChakraLink href="https://github.com/Timerk" isExternal fontSize={14} color="blue.500">
    	        Tim Berk
    	      </ChakraLink>
    	    </Box>
    	  </VStack>
      }
    </>

  )
}
