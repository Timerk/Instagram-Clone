import { useState } from "react"
import useShowToast from "./useShowToast"
import { deleteObject, ref } from "firebase/storage"
import { firestore, storage } from "../firebase/firebase"
import useAuthStore from "../store/authStore"
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore"
import usePostStore from "../store/postStore"
import useUserProfileStore from "../store/userProfileStore"

const useDeletePost = () => {
    const showToast = useShowToast()
    const [isDeleting, setIsLoading] = useState(false)
    const authUser = useAuthStore((state) => state.user);
    const deletePost = usePostStore(state => state.deletePost)
    const userProfileDeltePost = useUserProfileStore((state) => state.deletePost)

    const handleDeletePost = async (post) =>{
        if(!window.confirm("Are you sure you want to delete this post")) return

        try {
            if (!post || !authUser) return
            setIsLoading(true)

            const imageRef = ref(storage, `posts/${post.id}`)
            await deleteObject(imageRef)

            const postRef = doc(firestore, "posts", post.id)
            await deleteDoc(postRef)

            const userRef = doc(firestore, "users", authUser.uid)
            await updateDoc(userRef, {
                posts: arrayRemove(post.id)
            })

            deletePost(post.id)
            userProfileDeltePost(post.id)
            
            showToast("Success", "Post deleted successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error")
        }finally{
            setIsLoading(false)
        }
    }
    return { isDeleting, handleDeletePost }
}

export default useDeletePost