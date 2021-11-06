import { Redirect } from "react-router";
import { routes } from "../App";
import { useEffect } from "react";




export default function Authenticate(props) {
    const params = new URLSearchParams(props.path); 
    const redirectTo = params.get('redirect');

    useEffect(() => {
        document.title = `${props.page === "login"? "Login" : "Sign Up"} | Bothub`
    }, [])

    return (
        <> { props.login ?
             redirectTo !== null ? 

             <Redirect to={routes[redirectTo]} />
             : 
             <Redirect to="/" />
             :
            
             // If Not Logged in
             <div className="min-vh-100 p-auto"> 
                { props.page === "login"? "Login" : "Sign Up" }
             </div>

        } </>
    );
}