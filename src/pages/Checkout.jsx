import { Product } from "./components/Cards";
import Layout from "./components/Layout";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function Checkout(props) {
  return (
    <Layout loginState={props.login} page="checkout">
      <section id="shippingAddress">
        <div className="min-vh-100 d-flex justify-content-center align-items-center flex-column">
          <Form
            onSubmit={() => false}
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
                        type="email"
                        required
                        className="bg-primary border-primary text-light"
                        placeholder="No. 4, Park Street"
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="email"
                          required
                          className="bg-primary border-primary text-light"
                          placeholder="Coimbatore"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="email"
                          required
                          className="bg-primary border-primary text-light"
                          placeholder="Tamil Nadu"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="email"
                          required
                          className="bg-primary border-primary text-light"
                          placeholder="India"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                          type="email"
                          required
                          className="bg-primary border-primary text-light"
                          placeholder="650000"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Landmark</Form.Label>
                      <Form.Control
                        type="email"
                        required
                        className="bg-primary border-primary text-light"
                        placeholder="Near Park Cafe"
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
                          className="bg-primary border-primary text-light"
                          placeholder="mail@example.com"
                        />
                        <Button
                          size="sm"
                          variant="secondary"
                          className="py-0 ms-2"
                        >
                          Verify
                        </Button>
                      </div>
                      <div className="text-success small text-end">
                        {"Mail Sent! Check your inbox."}
                      </div>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="email"
                        required
                        className="bg-primary border-primary text-light"
                        placeholder="9876543210"
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
                      <div className="d-flex justify-content-center">
                        <Button className="w-50" variant="secondary">
                          Pay Now
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </section>
    </Layout>
  );
}
