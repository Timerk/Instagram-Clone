import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"; 
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
		user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const showToast = useShowToast()
	
	const loginUser = useAuthStore(state => state.login)

    const signUp = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullname) {
            showToast("Error", "Please fill all Fields", "error")
            return;
        }

		const userRef = collection(firestore, "users")
		const q = query(userRef, where("username", "==", inputs.username))
		const querySnapShot = await getDocs(q);

		if (!querySnapShot.empty) {
			showToast("Error", "Username already exist", "error")
            return;
		}

        try {
			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}
			
			if (newUser) {
				const userDoc = {
					uid: newUser.user.uid,
					email: inputs.email,
					username: inputs.username,
					fullName: inputs.fullname,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					notifications: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
    };

    return { loading, error, signUp };
};

export default useSignUpWithEmailAndPassword;

