import { Flex, Box, Spinner } from "@chakra-ui/react"
import { Sidebar } from "../../src/components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../src/firebase/firebase"
import NavBar from "../../src/components/NavBar/NavBar"

export const PageLayout = ({children}) => {
  const {pathname} = useLocation()  
  const [user, loading] = useAuthState(auth)
  const canRenderSideBar = pathname !== "/auth" && user
  const canRenderNavBar = !user && !loading && pathname !== "/auth" 
  const checkingUserAuth = !user && loading

  if(checkingUserAuth) return <PageLayoutSpinner/>
  return (
    <Flex flexDir={canRenderNavBar ? "column" : "row"}>
        {canRenderSideBar ?
            ( <Box w={{base:"70px", md:"240px"}}>
                <Sidebar/>
              </Box>) : null}

        {canRenderNavBar ? <NavBar/> : null}

        <Box flex={1} w={{base: "calc(100% -70px)", md:"calc(100% -240px)"}} mx={"auto"}>
         {children}
        </Box>
    </Flex>
  )
}

const PageLayoutSpinner = () => {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
};
