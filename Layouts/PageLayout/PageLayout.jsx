import { Flex, Box, Spinner, useBreakpointValue, VStack, Divider } from "@chakra-ui/react"
import { IoIosArrowBack } from "react-icons/io"
import { Sidebar } from "../../src/components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../src/firebase/firebase"
import NavBar from "../../src/components/NavBar/NavBar"
import { useState, useEffect } from "react"
import NotificationsTab from "../../src/components/Notifications/NotificationsTab"

export const PageLayout = ({children}) => {
  const {pathname} = useLocation()  
  const [user, loading] = useAuthState(auth)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const isLargeScreen = useBreakpointValue({ base: false, sm: true })
  const canRenderSideBar = pathname !== "/auth" && user
  const canRenderNavBar = !user && !loading && pathname !== "/auth" 
  const checkingUserAuth = !user && loading

  const toggleNotifications = () => {
    setIsNotificationsOpen(perv => !perv)
  }

  useEffect(() => {
    if (!canRenderSideBar && isNotificationsOpen) {
      toggleNotifications();
    }
  }, [canRenderSideBar, isNotificationsOpen]);

  if(checkingUserAuth) return <PageLayoutSpinner/>

  if (!isLargeScreen && isNotificationsOpen && canRenderSideBar) return <SmallScreenNotificationsTab toggleNotifications={toggleNotifications}/>

  return (
      <Flex flexDir={canRenderNavBar ? "column" : "row"} gap={isNotificationsOpen ? 0 : { base: 2, md: 6 }}>
        {canRenderSideBar ?
            ( <Box w={{base:"70px", md:"240px"}}>
                <Sidebar toogleNotifications={toggleNotifications}/>
              </Box>) : null
        }

        {(isNotificationsOpen && canRenderSideBar) && (<NotificationsTab/>) } 

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

const SmallScreenNotificationsTab = ({toggleNotifications}) => {
  return (
    <VStack align="start">
      <Flex align="start" w={"full"} direction={"column"} justifyContent={"center"} marginTop={2}>
        <IoIosArrowBack size={30} color={"whiteAlpha.800"} cursor={"pointer"} onClick={toggleNotifications}/>
        <Divider bg={"whiteAlpha.800"} my={2}/>
      </Flex> 
      <NotificationsTab/>
    </VStack>
  );
};
