import { getAuth, signOut } from "firebase/auth";
import { routes } from "./App";


export default function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
        console.log("Signed out")
        window.location.href = routes.home
      }).catch((error) => {
        console.log(error.message)
    });
}