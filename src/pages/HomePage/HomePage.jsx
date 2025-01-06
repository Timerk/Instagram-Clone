import { Container } from "@chakra-ui/react"
import { Flex, Box } from "@chakra-ui/react"
import { FeedPosts } from "../../components/FeedPosts/FeedPosts"
import { SuggestedUsers } from "../../components/SuggestedUsers/SuggestedUsers"

export const HomePage = () => {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <FeedPosts/>
        </Box>
        <Box flex={3} mr={20} maxW={"300px"} display={{base:"none", lg:"block"}} py={5}>
          <SuggestedUsers inNotificationsTab={false} usersToFetch={30}/>
        </Box>
      </Flex>
    </Container>
  )
}

