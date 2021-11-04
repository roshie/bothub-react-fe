import { getAuth, signOut } from "firebase/auth";


export default function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
        console.log("Signed out")
      }).catch((error) => {
        console.log(error.message)
    });
    window.location.reload();
}