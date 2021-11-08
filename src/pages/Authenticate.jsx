import { Redirect } from "react-router";
import { routes } from "../App";
import { useEffect, useState } from "react";
import { FloatingLabel, Form, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { DecorElemBorder, DecorElemBox } from "./components/decorElements";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { backendAppUrl } from '../config'


export default function Authenticate(props) {
    const params = new URLSearchParams(props.path);
    const redirectTo = params.get('redirect');

    var [email, setEmail] = useState('')
    var [password, setPassword] = useState('')
    var [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        document.title = `${props.page === "login"? "Login" : "Sign Up"} | Bothub`
    // eslint-disable-next-line
    }, [])

    async function signUp (data)  {
        await fetch(`${backendAppUrl}/users`, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(res => {
            res = res.json()
            if (res.detail == "exists") {
                setErrorMsg('An account with this EmailID already exists. Try Logging in.')
            } else if (res.detail == "success") {
                // remove loader
                window.location.href = '/' // Redirect to user details
                console.log("Email-not-verified")
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const signInwithGoogle = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.uid = result.user.uid;
                if (props.page !== 'login') {
                    const data = {
                        signUpMethod: 'google',
                        email,
                        uid: result.user.uid
                    }
                    signUp(data)
                }
                else if (!result.user.emailVerified) {
                    window.location.href = '/' // Redirect to user details
                    console.log("Email-not-verified")
                }
                else if (result.user.emailVerified)
                    window.location.href = (redirectTo !== null) ?  routes[redirectTo] : '/'
            }).catch((error) => {
                console.log(error.message)
        });
    }

    const submitButton = () => {
        setErrorMsg('')
        if (props.page != 'login') {
            const data = {
                signUpMethod: 'custom',
                email,
                password
            }
            signUp(data)
        } else {
            // password login code
        }
    }
    
    return (
        <> { props.login ?
             redirectTo !== null ? 

             <Redirect to={routes[redirectTo]} />
             : 
             <Redirect to="/" />
             :
            
             // If Not Logged in
             <div className="min-vh-100 d-flex justify-content-center align-items-center"> 
                <div className="col-10 col-sm-9 col-md-7 col-xl-5 row justify-content-center my-5">
                    <h1 className="text-center fw-bold">BotHub.in</h1>
                    <div className="text-center fs-5 mb-4">{ props.page === "login"? "Login to your Account" : "Sign Up" }</div>
                    <div className="card col-12 col-md-10 m-2">
                        <div className="card-body w-100">
                            <Form className="mt-5 mb-4 mx-3" onSubmit={() => {console.log("submitted")}}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email address"
                                    className="mb-3 text-light"
                                >
                                    <Form.Control className="bg-primary border-primary text-light" required value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="name@example.com" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password"className="mb-3 text-light">
                                    <Form.Control className="bg-primary border-primary text-light" required value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" />
                                    <Form.Text id="passwordHelpBlock" className="text-danger" muted> {errorMsg} </Form.Text>
                                </FloatingLabel>
                                <Col className="text-center mt-4">
                                    <Button variant="secondary" size="lg" type="submit" onClick={submitButton}>
                                        { props.page === "login"? "Login" : "Sign Up" }
                                    </Button>
                                </Col>
                            </Form>
                            <hr className="bg-primary" style={{height: '3px'}}/>
                            <Col className="text-center mb-4">
                                <div className="fs-6">Or, { props.page === "login" ? "Login" : "Sign Up" } with</div>
                                <Button variant="secondary" onClick={signInwithGoogle} className="my-3" type="submit"> <FontAwesomeIcon icon={faGoogle}/> Google </Button>
                                { props.page === "login" ? 
                                    <div>Don't Have an Account? <Link to="/sign-up" className="text-decoration-none text-secondary">Sign Up</Link></div>
                                : 
                                    <div>Already Have an Account? <Link to="/login" className="text-decoration-none text-secondary">Login</Link></div> 
                                }
                            </Col>
                        </div>
                    </div>
                </div>

            </div>

        } </>
    );
}




