import { useState, useEffect } from "react"
import { ProfilePost } from "./ProfilePost"
import { Grid, Skeleton, VStack, Box } from "@chakra-ui/react"

export const ProfilePosts = ({avatar}) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect (() => {
    setTimeout (() => {
      setIsLoading(false)
    }, 2000)
  }, [])


  return (
    <Grid templateColumns={{sm:"repeat(1, 1fr)", md:"repeat(3, 1fr)"}} gap={1} columnGap={1}>
      {isLoading && [0, 1, 2, 3, 4, 5].map((_, idx) =>(
        <Skeleton key={idx} w={"full"}>
          <Box h={"300px"}>contents</Box>
        </Skeleton>
      ))}

      {!isLoading && 
        <>
         <ProfilePost img="/img1.png" avatar={avatar}/>
         <ProfilePost img="/img2.png" avatar={avatar}/>
         <ProfilePost img="/img3.png" avatar={avatar}/>
         <ProfilePost img="/img4.png" avatar={avatar}/>
         <ProfilePost img="/img1.png" avatar={avatar}/>
         <ProfilePost img="/img2.png" avatar={avatar}/>
        </>
      }

    </Grid>
  )
}
