import Layout from "./components/Layout";
import { Col, Collapse, Form, Row ,Button,Spinner} from "react-bootstrap";
import { useState } from "react";
import { routes } from "../App";



export default function Profile(props) {
  const [address, setAddress] = useState(false);
  const [password, setPassword] = useState(false);
  return (
    <Layout loginState={props.login} page="profile">
        <Spinner animation="border" className="text-light"/>
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="col-12 col-lg-8">
          <div className="row fs-2 m-3 fw-bold">Hello, Keerthi </div>
          <div
            className="row m-2"
            onClick={() => {
              window.location.href = routes.viewOrders;
            }}
          >
            <div className="card d-flex justify-content-center ">
              <div className="fs-6 m-3">View Orders</div>
            </div>
          </div>

          <div className="row m-2">
            <div
              className="card d-flex justify-content-center "
              onClick={() => setAddress(!address)}
              aria-controls="addressDiv"
              aria-expanded={address}
            >
              <div className="fs-6 m-3">Edit Shipping Address</div>
            </div>
            <Collapse in={address}>
              <div className="col-12 card px-4 px-md-5 py-4 my-2" id="addressDiv">
                <Form onSubmit={() => false}>
                  <Row >
                      <Col>
                    <Form.Label
                      className="text-light my-2"
                      label="Address"
                    >
                      Address
                    </Form.Label>
                    <Form.Control className="bg-primary border-primary text-light" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label
                        className="text-light mt-3 my-2"
                        label="City"
                        as={Col}
                      >
                        City
                      </Form.Label>
                      <Form.Control className="bg-primary border-primary text-light" />
                    </Col>
                    <Col>
                      <Form.Label
                        className="text-light mt-3 my-2"
                        label="State"
                        as={Col}
                      >
                        {" "}
                        State
                      </Form.Label>
                      <Form.Control className="bg-primary border-primary text-light" />
                    </Col>
                  </Row>

                  <Row >
                    <Col>
                      <Form.Label
                        className="text-light mt-3 my-2"
                        as={Col}
                      >
                        Country
                      </Form.Label>
                      <Form.Control className="bg-primary border-primary text-light" />
                    </Col>
                    <Col>
                      <Form.Label
                        className="text-light mt-3 my-2"
                        as={Col}
                      >
                        {" "}
                        Pincode
                      </Form.Label>
                      <Form.Control className="bg-primary border-primary text-light" />
                    </Col>
                  </Row>

                  <Row >
                      <Col>
                    <Form.Label
                      className="text-light mt-3 mb-2 my-2"
                      label="Address"
                    >
                      Landmark
                    </Form.Label>
                    <Form.Control className="bg-primary border-primary text-light" />
                    </Col>
                  </Row>
                  
                  <Row className="my-5 mx-2">
                      <Button variant="secondary">Update<Spinner animation="border" size="sm" className="text-light"/></Button>
                  </Row>
                </Form>
              </div>
            </Collapse>
          </div>

          <div className="row m-2">
            <div className="card d-flex justify-content-center ">
              <div className="fs-6 m-3">Change Password</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
