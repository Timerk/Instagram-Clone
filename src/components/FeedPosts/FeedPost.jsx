import { Container, Flex, Box, Image } from '@chakra-ui/react'
import { PostFooder } from './PostFooder'
import { PostHeader } from './PostHeader'

const FeedPost = () => {
  return (
    <>
      <PostHeader/>
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src='/img4.png' h={400} alt='beach image'/>
      </Box>
      <PostFooder/>
    </>
  )
}

export default FeedPost
