import { useState } from "react"
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import usePostStore from "../store/postStore"

const useLikePost = ({post}) => {
    const [isLoading, setIsLoading] = useState(false)
    const authUser = useAuthStore((state) => state.user)
    const showToast = useShowToast()
    const [likes, setLikes] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid))
    const addOrRemoveLike = usePostStore(state => state.addOrRemoveLike)

    const handleLikePost = async () => {
        if (isLoading) return
        if (!authUser) return showToast("Error", "Please log in to like a post", "error")

        try {
            const postRef = doc(firestore, "posts", post.id)

            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            })

            isLiked ? setLikes(likes - 1) : setLikes(likes + 1)

            addOrRemoveLike(post.id, authUser.uid, isLiked)
            setIsLiked(!isLiked)
        } catch (error) {
            showToast("Error", error.message, "error")
        }finally{
            setIsLoading(false)
        }
    }

    return { handleLikePost, likes, isLiked}
}

export default useLikePost