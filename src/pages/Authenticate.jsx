import { Redirect } from "react-router";
import { routes } from "../App";
import { useEffect, useState } from "react";
import { FloatingLabel, Form, Button, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { DecorElemBorder, DecorElemBox } from "./components/decorElements";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"
import { backendAppUrl } from '../config'


export default function Authenticate(props) {
    const params = new URLSearchParams(props.path);
    const redirectTo = params.get('redirect');

    var [email, setEmail] = useState('')
    var [password, setPassword] = useState('')
    var [errorMsg, setErrorMsg] = useState('')
    var [loading, setLoading] = useState(false)

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
        .then((response) => {
            if (response.ok) {
                const result = response.json();
                if (result.detail == "exists") {
                    setErrorMsg('An account with this EmailID already exists. Try Logging in.')
                    setLoading(false)
                } else if (result.detail == "success") {
                    // remove loader
                    setLoading(false)
                    movePage(false)
                }
              } else {
                console.error(response.json().detail);
                setErrorMsg('There was a problem while signing up. Please try again')
                setLoading(false)
              }
        },
        (err) => {
            console.log(err)
            setErrorMsg('There was a problem while signing up. Please try again')
            setLoading(false)
        })
    }

    const signInwithGoogle = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.uid = result.user.uid;
                if (props.page !== 'login') {
                    result.user.emailVerified = false
                    const data = {
                        signUpMethod: 'google',
                        email,
                        uid: result.user.uid
                    }
                    setLoading(true)
                    signUp(data)
                }
                else {
                    setLoading(false)
                    movePage(result.user.emailVerified)
                }
            }).catch((error) => {
                console.log(error.message)
                setLoading(false)
            });
    }

    const submitButton = () => {
        setErrorMsg('')
        setLoading(true)
        if (props.page != 'login') {
            const data = {
                signUpMethod: 'custom',
                email,
                password
            }
            signUp(data)
        } else {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setLoading(false)
                movePage(user.emailVerified)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage)
                setLoading(false)
                setErrorMsg(errorMessage)
            });
        }
    }

    const movePage = (emailVerified) => {
        if (!emailVerified) {
            window.location.href = '/' // Redirect to user details
            console.log("Email-not-verified")
        }
        else if (emailVerified)
            window.location.href = (redirectTo !== null) ?  routes[redirectTo] : '/'
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
                                    <Form.Text className="text-danger" muted> {errorMsg} </Form.Text>
                                </FloatingLabel>
                                <Col className="text-center mt-4">
                                    <Button variant="secondary" size="lg" type="submit" disabled={loading} onClick={submitButton}>
                                        {loading ? <Spinner animation="border" size="sm" className="text-light"/> : (props.page === "login") ? "Login" : "Sign Up" }
                                    </Button>
                                </Col>
                            </Form>
                            <hr className="bg-primary" style={{height: '3px'}}/>
                            <Col className="text-center mb-4">
                                <div className="fs-6">Or, { props.page === "login" ? "Login" : "Sign Up" } with</div>
                                <Button variant="secondary" onClick={signInwithGoogle} disabled={loading} className="my-3" type="submit"> <FontAwesomeIcon icon={faGoogle}/> Google </Button>
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




