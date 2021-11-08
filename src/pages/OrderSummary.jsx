import React from "react";
import Layout from "./components/Layout";

export default function OrderSummary(props) {
  return (
    <Layout>
      <div className="row my-2 m-2">
        <div className="col-12 col-md-6 my-4">
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
          <div className="column m-2">
            <button
              class="btn btn-secondary"
              style={{ width: "200px", height: "50px",marginTop:"20px" }}
              href="#"
            >
              Download invoice
            </button>
            &nbsp; &nbsp; &nbsp;
            <button
              class="btn btn-success"
              style={{ width: "200px", height: "50px",marginTop:"20px" }}
              href="#"
            >
               Whatsapp us
            </button>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card w-100 h-100 my-4">
            <div className="card-body">
              <h2 className="card-title my-2 fw-bold" style={{ color: "#fff" }}>
                Product title
              </h2>
              <h3 className="h3 mt-4" style={{ color: "#fff" }}>
                Price
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
