import { Flex, Box, Text, InputGroup, Input, InputRightElement, Button, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { NotificationsLogo, UnlikeLogo, CommentLogo } from "../../assets/constants"
import useCreateComment from "../../hooks/useCreateComment"
import useShowToast from "../../hooks/useShowToast"
import useAuthStore from "../../store/authStore"
import useLikePost from "../../hooks/useLikePost"
import ViewPostModal from "../Modals/ViewPostModal"

export const FeedPostFooder = ({post, isProfilePost, userProfile}) => {

  const {isUploading, handlePostComment} = useCreateComment()
  const [comment , setComment] = useState("")
  const showToast = useShowToast()
  const commentRef = useRef(null)
  const authUser = useAuthStore((state) => state.user)
  const { handleLikePost, likes, isLiked } = useLikePost({post})
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      <Box mb={10} marginTop={"auto"} w={"full"}>
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
        {post.caption !== "" && (        
          <Text fontWeight={700} fontSize={"sm"} w={"full"}>
            {userProfile?.username}{" "}
            <Text as={"span"} fontWeight={400} fontSize={"sm"}>
              {post.caption}
            </Text>
          </Text>)
        }
        <Text fontWeight={400} fontSize={"sm"} w={"full"} cursor={"pointer"} color={"gray"} onClick={onOpen}>
              View other comments
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
      <ViewPostModal 
        isOpen={isOpen} 
        onClose={onClose}   
        post={post} 
        userProfile={userProfile}
        isProfilePost={isProfilePost}
        handleLikePost={handleLikePost}
        isLiked={isLiked}
        likes={likes}
      />
    </>
  )
}
