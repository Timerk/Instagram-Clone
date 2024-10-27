import { Container } from "@chakra-ui/react"
import  FeedPost  from "./FeedPost"

export const FeedPosts = () => {
  return (
    <Container>
        <FeedPost img="/img1.png" username="Mossi" avatar="img1.png" />
        <FeedPost img="/img2.png" username="Meihsei" avatar="img3.png" />
        <FeedPost img="/img3.png" username="Meh" avatar="img2.png" />
        <FeedPost img="/img4.png" username="Mo" avatar="img1.png" />
    </Container>
  )
}
