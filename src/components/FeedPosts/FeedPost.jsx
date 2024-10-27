import { Container } from '@chakra-ui/react'
import React from 'react'

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
