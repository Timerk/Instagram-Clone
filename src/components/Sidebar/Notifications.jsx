import { Tooltip, Box } from "@chakra-ui/react"
import { NotificationsLogo } from "../../assets/constants"

const Notifications = () => {
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
        <NotificationsLogo/>
        <Box display={{base:"none", md:"block"}}>
            Notifications
        </Box>
    </Tooltip>
  )
}

export default Notifications