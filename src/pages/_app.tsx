import "@/styles/globals.css";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../components/Loading";
import { auth, db } from "../../config/firebase";
import Login from "./login";

export default function App({ Component, pageProps }: AppProps) {
  let [loggedInUser, loading, _error] = useAuthState(auth);

  // đăng nhập và lưu người dùng vào trong firebase
  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(db, "users", loggedInUser?.email as string),
          {
            email: loggedInUser?.email,
            lastSeen: serverTimestamp(),
            photoUrl: loggedInUser?.photoURL,
          },
          {
            merge: true,
          }
        );
      } catch (e) {
        console.log("error", e);
      }
    };
    if (loggedInUser) {
      setUserInDb();
    }
  }, [loggedInUser]);

  if (loading) return <Loading />;
  if (!loggedInUser) return <Login />;
  return <Component {...pageProps} />;
}
