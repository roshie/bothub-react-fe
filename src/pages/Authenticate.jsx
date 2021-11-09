import { Redirect } from "react-router";
import { routes } from "../App";
import { useEffect, useState } from "react";
import { FloatingLabel, Form, Button, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { DecorElemBorder, DecorElemBox } from "./components/decorElements";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { backendAppUrl, getRequestParams } from '../config'


export default function Authenticate(props) {
    const params = new URLSearchParams(props.location.search);
    const redirectTo = params.get('redirect');
    console.log(window.location.pathname, 'redirectTo: ', redirectTo)

    var [email, setEmail] = useState('')
    var [password, setPassword] = useState('')
    var [errorMsg, setErrorMsg] = useState('')
    var [loading, setLoading] = useState(false)
    var [validation, setValidation] = useState({email: false, password: false})

    useEffect(() => {
        document.title = `${props.page === "login"? "Login" : "Sign Up"} | Bothub`
    // eslint-disable-next-line
    }, [])

    async function signUp (data)  {
        await fetch(`${backendAppUrl}/users`, {
            ...getRequestParams('POST', data)
        })
        .then((response) => {
            if (response.ok) {
                const result = response.json();
                if (result.detail == "exists") {
                    setErrorMsg('An account with this Email ID already exists. Try Logging in.')
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
                    movePage(true)
                }
            }).catch((error) => {
                console.log(error.message)
                setLoading(false)
            });
    }

    const submitButton = () => {
        setErrorMsg('')
        setValidation({email: false, password: false})
        setLoading(true)
        if (props.page != 'login') {
            if (password.length < 8) {
                setLoading(false)
                setValidation({email: true})
                setErrorMsg('The password should be atleast 8 characters long.')
            } else {
                const data = {
                    signUpMethod: 'custom',
                    email,
                    password
                }
                signUp(data)
            }
            
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
                console.error(errorCode)

                if (errorCode === "auth/wrong-password") {
                    setValidation({password: true})
                    setErrorMsg("The Password is Incorrect.")
                } else if (errorCode === "auth/user-not-found") {
                    setValidation({email: true})
                    setErrorMsg("User not found.")
                } else {
                    setErrorMsg(error.code)
                }
                setLoading(false)
                
            });
        }
    }

    const movePage = (emailVerified) => {
        if (!emailVerified) {
            window.location.href = routes.verify
            console.log("Email-not-verified")
        }
        else if (emailVerified)
            window.location.href = (redirectTo !== null && routes[redirectTo] !== null) ?  routes[redirectTo] : routes.home
    }
    
    return (
        <> { props.login ?
             redirectTo !== null && routes[redirectTo] !== null ? 

             <Redirect to={routes[redirectTo]} />
             : 
             <Redirect to={routes.home} />
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
                                    <Form.Control className="bg-primary border-primary text-light" required isInvalid={validation.email} value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="name@example.com" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password"className="mb-3 text-light">
                                    <Form.Control className="bg-primary border-primary text-light" required isInvalid={validation.password} value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" />
                                    {(props.page === "login") ? <div className="text-end mt-1" style={{fontSize: '13px'}}><Link to={routes.forgotPassword} className="text-decoration-none text-light"> Forgot Password?</Link></div> : null} 
                                </FloatingLabel>
                                <Col className="text-center text-danger">
                                    {errorMsg}
                                </Col>

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
                                    <div>Don't Have an Account? <Link to={routes.signUp} className="text-decoration-none text-secondary">Sign Up</Link></div>
                                : 
                                    <div>Already Have an Account? <Link to={routes.login} className="text-decoration-none text-secondary">Login</Link></div> 
                                }
                            </Col>
                        </div>
                    </div>
                </div>

            </div>

        } </>
    );
}


export function ForgotPassword(props) {
    var [email, setEmail] = useState('')
    var [resultMsg, setResultMsg] = useState('')
    var [btnState, setBtnState] = useState('not-sent')

    const sendPasswordReset = () => {
        setResultMsg("")
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
          .then(() => {
            setBtnState('sent')
            setTimeout(() => {
                setBtnState('not-sent')
            }, 5000)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            setResultMsg("Oops, There was a problem. Please try again")
          });
    }

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center"> 
                <div className="col-10 col-sm-9 col-md-7 col-xl-5 row justify-content-center my-5">
                    <h1 className="text-center fw-bold">BotHub.in</h1>
                    <div className="text-center fs-6 mb-4">Send Reset Password Email</div>
                    <div className="card col-12 col-md-10 m-2">
                        <div className="card-body w-100">
                            <Form className="mt-5 mb-4 mx-3" onSubmit={() => {console.log("submitted")}}>
                                <div className="my-1 text-light">Enter your email ID</div>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email address"
                                    className="mb-3 text-light"
                                >
                                    <Form.Control className="bg-primary border-primary text-light" required value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="name@example.com" />
                                </FloatingLabel>
                                <Col className="text-center text-danger">
                                    {resultMsg}
                                </Col>

                                <Col className="text-center mt-4">
                                    <Button variant={btnState === "not-sent" ? "secondary" : "success"} onClick={sendPasswordReset}>
                                        {btnState === "not-sent" ? "Send Password Reset Email" : "Sent! Check your Inbox"}
                                    </Button>
                                </Col>
                                <hr className="bg-primary" style={{height: '3px'}}/>
                                <Col className="text-center mb-4">
                                    <div className="fs-6">
                                        <Link to={routes.login} className="text-decoration-none text-light mx-2"> Login </Link> | 
                                        <Link to={routes.signUp} className="text-decoration-none text-light mx-2"> Sign Up </Link>
                                    </div> 
                                </Col>
                            </Form>
                        </div>
                    </div>
                </div>

            </div>
    );
}