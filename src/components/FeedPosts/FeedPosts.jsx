import { Container, VStack, Flex, SkeletonCircle, Skeleton, Box } from "@chakra-ui/react"
import  FeedPost  from "./FeedPost"
import useGetFeedPosts from "../../hooks/useGetFeedPosts"
import { useEffect, useState } from "react"
import useLoadImages from "../../hooks/useLoadImages"

export const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts()
  const {imagesLoaded, loadImages} = useLoadImages()

  useEffect(() => {
    if (!isLoading && posts.length > 0) {
      loadImages({posts});
    }
  }, [isLoading, posts])

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
        {(isLoading || !imagesLoaded) &&
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
        {!isLoading && (
          <>
            {posts.map((post) => (
              <FeedPost post={post} key={post.id}/>
            ))}
          </>
        )}
    </Container>
  )
}
