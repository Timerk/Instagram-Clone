import { Flex, Box, Avatar, Link} from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

export const SuggestedUsersHeader = ({username, avatar}) => {
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} my={2}>
        <Flex alignItems={"center"} gap={2}>
            <Avatar src={avatar} alt="user" size={"md"}/>
        <Flex fontSize={12} fontWeight={"bold"} gap={2} alignItems={"center"}>
          {username}
        </Flex>
      </Flex>
      <Link as={RouterLink} to={"/auth"} cursor={"pointer"} fontSize={12} fontWeight={"medium"} color="blue.500" style={{textDecoration :"none"}}>
        Log out
      </Link>
    </Flex>
  )
}
