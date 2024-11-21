import { Tooltip, Box } from "@chakra-ui/react"
import { CreatePostLogo } from "../../assets/constants"

const CreatePost = () => {
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
        <CreatePostLogo/>
        <Box display={{base:"none", md:"block"}}>
            Create
        </Box>
    </Tooltip>
  )
}

export default CreatePost