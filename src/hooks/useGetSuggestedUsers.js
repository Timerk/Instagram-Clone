import { useState } from "react"
import useShowToast from "./useShowToast"
import useAuthStore from "../store/authStore"
import { useEffect } from "react"
import { collection, getDocs, query, where, orderBy, limit  } from "firebase/firestore"
import { firestore } from "../firebase/firebase"

const useGetSuggestedUsers = ({ usersToFetch }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const authUser = useAuthStore((state) => state.user)
    const showToast = useShowToast()
    
    useEffect(() => {
        const getSuggestedUsers = async () => {
            try {
                const usersRef = collection(firestore, "users")
                const q = query(usersRef,
                    where("uid", "not-in", [authUser.uid, ...authUser.following]),
					orderBy("uid"),
					limit(usersToFetch)                   
                )

                const querySnapshot = await getDocs(q)
                const users = []

                querySnapshot.forEach((doc) => {
					users.push({ ...doc.data(), id: doc.id });
				});

				setSuggestedUsers(users);
            } catch (error) {
                showToast("Error", error.message, "error")
            }finally{
                setIsLoading(false)
            }
        }

        if (authUser) {
            getSuggestedUsers()
        }
    },[authUser, suggestedUsers])

    return { isLoading, suggestedUsers }
}

export default useGetSuggestedUsers