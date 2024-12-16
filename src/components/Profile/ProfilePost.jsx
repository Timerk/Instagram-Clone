import { GridItem, Flex, Text, Image, useDisclosure, useBreakpointValue } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import useUserProfileStore from "../../store/userProfileStore";
import ViewPostModal from "../Modals/ViewPostModal";
import useLikePost from "../../hooks/useLikePost";
import { useState } from "react";
import FeedPost from "../FeedPosts/FeedPost";

export const ProfilePost = ({post, setPostClicked, setInspectedPost}) => {
  const userProfile = useUserProfileStore((state) => state.userProfile)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleLikePost, likes, isLiked} = useLikePost({post})

  const [showFeedPost, setShowFeedPost] = useState(false)
  const isLargeScreen = useBreakpointValue({ base: false, md: true })

  const handleClick = () => {
    if (isLargeScreen) {
      onOpen()
    } else {
      setPostClicked(true)
      setInspectedPost(post)
    }
  }
 
  return (
    <>
      {!showFeedPost ? (
        <GridItem 
          cursor={"pointer"} 
          borderRadius={4} 
          border={"1px solid"} 
          borderColor={"blackAlpha.700"} 
          overflow={"hidden"} 
          position={"relative"}
          aspectRatio={1 / 1} 
          onClick={handleClick}
        >
          <Flex 
            opacity={0}
            _hover={{ opacity: 1 }}
            justifyContent={"center"}
            position={"absolute"}
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg={"blackAlpha.700"}
            transition={"opacity 0.3s ease"}
            zIndex={1}
          >
            <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
              <Flex alignItems="center">
                <AiFillHeart size={20}/>
                <Text fontWeight={"bold"} ml={2}>{post.likes.length}</Text>
              </Flex>
              <Flex alignItems="center">
                <FaComment size={20}/>
                <Text fontWeight={"bold"} ml={2}>
                  {post.comments.length}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Image src={post.imageURL} w={"100%"} h={"100%"} alt="post" objectFit={"cover"}/>
        </GridItem>
      ) : (
        <FeedPost post={post} />
      )}
  
      {/* ViewPostModal nur für große Bildschirme */}
      {isLargeScreen && (
        <ViewPostModal 
          isOpen={isOpen} 
          onClose={onClose} 
          post={post} 
          userProfile={userProfile}
          handleLikePost={handleLikePost}
          likes={likes}
          isLiked={isLiked} 
        />
      )}
    </>
  )
}

/*       <Modal isOpen={isOpen} onClose={onClose}
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
                <Divider my={4} bg={"whiteAlpha.800"}/>
                <PostFooder isProfilePost={true} post={post}/>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
*/