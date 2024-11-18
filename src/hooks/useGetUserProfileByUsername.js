import { useState, useEffect } from "react";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { collection, getDoc, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileByUsername = (username) => {
    const[isLoading, setIsLoading] = useState(false)
    const showToast = useShowToast();

    useEffect(() => {
        const getUserProfile = async () =>{
            setIsLoading(true)
            try {
                const q = query(collection(firestore,"users",where("username", "==", username)))
                const querySnapShot = await getDoc(q)
            } catch (error) {
                showToast("Error", error.message, "error")
            }
        }
    },[])
}