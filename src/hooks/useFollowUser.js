import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore"
import useUserProfileStore from "../store/userProfileStore"
import useShowToast from "./useShowToast"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"

const useFollowUser = (userId) => {
    const [ isUpdating, setIsUpdating ] = useState(false)
    const [ isFollowing, setIsFollowing ] = useState(false) 
    const { user, setUser } = useAuthStore(state => state.user)
    const { userProfile, setUserProfile } = useUserProfileStore()
    const showToast = useShowToast()

    const handleFollowUser = async () => {
        try {
            const currentUserRef = doc(firestore, "users", user.uid)
            const userToFollowRef  = doc(firestore, "users", userId)

            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            })

            await updateDoc(userToFollowRef, {
                followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid)
            })

            if (isFollowing) {

                setUser({
                    ...user,
                    following: user.following.filter(uid => uid !== userId),
                })

                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter(uid => uid !== user.uid)
                })

                localStorage.setItem("user-info", JSON.stringify({
                    ...user,
                    following: user.following.filter(uid => uid !== userId)
                }))

                setIsFollowing(false)
            }else{
                setUser({
                    ...user,
                    following: [...user.following, userId]
                })

                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, user.uid]
                })

                localStorage.setItem("user-info", JSON.stringify({
                    ...user,
                    followers: [...user.following, userId]
                }))

                setIsFollowing(true)
            }
        

        } catch (error) {
            showToast("Error", error.message, "error")
        }finally{
            setIsUpdating(false)
        }
    }

    useEffect(() => {
        if (user) {
            const isFollowing = authUser.following.includes(userId)
            setIsFollowing(isFollowing)
        }
    },[authUser, userId])

    return{ isFollowing, isUpdating, handleFollowUser }
}

export default useFollowUser