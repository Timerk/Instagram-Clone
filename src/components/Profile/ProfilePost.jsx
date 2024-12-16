import { GridItem, Flex, Text, Image, useDisclosure, useBreakpointValue, Skeleton, Box } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import useUserProfileStore from "../../store/userProfileStore";
import ViewPostModal from "../Modals/ViewPostModal";
import useLikePost from "../../hooks/useLikePost";
import { useState, useEffect } from "react";
import FeedPost from "../FeedPosts/FeedPost";
import useLoadImages from "../../hooks/useLoadImages";


export const ProfilePost = ({post, setPostClicked, setInspectedPost}) => {
  const userProfile = useUserProfileStore((state) => state.userProfile)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleLikePost, likes, isLiked} = useLikePost({post})
  const {imagesLoaded, loadImages} = useLoadImages()

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

  useEffect(() => {
    if (post) {
      loadImages({posts: [post]});
    }
  }, [post])
 
  return (
    <>      
    {!imagesLoaded ? (
      <Skeleton w="full">
        <Box h="300px">Loading Image...</Box>
      </Skeleton>
    ): 
       (!showFeedPost ? (
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
        ))
      }
  
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
