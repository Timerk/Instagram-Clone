import { useEffect, useState } from "react"
import useShowToast from "./useShowToast"
import usePostStore from "../store/postStore"
import useAuthStore from "../store/authStore"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import useUserProfileStore from "../store/userProfileStore"
const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true)
    const showToast = useShowToast()
    const { posts, setPosts } = usePostStore()
    const authUser = useAuthStore(state => state.user)
    const setUserProfile = useUserProfileStore(state => state.setUserProfile)

    useEffect(() => {
        const getFeedPosts = async () => {
            setIsLoading(true)
            if (authUser.following.length === 0){
                setIsLoading(false)
                setPosts([])
                return
            }
            setPosts([])

            try {
                const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following))
                const querySnapshot = await getDocs(q)

                const fetchedPosts = [] 
                querySnapshot.forEach((doc) => {
                    fetchedPosts.push({ ...doc.data(), id: doc.id })
                })

                fetchedPosts.sort((a, b) => b.createdAt - a.createdAt)

                setPosts(fetchedPosts)
            } catch (error) {
                showToast("Error", error.message, "error")
            }finally{
                setIsLoading(false)
            }
        }
        if(authUser) getFeedPosts()
    },[authUser, setPosts, showToast, setUserProfile])

    return { isLoading, posts }
}

export default useGetFeedPosts