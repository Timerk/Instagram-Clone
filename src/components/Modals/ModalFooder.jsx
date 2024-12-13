import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { NotificationsLogo, UnlikeLogo, CommentLogo } from '../../assets/constants'
import useCreateComment from '../../hooks/useCreateComment'
import useShowToast from '../../hooks/useShowToast'
import useLikePost from '../../hooks/useLikePost'

const ModalFooder = ({post, authUser, handleLikePost, isLiked, likes}) => {

  const {isUploading, handlePostComment} = useCreateComment()
  const [comment , setComment] = useState("")
  const showToast = useShowToast()
  const commentRef = useRef(null)

  const handleSubmitComment = async() =>{
    try {
      await handlePostComment(post.id, comment)
      setComment("")
    } catch (error) {
      showToast("Error", error.message, "error")
    }

  }

  return (
    <>
      <Box mb={10} marginTop={"auto"}>
        {authUser && (
          <Flex alignItems={"center"} gap={4} mt={4} w={"full"} pt={0} mb={2}>
            <Box cursor={"pointer"} onClick={handleLikePost}>
              {!isLiked ? <NotificationsLogo/> : <UnlikeLogo/>}
            </Box>
            <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
              <CommentLogo/>
            </Box>
          </Flex>
        )}
        <Text fontWeight={600} fontSize={"sm"} w={"full"}>
          {likes} likes
        </Text>
        {authUser &&( 
          <Flex justifyContent={"space-between"} alignContent={"center"} gap={2} w={"full"}>

              <InputGroup>
                <Input variant={"flushed"} placeholder={"comment"} fontSize={14} 
                    onChange={(e) => setComment(e.target.value)}
		  	  	  			value={comment}
		  	  	  			ref={commentRef}
                  />
                <InputRightElement>
                  <Button fontSize={14} color={"whiteAlpha.800"} cursor={"pointer"} fontWeight={600} bg={"transparent"} isLoading={isUploading} onClick={handleSubmitComment}>Post</Button>
                </InputRightElement>
              </InputGroup>
          </Flex>
        )}
      </Box>
    </>
  )
}

export default ModalFooder