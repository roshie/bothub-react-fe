import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { Row, Col, Spinner, Button } from "react-bootstrap";
import { Product } from "./components/Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { getRequestParams, backendAppUrl } from "../config";
import { Redirect } from "react-router";
import { routes } from "../App";
import { getAuth, getIdToken } from "@firebase/auth";

export default function OrderSummary(props) {
  const orderId = new URLSearchParams(window.location.search).get("orderId");
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [state, setState] = useState({
    available: false,
    productName: "",
    seoTagline: "",
    imgThumbnail: "",
    productPrice: "",
    orderId: "",
    totalPrice: "",
    timeOrdered: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    fullName: "",
    paymentStatus: "",
    shippingBtnLink: false,
    shippingStatus: "",
  });

  useEffect(() => {
    getIdToken(getAuth().currentUser).then((idToken) => {
      setIdToken(idToken);
    });
  });

  useEffect(() => {
    document.title = `Order Summary | Bothub`;

    fetch(`${backendAppUrl}/orders`, {
      ...getRequestParams("POST", {
        uid: localStorage.uid,
        idToken: localStorage.idToken,
        orderId: orderId,
      }),
    })
      .then((res) => res.json())
      .then(
        (res) => {
          console.log(res);
          if (res.detail === "db-error" || res.detail === "forbidden") {
            setError(true);
            setLoading(false);
          } else if (res.data === "no-data") {
            setState({
              ...state,
              available: false,
            });
          } else {
            const val = res.data;
            setState({
              available: true,
              productName: val.productName,
              seoTagline: val.seoTagline,
              imgThumbnail: val.imageThumbnail,
              productPrice: val.productPrice,
              orderId: val.orderId,
              totalPrice: val.totalPrice,
              timeOrdered: val.timeOrdered,
              addressLine1: val.shippingAddress,
              addressLine2: `${val.shippingCity} - ${val.shippingPincode}, ${val.shippingState}, ${val.shippingCountry}`,
              addressLine3: `Landmark: ${val.shippingLandmark}`,
              fullName: val.fullName,
              paymentStatus: val.paymentStatus,
              shippingBtnLink:
                val.shipping.status === "NA" ? val.shipping.link : false,
              shippingStatus:
                val.shipping.status === "not-dispatched"
                  ? "Not Dispatched"
                  : val.shipping.status === "invalid"
                  ? "Not Dispatched"
                  : val.shipping.status === "NA"
                  ? "Dispatched"
                  : val.shipping.status,
            });
            setLoading(false);
          }
        },
        (err) => {
          console.log(err);
          setError(true);
          setLoading(false);
        }
      );

    //eslint-disable-next-line
  }, []);

  return (
    <>
      {!error ? (
        <Layout loginState={props.login} page="orderSummary">
          <section
            id="shippingAddress"
            className="min-vh-100 d-flex justify-content-center align-items-center flex-column my-5 px-3"
          >
            {loading ? (
              <Spinner animation="border" size="lg" className="text-light" />
            ) : state.available ? (
              <>
                <div className="row fs-2 fw-bold my-2 mt-4">Order Summary</div>
                <div className="row w-lg-75 justify-content-center my-5">
                  <div className="col-12 col-md-6 p-2 h-auto">
                    <div className="card p-4 d-flex flex-column h-100 justify-content-center">
                      <Row className="justify-content-center">
                        <Product
                          url={`/${state.seoTagline}`}
                          imgThumbnail={state.imgThumbnail}
                          productTitle={state.productName}
                          productPrice={state.productPrice}
                        />
                      </Row>
                      <Row className="p-5">
                        <Col className="mx-2">
                          <div className="d-flex justify-content-between my-3 py-1 fw-bold border-bottom border-primary">
                            <div>Quantity </div> <div>1</div>
                          </div>
                          <div className="d-flex justify-content-between mb-2 mt-3">
                            <div>Price (&#x20B9;)</div>{" "}
                            <div>{state.totalPrice}</div>
                          </div>
                          <div className="d-flex justify-content-between mt-2 mb-3">
                            <div>Delivery Charges (&#x20B9;)</div>{" "}
                            <div>{"0"}</div>
                          </div>
                          <div className="d-flex justify-content-between my-3 py-1 fw-bold border-top border-primary">
                            <div>Total</div> <div>{state.totalPrice}</div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 p-2 h-auto">
                    <div className="card p-4 d-flex justify-content-between flex-column h-100">
                      <div className="row">
                        <Row className="px-4 py-2 pt-3">
                          <Col>
                            <div className="my-3 py-1 fw-bold border-bottom border-primary">
                              <div>Shipped To </div>
                            </div>
                            <div className="mb-2 mt-3">
                              <div>{state.fullName}</div>
                            </div>
                            <div className="my-2">
                              <div>{state.addressLine1}</div>
                            </div>
                            <div className="my-2">
                              <div>{state.addressLine2}</div>
                            </div>
                            <div className="mt-2 mb-3">
                              <div>{state.addressLine3}</div>
                            </div>
                          </Col>
                        </Row>
                        <Row className="px-4 py-2">
                          <Col>
                            <div className="my-3 py-1 fw-bold border-bottom border-primary">
                              <div>Ordered on </div>
                            </div>
                            <div className="mb-2 mt-3">
                              <div>{state.timeOrdered}</div>
                            </div>
                          </Col>
                        </Row>
                        <Row className="px-4 py-2">
                          <Col>
                            <div className="my-3 py-1 fw-bold border-bottom border-primary">
                              <div>Payment Status </div>
                            </div>
                            <div className="mb-2 mt-3">
                              <div>{state.paymentStatus}</div>
                            </div>
                          </Col>
                        </Row>
                        <Row className="px-4 py-2 pb-3">
                          <Col>
                            <div className="my-3 py-1 fw-bold border-bottom border-primary">
                              <div>Delivery Status </div>
                            </div>
                            {state.shippingBtnLink !== false ? (
                              <div className="mb-2 mt-3">
                                <a
                                  className="btn btn-secondary on-hover-light m-1"
                                  href={state.shippingBtnLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Delivery status here
                                </a>
                              </div>
                            ) : (
                              <div className="mb-2 mt-3">
                                <div>{state.shippingStatus}</div>
                              </div>
                            )}
                          </Col>
                        </Row>
                        <div className="d-flex justify-content-around m-2 mb-4">
                          <Button
                            className="btn btn-secondary on-hover-light m-2"
                            onClick={() => {
                              window.location.replace(
                                `${backendAppUrl}/orders/invoice?uid=${localStorage.uid}&idToken=${idToken}&orderId=${orderId}`
                              );
                            }}
                          >
                            Download Invoice
                          </Button>
                          <button className="btn btn-whatsapp on-hover-light m-2">
                            <FontAwesomeIcon icon={faWhatsapp} /> Contact Us
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Order not available
              <Redirect to={routes.error404} />
            )}
          </section>
        </Layout>
      ) : (
        <> {/* Return error500 component */}</>
      )}
    </>
  );
}
