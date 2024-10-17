import { Flex, Box } from "@chakra-ui/react"
import { Sidebar } from "../../src/components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"

export const PageLayout = ({children}) => {
  const {pathname} = useLocation()  
  return (
    <Flex>
        {pathname !== '/auth' ?
            ( <Box w={{base:"70px", md:"240px"}}>
                <Sidebar/>
              </Box>) : null}
        <Box flex={1} w={{base: "calc(100% -70px)", md:"calc(100% -240px)"}}>
         {children}
        </Box>
    </Flex>
  )
}
