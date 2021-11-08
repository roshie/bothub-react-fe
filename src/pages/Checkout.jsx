import { Redirect } from "react-router";
import { routes } from "../App";
import { useEffect } from "react";
import { Product } from "./components/Cards";
import Layout from "./components/Layout";
import { Form } from "react-bootstrap";

export default function Checkout(props) {
    return (
        <Layout loginState={props.login} page="checkout">
            <section id="shippingAddress">
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
            </section>

            <section id="orderSummarry"><div className="row m-auto w-75">
            <div className="row mt-4 mx-auto p-0 justify-content-center">
              <div className="col-md-12 my-3">
                        <div className="card">
                <div className="card-body" >
                <div className="mx-5">
                    <div className="row">
                    <div className="col-lg-6 text-center d-flex justify-content-center flex-column">
                       <img src = "IOT.jfif"/>
                    </div>
                    <div className="col-lg-6 text-center mt-4">
                        <h2>Order Summary</h2>
                    <p>
                        <strong>Order ID:</strong> {props.orderId}
                    </p>
                    <p>
                        <strong>Order Date:</strong> {props.orderDate}
                    </p>
                    <p>
                        <strong>Order Total:</strong> {props.orderTotal}
                    </p>
                    <p>
                        <strong>Payment Status:</strong> {props.orderStatus}
                    </p>
                    <a 
                        class="btn btn-secondary btn-lg text-center mt-2"
                        href="#"
                        >
                        Place Order
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
              </div>
            </div></div>
            </section>
        </Layout>
    )

}
