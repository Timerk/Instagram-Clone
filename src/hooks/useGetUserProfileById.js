import useShowToast from "./useShowToast";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileById = (userId) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);
    const showToast = useShowToast();

    useEffect(() => {
        if (!userId) return

        const getUserProfile = async () => {
            setIsLoading(true);
            setUserProfile(null);
            try {
                const userRef = await getDoc(doc(firestore, "users", userId));
                
                if (userRef.exists()) {
                    setUserProfile(userRef.data());
                }
                
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            getUserProfile();
        }
    }, [userId, showToast]);

    return { isLoading, userProfile };
};

export default useGetUserProfileById;


