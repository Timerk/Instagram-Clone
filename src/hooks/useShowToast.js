import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
    const toast = useToast()
    const showToast = useCallback((title, description, status) => {
        const stack = new Error().stack;
        const caller = stack?.split("\n")[2]?.trim(); // Zweite Zeile: Aufrufer
        console.log("useShowToast aufgerufen von:", caller);
        toast({
            title: title,
            description: description,
            status: status,
            duration: 3000,
            isClosable: true,
        })
    }, [toast])

    return showToast
}

export default useShowToast
