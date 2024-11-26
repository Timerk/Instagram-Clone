import { useState } from "react"
import useUserProfileStore from "../store/userProfileStore"
import useShowToast from "./useShowToast"
import useAuthStore from "../store/authStore"
import usePostStore from "../store/postStore"
import { useLocation } from "react-router-dom"
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore"
import { firestore, storage } from "../firebase/firebase"
import { getDownloadURL, ref, uploadString } from "firebase/storage"

const useCreatePost = () => {
    const showToast = useShowToast()
    const [ isLoading, setIsLoading ] = useState(false) 
    const userProfile = useUserProfileStore((state) => state.userProfile)
    const addPost = useUserProfileStore(state => state.addPost)
    const authUser = useAuthStore((state) => state.user)
    const createPost = usePostStore(state => state.createPost)
    const {pathname} = useLocation()

    const handleCreatePost = async(selectedFile , caption) =>{
        if(!selectedFile) throw new Error("Please select an Image")
        setIsLoading(true)
        const newPost = {
            caption: caption,
            likes:[],
            createdAt:Date.now(),
            createdBy:authUser.uid,
        }

        try {
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
			const userDocRef = doc(firestore, "users", authUser.uid);
			const imageRef = ref(storage, `posts/${postDocRef.id}`);

			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);

			await updateDoc(postDocRef, { imageURL: downloadURL });

			newPost.imageURL = downloadURL;

			if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id });

			if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });

			showToast("Success", "Post created successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error")
        }finally{
            setIsLoading(false)
        }
    }

    return {handleCreatePost, isLoading}
}

export default useCreatePost