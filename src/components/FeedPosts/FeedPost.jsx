import { Flex, Image } from '@chakra-ui/react'
import { FeedPostFooder } from './FeedPostFooder'
import { PostHeader } from './PostHeader'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'

const FeedPost = ({post}) => {
  const {isLoading, userProfile} = useGetUserProfileById(post?.createdBy)
  
  return (
    <>
      <PostHeader post={post} userProfile={userProfile}/>
      <Flex my={2} borderRadius={4} overflow={"hidden"} justifyContent={"center"} alignItems={"center"}>
        <Image src={post.imageURL} alt={"post"}/>
      </Flex>
      <FeedPostFooder isProfilePost={false} post={post} userProfile={userProfile}/>
    </>
  )
}

export default FeedPost
