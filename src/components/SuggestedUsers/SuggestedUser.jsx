import { Flex, Avatar, VStack, Text, Button } from "@chakra-ui/react"
import useAuthStore from "../../store/authStore"
import useFollowUser from "../../hooks/useFollowUser"
import { Link } from "react-router-dom"

export const SuggestedUser = ({ user, setUser }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user?.uid)
  const authUser = useAuthStore((state) => state.user)

  const onFollowUser = async () => {
    await handleFollowUser();
    if(setUser){
      setUser((prevUser) => ({
        ...prevUser,
        followers: isFollowing
            ? prevUser.followers.filter((follower) => follower.uid !== authUser.uid)
            : [...prevUser.followers, authUser],
      }));
    }
  };

  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${user?.username}`}>
          <Avatar src={user?.profilePicURL || ""} size={"md"} cursor={"pointer"}/>
        </Link>
          <VStack spacing={2}>
            <Link to={`${user?.username}`} style={{ display: "contents" }}>
              <Text fontSize={12} fontWeight={"bold"} alignSelf={"start"} cursor={"pointer"}>
                {user.username}
              </Text>
            </Link>I
            <Text fontSize={12} fontWeight={"bold"} color={"whiteAlpha.700"}>
              {user.followers.length} followers
            </Text>
          </VStack>
      </Flex>
      

        { authUser?.uid !== user?.uid && 
          (
            <Button cursor={"pointer"} 
              fontSize={12}
              fontWeight={"medium"} 
              color={"blue.500"} 
              bg={"transparent"} p={0} 
              h={"max-content"} 
              _hover={{color: "whiteAlpha.700"}}
              onClick={onFollowUser}
              isLoading={isUpdating}
            >
            {!isFollowing ? "Follow" : "Unfollow"}
            </Button>
          )
        }
    </Flex>
  )
}
