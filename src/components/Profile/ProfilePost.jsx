import { GridItem, Flex, Text, Image, useDisclosure, Avatar, Box, Divider, VStack } from "@chakra-ui/react"
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import { MdDelete } from "react-icons/md";
import { Comment } from "../Comment/comment";
import { PostFooder } from "../FeedPosts/PostFooder";
export const ProfilePost = ({img, avatar}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

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
            <Text fontWeight={"bold"} ml={2}>12</Text>
          </Flex>
          <Flex>
            <FaComment size={20}>
              <Text fontWeight={"bold"} ml={2}>
                comments
              </Text>
            </FaComment>
          </Flex>
        </Flex>
      </Flex>
      <Image src={img} w={"100%"} h={"100%"} alt="post" objectFit={"cover"}/>
      </GridItem>

      <Modal isOpen={isOpen} onClose={onClose}
        isCentered={true}
        size={{base:"3xl", md:"5xl"}}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"gray.900"} pb={5}>
            <Flex gap={4} w={{base:"90%", sm:"70%", md:"full"}} mx={"auto"}>
              <Box borderRadius={4} overflow={"hidden"} border={"1px solid"} borderColor={"blackAlpha.700"} flex={1.5}>
                <Image src={img} alt="posted pic"/>
              </Box>
              <Flex flex={1} flexDirection={"column"} px={10} display={{base:"none", md:"flex"}}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex gap={4} alignItems={"center"}>
                    <Avatar src={avatar} alt="profile avatar" size={"sm"}/>
                    <Text fontSize={12} fontWeight={"bold"}>Mossi</Text>
                  </Flex>
                  <Box _hover={{bg:"whiteAlpha.300", color: "red.600"}} borderRadius={4} p={1}>
                    <MdDelete cursor={"pointer"} size={20}></MdDelete>
                  </Box>
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
