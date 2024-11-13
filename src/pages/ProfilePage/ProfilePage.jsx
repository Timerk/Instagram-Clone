import { Container, Flex } from "@chakra-ui/react"
import { ProfileHeader } from "../../components/Profile/ProfileHeader"
import { ProfilePost } from "../../components/Profile/ProfilePost"
import { ProfileTabs } from "../../components/Profile/ProfileTabs"
import { ProfilePosts } from "../../components/Profile/ProfilePosts"

export const ProfilePage = () => {
  return (
    <Container maxWidth={"container.lg"} py={5}>
      <Flex flexDirection={"column"} w={"full"} py={10} px={4} pl={{base:4, md:10}} mx={"auto"}>
        <ProfileHeader username="Mossi" avatar="img1.png"/>
      </Flex>
      <Flex px={{base:2, sm:4}} maxW={"full"} mx={"auto"} borderColor={"whiteAlpha.700"} direction={"column"}>
        <ProfileTabs/>
        <ProfilePosts avatar={"img1.png"}/>
      </Flex>
      
    </Container>
  )
}
