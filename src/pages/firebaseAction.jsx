import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { routes, firebaseConfig } from "../App";
import { Spinner, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { initializeApp } from "firebase/app";
import { applyActionCode, getAuth, verifyPasswordResetCode, confirmPasswordReset } from "@firebase/auth";



export default function FirebaseAction(props) {
  const url = new URL(window.location.href)
  const params = url.searchParams;
  const mode = params.get('mode');
  const oobCode = params.get('oobCode')
  const apiKey = params.get('apiKey')
  console.log("mode", mode, oobCode, apiKey)

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  if (mode === "verifyEmail") {
    return <EmailVerified oobCode={oobCode} apiKey={apiKey} auth={auth}/>;

  } else if (mode === "resetPassword") {
    return <ResetPassword oobCode={oobCode} apiKey={apiKey} auth={auth}/>

  } 
  else {
    return <Redirect to={routes.error404} />;
  }
}


function EmailVerified(props) {

  const [emailVerified, setEV] = useState('loading')

  useEffect(() => {
    applyActionCode(props.auth, props.oobCode).then((resp) => {
      setEV('verified')
    }).catch((error) => {
      setEV('not-verified')
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">

      {emailVerified === 'loading' ? 
        <Spinner animation="border" size="lg" className="text-light"/>

        : (emailVerified === 'verified') ? 

            <div className="card bg-info h-100 mx-3">
              <div className="card-body p-5">
                <h2 className="fw-bold ">Your Email has been verified!</h2>
                <h4>Now you can close this tab or go to our<Link to={routes.home} className="text-decoration-none text-secondary"> Site.</Link></h4>

                <Link to={routes.home}><h6 className="text-secondary fw-bold text-light mt-5">BotHub.in</h6></Link>
              </div>
            </div>
        :
            <div className="card bg-info h-100 mx-3">
              <div className="card-body p-5">
                <h2 className="fw-bold ">The Link was expired</h2>
                <h4>Please verify your email again.</h4>

                <Link to={routes.home}><h6 className="text-secondary fw-bold text-light mt-5">BotHub.in</h6></Link>
              </div>
            </div>
        }
    </div>
  );
}


function ResetPassword(props) {

  const [resultMsg, setResultMsg] = useState({state: true, msg: ''})
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [validRequest, setValid] = useState('loading')
  const [email, setEmail] = useState('');

  useEffect(() => {
    verifyPasswordResetCode(props.auth, props.oobCode).then((mail) => {
      setEmail(mail);
      setValid('true')
  
    }).catch((error) => {
      setValid('false')
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetPasswordFn = () => {
    setLoading(true)
    setResultMsg({state: true, msg: ""})

    if (password === confirmPassword) {
      // Save the new password.
      confirmPasswordReset(props.auth, props.oobCode, password).then((resp) => {
        setResultMsg({state: true, msg: "Your password has been reset."})
        setLoading(false)
        window.location.href = routes.home;

      }).catch((error) => {
        setLoading(false)
        setResultMsg({state: false, msg: "The Password may be weak. Please try again"})
      });
    } else {
      setLoading(true)
      setResultMsg({state: false, msg: "The passwords does not match"})
    }
  }

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="col-10 col-sm-9 col-md-7 col-xl-5 row justify-content-center my-5">
          {validRequest === "loading" ? 
            <Spinner animation="border" size="lg" className="text-light"/>
          : (validRequest === "true") ? 
          <>
              <h1 className="text-center fw-bold">BotHub.in</h1>
              <div className="text-center fs-5 mb-4">Reset Password for {email}</div>
              <div className="card col-12 col-md-10 m-2">
                  <div className="card-body w-100">
                      <Form className="mt-5 mb-4 mx-3" onSubmit={() => {console.log("submitted")}}>
                            <FloatingLabel controlId="floatingPassword" label="Password"className="mb-3 text-light">
                                <Form.Control className="bg-primary border-primary text-light" required value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password"className="mb-3 text-light">
                                  <Form.Control className="bg-primary border-primary text-light" required value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} type="password" placeholder="Password" />
                              </FloatingLabel>
                          <Col className={`text-center text-danger ${resultMsg.state ? 'text-success' : 'text-danger'}`}>
                              {resultMsg.msg}
                          </Col>

                          <Col className="text-center mt-4">
                              <Button variant="secondary" disabled={loading} onClick={resetPasswordFn}>
                                  {loading ?  <Spinner animation="border" size="sm" className="text-light"/> : "Reset Password"}
                              </Button>
                          </Col>
                      </Form>
                  </div>
              </div>
            </>
            : 
            <div className="card bg-info h-100 mx-3">
              <div className="card-body p-5">
                <h2 className="fw-bold ">The Link was expired</h2>
                <h4>Please Try again.</h4>

                <Link to={routes.home}><h6 className="text-secondary fw-bold text-light mt-5">BotHub.in</h6></Link>
              </div>
            </div>
            }
        </div>
    </div>
  );
}
