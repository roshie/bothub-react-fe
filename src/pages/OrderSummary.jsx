import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { Row, Col, Button } from "react-bootstrap";
import { Product } from "./components/Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function OrderSummary(props) {
  useEffect(() => {
    const productTag = localStorage.productTag;
    console.log(productTag);
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <section id="shippingAddress">
        <div className="min-vh-100 d-flex justify-content-center align-items-center flex-column my-5 px-3">
          <div className="row fs-2 fw-bold my-2 mt-4">Order Summary</div>
          <div className="row w-lg-75 justify-content-center my-5">
            <div className="col-12 col-md-6 p-2 h-100">
              <div className="card p-4 d-flex flex-column">
                <Row className="justify-content-center">
                  <Product
                    url={`/${"bosch-washing-machine"}`}
                    imgThumbnail="IOT.jfif"
                    productTitle="Bosch Washing Machine"
                    productPrice="999999"
                  />
                </Row>
                <Row className="p-5">
                  <Col className="mx-2">
                    <div className="d-flex justify-content-between my-3 py-1 fw-bold border-bottom border-primary">
                      <div>Quantity </div> <div>1</div>
                    </div>
                    <div className="d-flex justify-content-between mb-2 mt-3">
                      <div>Price (&#x20B9;)</div> <div>{"99999"}</div>
                    </div>
                    <div className="d-flex justify-content-between mt-2 mb-3">
                      <div>Delivery Charges (&#x20B9;)</div> <div>{"0"}</div>
                    </div>
                    <div className="d-flex justify-content-between my-3 py-1 fw-bold border-top border-primary">
                      <div>Total</div> <div>{"99999"}</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="col-12 col-md-6 p-2 h-100">
              <div className="card p-4 d-flex justify-content-between flex-column h-100">
                <div className="row">
                  <Row className="p-4">
                    <Col>
                      <div className="my-3 py-1 fw-bold border-bottom border-primary">
                        <div>Shipped To </div>
                      </div>
                      <div className="mb-2 mt-3">
                        <div>Team Cheems</div>
                      </div>
                      <div className="my-2">
                        <div>No 5, Dubai kurukku theru,</div>
                      </div>
                      <div className="mt-2 mb-3">
                        <div>Dubai, Chennai - 60000, India</div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="px-4">
                    <Col>
                      <div className="my-3 py-1 fw-bold border-bottom border-primary">
                        <div>Ordered on </div>
                      </div>
                      <div className="mb-2 mt-3">
                        <div>18th June 2021</div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="p-4">
                    <Col>
                      <div className="my-3 py-1 fw-bold border-bottom border-primary">
                        <div>Delivery Status </div>
                      </div>
                      <div className="mb-2 mt-3">
                        <div>On Transit</div>
                      </div>
                      <div className="mb-2 mt-3">
                        <Button
                          variant="secondary"
                          className="on-hover-light m-1"
                        >
                          View Delivery status here
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-around m-2 mb-4">
                    <Button variant="secondary" className="on-hover-light m-2">
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
        </div>
      </section>
    </Layout>
  );
}
