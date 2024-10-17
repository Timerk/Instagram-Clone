import { Container } from "@chakra-ui/react"
import { Flex, Box } from "@chakra-ui/react"
import { FeedPosts } from "../../components/FeedPosts/FeedPosts"


export const HomePage = () => {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10} border={"1px solid blue"}>
          <FeedPosts></FeedPosts>
        </Box>
        <Box flex={3} mr={20} maxW={"300px"} display={{base:"none", lg:"block"}} border={"1px solid red"}>
          Friend
        </Box>
      </Flex>
    </Container>
  )
}

