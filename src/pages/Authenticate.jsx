import { Redirect } from "react-router";
import { routes } from "../App";
import { useEffect } from "react";




export default function Authenticate(props) {
    const params = new URLSearchParams(props.path); 
    const redirectTo = params.get('redirect');

    useEffect(() => {
        document.title = `${props.page === "login"? "Login" : "Sign Up"} | Bothub`
    // eslint-disable-next-line
        }, [])
    

    return (
        <> { props.login ?
             redirectTo !== null ? 

             <Redirect to={routes[redirectTo]} />
             : 
             <Redirect to="/" />
             :
            
             // If Not Logged in
             <div className="min-vh-100 d-flex justify-content-center align-items-center"> 
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <h3>{ props.page === "login"? "Login" : "Sign Up" }</h3>

                </div>
                
             </div>

        } </>
    );
}