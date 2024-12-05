import { Flex, Image } from '@chakra-ui/react'
import { PostFooder } from './PostFooder'
import { PostHeader } from './PostHeader'

const FeedPost = ({post}) => {
  return (
    <>
      <PostHeader post={post}/>
      <Flex my={2} borderRadius={4} overflow={"hidden"} justifyContent={"center"} alignItems={"center"}>
        <Image src={post.imageURL} alt={"post"}/>
      </Flex>
      <PostFooder isProfilePost={false} post={post}/>
    </>
  )
}

export default FeedPost
