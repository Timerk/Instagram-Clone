import { Container, Flex, Link, Text, VStack, Skeleton, SkeletonCircle } from "@chakra-ui/react"
import { ProfileHeader } from "../../components/Profile/ProfileHeader"
import { ProfileTabs } from "../../components/Profile/ProfileTabs"
import { ProfilePosts } from "../../components/Profile/ProfilePosts"
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername"
import { useParams } from "react-router-dom"
import { Link as RouterLink } from "react-router-dom"

export const ProfilePage = () => {
  const username = useParams()
  const { isLoading, userProfile } = useGetUserProfileByUsername(username)

  const userNotFound = !isLoading && !userProfile

  if (userNotFound) {
    return <UserNotFound/>
  }

  return (
    <Container maxWidth={"container.lg"} py={5}>
      <Flex flexDirection={"column"} w={"full"} py={10} px={4} pl={{base:4, md:10}} mx={"auto"}>
        { !isLoading && userProfile && <ProfileHeader username={userProfile.username} avatar="img1.png"/>}
        { isLoading && !userProfile && <ProfileHeaderSkeleton/>}
      </Flex>
      <Flex px={{base:2, sm:4}} maxW={"full"} mx={"auto"} borderColor={"whiteAlpha.700"} direction={"column"}>
        <ProfileTabs/>
        <ProfilePosts avatar={userProfile?.profilePicURL} username={userProfile?.username}/>
      </Flex>
      
    </Container>
  )
}

const UserNotFound = () => {
  return (
    <Flex flexDir="column" textAlign="center" mx="auto">
      <Text fontSize="2xl">User Not Found</Text>
      <Link as={RouterLink} to="/" color="blue.500" w="max-content" mx="auto">
        Go home
      </Link>
    </Flex>
  );
};

const ProfileHeaderSkeleton = () => {
  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10}>
      <Flex direction={{ base: "column", sm: "row" }} justifyContent="center" alignItems="center">
        <SkeletonCircle size="24" />
      </Flex>
      <VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx="auto" flex={1}>
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />
      </VStack>
    </Flex>
  );
};

