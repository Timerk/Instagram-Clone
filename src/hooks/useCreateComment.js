import { useState } from "react"
import useShowToast from "./useShowToast"
import useAuthStore from "../store/authStore"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import usePostStore from "../store/postStore"
import { v4 as uuidv4 } from "uuid";

const useCreateComment = () => {
    const [isUploading, setIsUploading] = useState(false)
    const showToast = useShowToast()
    const authUser = useAuthStore((state) => state.user)
    const addComment = usePostStore(state => state.addComment)

    const handlePostComment = async(postId, comment) =>{
        if (isUploading) return
        if (!authUser) {
            return showToast("Error", "Please log in to post a Comment", "error")
        }
        setIsUploading(true)

        const newComment = {
            id:uuidv4(),
            comment,
            createdAt: Date.now(),
            createdBy: authUser.uid,
            postId,
        };

        try {
            const postRef = doc(firestore, "posts", postId)
            await updateDoc(postRef, {
                comments: arrayUnion(newComment)
            })

            addComment(postId, newComment)
        } catch (error) {
            showToast("Error", error.message, "error")
        }finally{
            setIsUploading(false)
        }
    }

    return{isUploading, handlePostComment}
}

export default useCreateComment