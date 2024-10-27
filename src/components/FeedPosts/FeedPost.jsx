import { Container, Flex, Box, Image } from '@chakra-ui/react'
import { PostFooder } from './PostFooder'
import { PostHeader } from './PostHeader'

const FeedPost = ({img, username, avatar}) => {
  return (
    <>
      <PostHeader username={username} avatar={avatar}/>
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={img} alt={username}/>
      </Box>
      <PostFooder username={username}/>
    </>
  )
}

export default FeedPost
