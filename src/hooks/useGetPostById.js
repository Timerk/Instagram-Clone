import useShowToast from "./useShowToast";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetPostById = (postId) => {
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState(null);
    const showToast = useShowToast();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            setPost(null);
            try {
                const postRef = await getDoc(doc(firestore, "posts", postId));

                if (postRef.exists()) {
                    setPost(postRef.data());
                }
                
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        if (postId) {
            getUserProfile();
        }
    }, [postId, showToast]);

    return { isLoading, post };
};

export default useGetPostById;
