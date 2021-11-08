import { Redirect } from "react-router";
import { routes } from "../App";
import { useEffect } from "react";
import { Product } from "./components/Cards";
import Layout from "./components/Layout";
import { Form } from "react-bootstrap";

export default function Checkout(props) {
    return (
        <Layout loginState={props.login} page="checkout">
            <div className="min-vh-100 d-flex justify-content-center align-items-center flex-column">
                <div className="row w-75 justify-content-center ">
                    <div className="col-12 col-md-6">
                        <Product url="/product" imgThumbnail="IOT.jfif" productTitle="washing machine" productPrice=" 999999" />
                    </div>
                    <div className="col-12 col-md-6">
                        <h4>
                            Update your Details
                        </h4>
                        <Form>
                            <Form.Group className="mb-3" controlId="shippingAddress">
                                <Form.Label>Shippingaddress</Form.Label>
                                <Form.Control type="email" placeholder="Enter address" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="shippingAddress">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="Number" placeholder="Enter number" />
                                <Form.Text className="text-muted">
                                    We'll never share your number with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Form>
                        

                    </div>

                    
                </div>
            </div>

        </Layout>
    )

}
