import { Tooltip, Link, Box, Avatar } from "@chakra-ui/react"
import { Link as RouterLink} from "react-router-dom"
import useAuthStore from "../../store/authStore"

const authUser = useAuthStore((state) => state.user)

const ProfileLink = () => {
  return (
    <Tooltip
        key={index}
        hasArrow
        label={item.text}
        placement="right"
        ml={1}
        openDelay={500}
        display={{base:"block", md:"none"}}
    >       
        <Link
            display={"flex"}
            top={`/auth/${authUser?.username || ""}`}
            as={RouterLink}
            alignItems={"center"}
            gap={4}
            _hover={{bg:"whiteAlpha.400"}}
            borderRadius={6}
            p={2}
            w={{base:10, md:"full"}}
            justifyContent={{base:"center", md:"flex-start"}}
        >
            <Avatar src={authUser?.profilePicURL || ""} size={"xs"}/>
            <Box display={{base:"none", md:"block"}}>
                Profile
            </Box>
        </Link>
    </Tooltip>
  )
}

export default ProfileLink