import { GridItem, Flex, Text, Image, useDisclosure, Avatar, Box, Divider, VStack } from "@chakra-ui/react"
import { Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import { MdDelete } from "react-icons/md";
import { Comment } from "../Comment/comment";
import { PostFooder } from "../FeedPosts/PostFooder";
import useAuthStore from "../../store/authStore";
import useUserProfileStore from "../../store/userProfileStore";

export const ProfilePost = ({post}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const authUser = useAuthStore((state) => state.user)
  const userProfile = useUserProfileStore((state) => state.userProfile)

  return (
    <>
      <GridItem cursor={"pointer"} 
      borderRadius={4} 
      border={"1px solid"} 
      borderColor={"blackAlpha.700"} 
      overflow={"hidden"} 
      position={"relative"}
      aspectRatio={1/1} 
      onClick={onOpen}
    >
      <Flex opacity={0}
        _hover={{opacity:1}}
        justifyContent={"center"}
        position={"absolute"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={"blackAlpha.700"}
        transition={"all 0.3 ease"}
        zIndex={1}
      >
        <Flex justifyContent={"center"} alignItems={"center"} gap={50}>
          <Flex>
            <AiFillHeart size={20}/>
            <Text fontWeight={"bold"} ml={2}>{post.likes.length}</Text>
          </Flex>
          <Flex>
            <FaComment size={20}/>
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
          </Flex>
        </Flex>
      </Flex>
      <Image src={post.imageURL} w={"100%"} h={"100%"} alt="post" objectFit={"cover"}/>
      </GridItem>

      <Modal isOpen={isOpen} onClose={onClose}
        isCentered={true}
        size={{base:"3xl", md:"5xl"}}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"gray.900"} pb={5}>
            <Flex gap={4} w={{base:"90%", sm:"70%", md:"full"}} mx={"auto"} maxHeight={"90vh"} minHeight={"50vh"}>
              <Flex borderRadius={4} overflow={"hidden"} flex={1.5} justifyContent={"center"} alignItems={"center"}>
                <Image src={post.imageURL} alt="posted pic" border={"1px solid"} borderColor={"blackAlpha.700"}/>
              </Flex>
              <Flex flex={1} flexDirection={"column"} px={10} display={{base:"none", md:"flex"}}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex gap={4} alignItems={"center"}>
                    <Avatar src={userProfile?.profilePicURL} alt="profile avatar" size={"sm"}/>
                    <Text fontSize={12} fontWeight={"bold"}>{userProfile?.username}</Text>
                  </Flex>

                  {authUser.uid === userProfile.uid && (
                    <Button size={"sm"} bg={"transparent"} _hover={{bg:"whiteAlpha.300", color: "red.600"}} borderRadius={4} p={1} >
                      <MdDelete cursor={"pointer"} size={20}></MdDelete>
                    </Button>  
                  )}
                </Flex>
                <Divider my={4} bg={"whiteAlpha.800"}/>

                <VStack w={"full"} alignItems={"start"} maxH={350} overflowY={"auto"}>
                  <Comment
                    createdAt="1d ago"
                    username="Mossi"
                    profilePic="/profilepic.png"
                    text="nice pic"
                  />
                  <Comment
                    createdAt="1d ago"
                    username="Mossi"
                    profilePic="/profilepic.png"
                    text="nice pic"
                  />
                </VStack>
                <Divider my={4} bg={"whiteAlpha.800"}/>
                <PostFooder isProfilePost={true}/>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
