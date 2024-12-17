import { Avatar, Button, Divider, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { MdDelete } from "react-icons/md"
import { Comment } from "../Comment/Comment"
import { Caption } from "../Comment/Caption"
import useDeletePost from "../../hooks/useDeletePost"
import useShowToast from "../../hooks/useShowToast"
import useAuthStore from "../../store/authStore"
import ModalFooder from "./ModalFooder"

const ViewPostModal = ({isOpen, onClose, post, userProfile, handleLikePost, likes, isLiked }) => {
  const authUser = useAuthStore((state) => state.user)
  const { isDeleting, handleDeletePost } = useDeletePost()
  const showToast = useShowToast()

  const handlePostDeletion = async () =>{
    try {
      await handleDeletePost(post)
      onClose()
    } catch (error) {
      showToast("Error", error.message, "error")
    }
  }
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      isCentered={true}
      size={{base:"3xl", md:"5xl"}}
    >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"gray.900"} pb={5}>
            <Flex gap={4} w={{base:"90%", sm:"70%", md:"full"}} mx={"auto"} maxHeight={"90vh"} minHeight={"50vh"} justifyContent={"center"}>
              <Flex borderRadius={4} overflow={"hidden"} flex={1.5} justifyContent={"center"} alignItems={"center"} display={{ base: "none", md: "flex" }}>
                <Image src={post.imageURL} alt="posted pic" border={"1px solid"} borderColor={"blackAlpha.700"}/>
              </Flex>
              <Flex flex={1} flexDirection={"column"} px={{ base: 4, md: 10 }} w={{ base: "full" }}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex gap={4} alignItems={"center"}>
                    <Link to={`/${userProfile?.username}`} style={{ display: "contents" }}>
                      	<Avatar src={userProfile?.profilePicURL} alt="profile avatar" size={"sm"}/>
                      	<Text fontSize={12} fontWeight={"bold"}>{userProfile?.username}</Text>
                    </Link>
                  </Flex>

                  {authUser && userProfile && authUser.uid === userProfile.uid && (
                    <Button 
                      size={"sm"} 
                      bg={"transparent"} 
                      _hover={{bg:"whiteAlpha.300", 
                      color: "red.600"}} 
                      borderRadius={4} 
                      p={1} 
                      isLoading={isDeleting}
                      onClick={handlePostDeletion}
                    >
                      <MdDelete cursor={"pointer"} size={20}></MdDelete>
                    </Button>  
                  )}
                </Flex>
                <Divider my={4} bg={"whiteAlpha.800"}/>
                {post?.caption !== "" && (
                    <Caption post={post}/>
                )}
                <VStack w={"full"} alignItems={"start"} maxH={350} overflowY={"auto"}>
                  {post?.comments?.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  )) || <Text>No comments available</Text>}
                </VStack>
                {(post?.caption !== "" || post?.comments?.length > 0) && <Divider my={4} bg={"whiteAlpha.800"}/>}
                <ModalFooder post={post} authUser={authUser} handleLikePost={handleLikePost} likes={likes} isLiked={isLiked}/>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default ViewPostModal