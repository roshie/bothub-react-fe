import { Form, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { routes } from "../App";
import { getAuth, getIdToken, sendEmailVerification } from "@firebase/auth";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { backendAppUrl, getRequestParams } from "../config";

export default function UserDetails() {
  const [emailSent, setEmailSent] = useState("not-sent");
  const auth = getAuth();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [state, setState] = useState({
    fullName: "",
    mobileNmber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    landMark: "",
  });

  useEffect(() => {
    const email = auth.currentUser.email;
    setState({ ...state, email: email });

    if (auth.currentUser.emailVerified) setEmailSent("verified");

    if (auth.currentUser.providerId === "google.com") setEmailSent("verified");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (auth.currentUser.emailVerified && emailSent !== "verified")
      setEmailSent("verified");
    // eslint-disable-next-line
  }, [auth.currentUser.emailVerified]);

  const HandleSubmit = () => {
    setErrorMsg("");
    setLoading(true);

    if (emailSent !== "verified") {
      setErrorMsg("Looks Like you haven't verified your email!");
      setLoading(false);
    } else if (state.fullName === "" || state.mobileNmber === "") {
      setErrorMsg("Please fill the required details.");
      setLoading(false);
    } else {
      getIdToken(getAuth().currentUser).then((idToken) => {
        const data = {
          fullName: state.fullName,
          mobileNmber: state.mobileNmber,
          address: state.address === "" ? null : state.address,
          city: state.city === "" ? null : state.city,
          state: state.state === "" ? null : state.state,
          country: state.country === "" ? null : state.country,
          pinCode: state.pinCode === "" ? null : state.pinCode,
          landMark: state.landMark === "" ? null : state.landMark,
          uid: localStorage.uid,
          idToken,
        };

        fetch(`${backendAppUrl}/users`, {
          ...getRequestParams("PUT", data),
        }).then(
          (response) => {
            if (response.ok) {
              const result = response.json();
              if (result === "success") {
                window.location.href = routes.home;
                setLoading(false);
              } else if (result.detail === "db-error") {
                setErrorMsg(
                  "There was a problem while updating. Please try again"
                );
                setLoading(false);
              }
            } else {
              console.error(response.json().detail);
              setErrorMsg(
                "There was a problem while updating. Please try again"
              );
              setLoading(false);
            }
          },
          (err) => {
            console.error(err);
            setErrorMsg("There was a problem while updating. Please try again");
            setLoading(false);
          }
        );
      });
    }
  };

  const sendEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      setEmailSent("sent");
      setTimeout(() => {
        setEmailSent("not-sent");
      }, 5000);
    });
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card col-md-8 m-5 p-4">
        <Link
          to={routes.home}
          className="text-center text-light text-decoration-none fw-bold fs-6 mt-4 mb-1 smooth-transition"
        >
          BotHub.in
        </Link>
        <h2 className="text-center mx-3 fw-bold">
          Hello! We are glad to have you with us!
        </h2>
        <h6 className="text-center mx-3 mb-5">
          Please Enter your information below.
        </h6>
        <div className="card-body w-100">
          <Form onSubmit={() => false}>
            <Row>
              <div className="col-12 col-md-6 my-1">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  className="bg-primary border-primary text-light"
                  required
                  type="text-field"
                  placeholder="John Doe"
                />
              </div>
              <div className="col-12 col-md-6 my-1">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  className="bg-primary border-primary text-light"
                  required
                  type="tel"
                  placeholder="+91 7894561230"
                />
              </div>
            </Row>
            <Row className="justify-content-center">
              <div className="col-12 d-flex justify-content-center flex-column flex-md-row">
                <div className="col-12 col-md-7 m-1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="bg-primary border-primary text-light"
                    required
                    isValid={emailSent === "verified"}
                    isInvalid={emailSent !== "verified"}
                    type="email"
                    readOnly
                    placeholder="name@example.com"
                  />
                </div>
                <div className="col-12 col-md-auto m-1 d-flex align-items-end justify-content-md-start justify-content-center">
                  <Button
                    variant={
                      emailSent === "sent" || emailSent === "verified"
                        ? "success"
                        : "secondary"
                    }
                    onClick={sendEmail}
                    disabled={emailSent === "verified"}
                  >
                    {" "}
                    {emailSent === "sent"
                      ? "Email Sent!"
                      : emailSent === "verified"
                      ? "Email Verified!"
                      : "Send Email Verification"}
                  </Button>
                </div>
              </div>
            </Row>
            <hr className="bg-light my-4" />
            <h5 className="fw-bold mb-3">
              Enter your shipping address (Optional)
            </h5>

            <Row>
              <div className="col-12 my-1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  className="bg-primary border-primary text-light"
                  type="text-field"
                  placeholder="123 Main Street, New York, NY 10030"
                />
              </div>
            </Row>
            <Row>
              <div className="col-12 col-md-6 my-1">
                <Form.Label>City</Form.Label>
                <Form.Control
                  className="bg-primary border-primary text-light"
                  type="text-field"
                  placeholder="Chennai"
                />
              </div>
              <div className="col-12 col-md-6 my-1">
                <Form.Label>State</Form.Label>
                <Form.Control
                  className="bg-primary border-primary text-light"
                  type="text-field"
                  placeholder="TamilNadu"
                />
              </div>
            </Row>
            <Row>
              <div className="col-12 col-md-6 my-1">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  className="bg-primary border-primary text-light"
                  type="text-field"
                  placeholder="India"
                />
              </div>
              <div className="col-12 col-md-6 my-1">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  className="bg-primary border-primary text-light"
                  type="text"
                  pattern="[1-9][0-9]{6}"
                  placeholder="600 000"
                />
              </div>
            </Row>
            <Row>
              <div className="col-12 my-1">
                <Form.Label>Landmark</Form.Label>
                <Form.Control
                  className="bg-primary border-primary text-light"
                  type="text-field"
                  placeholder="Near Writer's Cafe"
                />
              </div>
            </Row>
            <Row className="text-end">
              <small className="text-danger">{errorMsg}</small>
            </Row>
            <Row className="text-end">
              <div className="col-12 my-1">
                <Button
                  onClick={HandleSubmit}
                  variant="secondary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner
                      animation="border"
                      size="sm"
                      className="text-light"
                    />
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}
