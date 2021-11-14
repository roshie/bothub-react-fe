import { Product } from "./components/Cards";
import Layout from "./components/Layout";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { backendAppUrl, getRequestParams } from "../config";
import { getAuth, getIdToken, sendEmailVerification } from "@firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { routes } from "../App";

export default function Checkout(props) {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [paymentDone, setPaymentDone] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [errorMsg, setErrMsg] = useState(null);
  const [product, setProduct] = useState({});
  const [emailVerified, setEmailVerified] = useState(false);
  const [hasMailSent, setSent] = useState(false);
  const [state, setState] = useState({
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    landmark: "",
  });

  const showRazorpayFrame = (data) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      var options = {
        key: "rzp_test_EzjBrDuqNGdChH",
        amount: data.productPrice.toString(),
        currency: "INR",
        name: "Bothub",
        description: "Complete your payment",
        image: "https://bothub.vercel.app/3d-printer.png",
        order_id: data.orderId,
        handler: verifyRequest,
        prefill: {
          name: data.fullName,
          email: data.email,
          contact: state.phoneNumber,
        },
        notes: {
          productName: data.productName,
        },
        theme: {
          color: "#192245",
        },
      };
      var rzpObj = new window.Razorpay(options);
      rzpObj.open();
    };
    script.onerror = () => {
      setErrMsg(
        "There was a problem while placing your order. Please try again later"
      );
      console.log("Razorpay Error");
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (auth.currentUser.emailVerified && !emailVerified)
      setEmailVerified(auth.currentUser.emailVerified);
    // eslint-disable-next-line
  }, [auth.currentUser.emailVerified]);

  useEffect(() => {
    const productId = new URLSearchParams(window.location.search).get("pid");
    fetch(`${backendAppUrl}/products?productId=${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (res) => {
          document.title = `Not Found | Bothub`;
          if (res.detail === "db-error" || res.data === null) {
            setProduct("fail");
            return null;
          } else {
            document.title = `Checkout | Bothub`;
            setProduct(res.data);
            return true;
          }
        },
        (err) => {
          console.log(err);
          setProduct("fail");
          return null;
        }
      )
      .then((data) => {
        if (data === null) setLoading(false);
        else
          fetch(
            `${backendAppUrl}/users?uid=${localStorage.uid}&idToken=${localStorage.idToken}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then(
              (result) => {
                if (result.detail === "db-error") {
                  setLoading(false);
                  console.error("error");
                } else {
                  setState({
                    email:
                      result.email === null
                        ? auth.currentUser.email
                        : result.email,
                    phoneNumber:
                      result.mobileNumber === null ? "" : result.mobileNumber,
                    address: result.address === null ? "" : result.address,
                    city: result.city === null ? "" : result.city,
                    state: result.state === null ? "" : result.state,
                    country: result.country === null ? "" : result.country,
                    pincode: result.pinCode === null ? "" : result.pinCode,
                    landmark: result.landMark === null ? "" : result.landMark,
                  });
                }
                setLoading(false);
              },
              (err) => {
                console.log(err);
                setLoading(false);
              }
            );
      });
    // eslint-disable-next-line
  }, []);

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      setSent(true);
      setTimeout(() => {
        setSent(false);
      }, 10000);
    });
  };

  const verifyRequest = (response) => {
    setPaymentDone(true);
    fetch(`${backendAppUrl}/payments/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    })
      .then((res) => res.json())
      .then(
        (res) => {
          console.log(res);
          if (res.status === "verified") {
            console.log("isPaid", res.isPaid);
            window.location.href = `${routes.orderSummary}?orderId=${response.razorpay_order_id}`;
          } else {
            console.log("invalid request");
            window.location.href = `${routes.orderSummary}?orderId=${response.razorpay_order_id}`;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const payNowButton = () => {
    console.log("submit");
    setBtnLoading(true);
    setErrMsg(null);
    setEmailVerified(auth.currentUser.emailVerified);
    if (auth.currentUser.emailVerified) {
      getIdToken(auth.currentUser)
        .then((idToken) => {
          const data = {
            ...state,
            phoneNumber: state.phoneNumber,
            productId: product.productId,
            uid: localStorage.uid,
            idToken,
          };
          return data;
        })
        .then((data) => {
          fetch(`${backendAppUrl}/payments/order`, {
            ...getRequestParams("POST", data),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              setBtnLoading(false);
              if (res.status === "created") {
                showRazorpayFrame(res.data);
              } else {
                setErrMsg(
                  "There was a problem while placing your order. Please try again later"
                );
              }
            })
            .catch((err) => {
              console.error(err);
              setBtnLoading(false);
              setErrMsg(
                "There was a problem while placing your order. Please try again later"
              );
            });
        });
    } else {
      setBtnLoading(false);
      setErrMsg("Please verify your Email!");
    }
  };

  return (
    <Layout loginState={props.login} page="checkout">
      <section
        id="shippingAddress"
        className="min-vh-100 d-flex justify-content-center align-items-center flex-column"
      >
        {loading ? (
          <Spinner animation="border" size="lg" className="text-light" />
        ) : product === "fail" ? (
          <> {/* Return error500 component */}</>
        ) : !paymentDone ? (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="row w-lg-75 justify-content-center my-5"
          >
            <div className="col-12 col-md-6 p-2 h-auto">
              <div className="card p-4 d-flex flex-column h-100">
                <div className="row fs-4 fw-bolder my-2 mb-4 mx-auto">
                  Update Your Shipping Address
                </div>
                <div className="row my-2 px-1">
                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text-field"
                        required
                        className="bg-primary border-primary text-light"
                        placeholder="No. 4, Park Street"
                        value={state.address}
                        onChange={(e) => {
                          setState({ ...state, address: e.target.value });
                        }}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text-field"
                          required
                          className="bg-primary border-primary text-light"
                          placeholder="Coimbatore"
                          value={state.city}
                          onChange={(e) => {
                            setState({ ...state, city: e.target.value });
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text-field"
                          required
                          className="bg-primary border-primary text-light"
                          placeholder="Tamil Nadu"
                          value={state.state}
                          onChange={(e) => {
                            setState({ ...state, state: e.target.value });
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text-field"
                          required
                          className="bg-primary border-primary text-light"
                          placeholder="India"
                          value={state.country}
                          onChange={(e) => {
                            setState({ ...state, country: e.target.value });
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                          type="text-field"
                          required
                          className="bg-primary border-primary text-light"
                          placeholder="650000"
                          value={state.pincode}
                          onChange={(e) => {
                            setState({ ...state, pincode: e.target.value });
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Landmark</Form.Label>
                      <Form.Control
                        type="text-field"
                        required
                        className="bg-primary border-primary text-light"
                        placeholder="Near Park Cafe"
                        value={state.landmark}
                        onChange={(e) => {
                          setState({ ...state, landmark: e.target.value });
                        }}
                      />
                    </Form.Group>
                  </Row>
                </div>
                <div className="row fs-4 fw-bolder my-2 mb-4 mx-auto">
                  Update Your Contact Info
                </div>
                <div className="row my-2 px-1">
                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          type="email"
                          required
                          readOnly
                          isValid={emailVerified}
                          isInvalid={!emailVerified}
                          className="bg-primary border-primary text-light"
                          placeholder="mail@example.com"
                          value={state.email}
                          onChange={(e) => {
                            setState({ ...state, email: e.target.value });
                          }}
                        />
                        <Button
                          size="sm"
                          variant={emailVerified ? "success" : "secondary"}
                          className="py-0 ms-2"
                          disabled={emailVerified}
                          onClick={verifyEmail}
                        >
                          {emailVerified ? "Verified" : "Verify"}
                        </Button>
                      </div>
                      {hasMailSent && (
                        <div className="text-success small text-end">
                          {"Mail Sent! Check your inbox."}
                        </div>
                      )}
                      {!emailVerified && (
                        <Form.Text>
                          The Email hasn't verified yet. Please click on verify
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        required
                        className="bg-primary border-primary text-light"
                        placeholder="9876543210"
                        value={state.phoneNumber}
                        onChange={(e) => {
                          setState({ ...state, phoneNumber: e.target.value });
                        }}
                      />
                    </Form.Group>
                  </Row>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 p-2">
              <div className="card p-4 d-flex flex-column">
                <div className="row fs-4 fw-bolder my-2 mb-4 mx-auto">
                  Order Summary
                </div>
                <div className="row my-2 px-1">
                  <Row className="justify-content-center">
                    <Product
                      seoTagline={product.seoTagline}
                      imgThumbnail={product.imageThumbnail}
                      productTitle={product.productName}
                      productPrice={product.productPrice}
                      newTab={true}
                    />
                  </Row>
                  <Row className="p-5">
                    <Col className="mx-2">
                      <div className="d-flex justify-content-between my-3 py-1 fw-bold border-bottom border-primary">
                        <div>Quantity </div> <div>1</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2 mt-3">
                        <div>
                          Price (<FontAwesomeIcon icon={faRupeeSign} />)
                        </div>{" "}
                        <div>{product.productPrice}</div>
                      </div>
                      <div className="d-flex justify-content-between mt-2 mb-3">
                        <div>
                          Delivery Charges (
                          <FontAwesomeIcon icon={faRupeeSign} />)
                        </div>{" "}
                        <div>{"0"}</div>
                      </div>
                      <div className="d-flex justify-content-between my-3 py-1 fw-bold border-top border-primary">
                        <div>Total</div> <div>{product.productPrice}</div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <Button
                          className="w-50"
                          variant="secondary"
                          onClick={payNowButton}
                          disabled={btnLoading}
                          type="submit"
                        >
                          {btnLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              className="text-light"
                            />
                          ) : (
                            "Pay Now"
                          )}
                        </Button>
                      </div>
                      {errorMsg !== null && (
                        <div className="d-flex justify-content-center mt-4 text-danger text-center">
                          {errorMsg}
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Form>
        ) : (
          <div className="row justify-content-center">
            <div className="fs-1 fw-bold my-2 text-center">
              Your order is being processed. Please stay here.
            </div>
            <div className="fs-5 text-center">
              Do not click on back or refresh.
            </div>
            <div className="my-4 text-center">
              <Spinner
                animation="border"
                size="lg"
                className="text-light"
              ></Spinner>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
