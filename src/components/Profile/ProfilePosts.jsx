import { ProfilePost } from "./ProfilePost"
import { Grid, Skeleton, Box, Flex, Text } from "@chakra-ui/react"
import useGetUserPost from "../../hooks/useGetUserPost"

export const ProfilePosts = () => {
  const { isLoading, posts} = useGetUserPost()
  const noPostsFound = !isLoading && posts.length === 0
  
  if(noPostsFound) return <NoPostsFound/>

  return (
    <Grid templateColumns={{sm:"repeat(1, 1fr)", md:"repeat(3, 1fr)"}} gap={1} columnGap={1}>
      {isLoading && [0, 1, 2].map((_, idx) =>(
        <Skeleton key={idx} w={"full"}>
          <Box h={"300px"}>contents</Box>
        </Skeleton>
      ))}

      {!isLoading && (
				<>
					{posts.map((post) => (
						<ProfilePost post={post} key={post.id}/>
					))}
				</>
			)}

    </Grid>
  )
}

const NoPostsFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Posts Found🤔</Text>
		</Flex>
	);
};
