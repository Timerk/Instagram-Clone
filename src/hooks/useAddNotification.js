import { useState } from "react"
import useShowToast from "./useShowToast"
import { v4 as uuidv4 } from "uuid"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"

const useAddNotification = () => {
    const [isLoading, setIsLoading] = useState(false)
    const showToast = useShowToast()

    const addNotification = async (post, isLike, authUser) => {
        if (isLoading || !authUser) return
        setIsLoading(true)

        const newNotification = {
            id:uuidv4(),
            postId: post.id,                     
            createdBy: authUser.uid,
            isLike,
            createdAt: Date.now()
        }

        try {
            const userRef = doc(firestore, "users", post.createdBy)
            await updateDoc(userRef, {
                notifications: arrayUnion(newNotification)
            })

        } catch (error) {
            showToast("Error", error.message, "error")
        }finally{
            setIsLoading(false)
        }
    }

    return addNotification
}

export default useAddNotification