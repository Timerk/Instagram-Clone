import { useState } from "react"
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast"
import { doc, updateDoc } from "firebase/firestore"
import { storage, firestore } from "../firebase/firebase"
import { getDownloadURL, uploadString, ref } from "firebase/storage"
import useUserProfileStore from "../store/userProfileStore"

const useEditProfile = () => {
    const[ isUpdating, setIsUpdating] = useState(false)
    const authUser =  useAuthStore(state => state.user)
    const setAuthUser = useAuthStore(state => state.setUser)
    const setUpdatedUser = useUserProfileStore((state) => state.setUserProfile)
    const showToast = useShowToast()

    const updateProfile = async (inputs, slectedFile) => {
        if (isUpdating || !authUser) {
            return
        }

        setIsUpdating(true)

        const storageRef = ref(storage, `profilePics/${authUser.uid}`)
        const userDocRef = doc(firestore, "users", authUser.uid);

        let url = ""
        try {
            if (slectedFile) {
                await uploadString(storageRef, slectedFile, "data_url")
                url = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
            }

            const updatedUserData = {
                ...authUser,
                fullName : inputs.fullName || authUser.fullName,
                username : inputs.username || authUser.username,
                bio : inputs.bio || authUser.bio,
                profilePicURL : url || authUser.profilePicURL,
            }

            await updateDoc(userDocRef, updatedUserData)
            localStorage.setItem("users-info", JSON.stringify(updatedUserData))
            setAuthUser(updatedUserData)
            setUpdatedUser(updatedUserData)
            showToast("Success", "Profile successfully updated", "success")
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    return{ isUpdating, updateProfile  }
}

export default useEditProfile