import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useAuthStore from "../store/authStore";

const useLogin = () => {
    const showToast = useShowToast()

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const loginUser = useAuthStore(state => state.login)

    const login = async(inputs) => {
        if (!inputs.email || !inputs.password) {
            showToast("Error", "Please fill all Fields", "error")
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(inputs.email, inputs.password)
            if (userCredential) {
                const docRef = doc(firestore, "users", userCredential.user.uid)
                const docSnapShot = await getDoc(docRef)
                localStorage.setItem("user-info", JSON.stringify(docSnapShot.data()))
                loginUser(docSnapShot.data())
            }
        
        } catch (error) {
            showToast("Error", error.message, "error")
        }

        if (error) {
            showToast("Error", error.message, "error") 
        }
    }
    return { loading, error, login };
}

export default useLogin;
