import { useEffect, useState, useMemo } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";

const useNotifications = (authUser) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();

  useEffect(() => {
    if (!authUser) {
      setNotifications([]);
      return;
    }

    setIsLoading(true);

    const userRef = doc(firestore, "users", authUser.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();

          const sortedNotifications = (data.notifications || []).sort(
            (a, b) => b.createdAt - a.createdAt
          );
          setNotifications(sortedNotifications);
        } else {
          setNotifications([]);
        }
        setIsLoading(false);
      },
      (error) => {
        showToast("Error", error.message, "error");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [authUser, showToast]);

  return { notifications, isLoading };
};

export default useNotifications;
