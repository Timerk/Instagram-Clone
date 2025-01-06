import { Container, VStack, Flex, SkeletonCircle, Skeleton, Box, Text } from "@chakra-ui/react"
import  FeedPost  from "./FeedPost"
import useGetFeedPosts from "../../hooks/useGetFeedPosts"
import { useEffect } from "react"
import useLoadImages from "../../hooks/useLoadImages"

export const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts()
  const {imagesLoaded, loadImages} = useLoadImages()
  const showSkeleton = isLoading || !imagesLoaded
  const noPostsFound = !isLoading && posts.length === 0

  useEffect(() => {
    if (!isLoading && posts.length > 0) {
      loadImages({posts});
    }
  }, [isLoading, posts])

  if(noPostsFound) return <NoPostsFound/>

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
        {showSkeleton &&
          [0, 1, 2, 3].map((_, idx) => (
            <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
                <Flex gap={2}>
                  <SkeletonCircle size="10"/>
                  <VStack gap={2} alignItems={"flex-start"}>
                    <Skeleton height={"10px"} w={"200px"}/>
                    <Skeleton height={"10px"} w={"200px"}/>
                  </VStack>
                </Flex>
                <Skeleton w={"full"}>
                  <Box h={"500px"}>contents wrapped</Box>
                </Skeleton>
            </VStack>
          ))}
        {!showSkeleton && (
          <>
            {posts.map((post) => (
              <FeedPost post={post} key={post.id}/>
            ))}
          </>
        )}
    </Container>
  )
}

const NoPostsFound = () => {
  return (
    <Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Found🤔</Text>
      <Text as={"span"} fontSize={"2xl"}>Follow other users to see their posts in your feed.</Text>
    </Flex>
  );
};
