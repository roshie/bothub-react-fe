import React from "react";
import Layout from "./components/Layout";

export default function OrderSummary(props) {
  return(
    <Layout>
              <div className="col-12 col-md-6">
          <div className="card w-100 h-75 my-4">
            <div className="card-body">
              <h2 className="card-title my-2 fw-bold" style={{ color: "#fff" }}>
                Product title
              </h2>
              <h3 className="h3 mt-4" style={{ color: "#fff" }}>
                Price
              </h3>
            </div>
            <div className="column">
              <button
                class="btn btn-secondary"
                style={{ width: "350px", height: "50px", marginLeft: "10px" }}
                href="#"
              >
                Buy now
              </button>{" "}
              &nbsp; &nbsp; &nbsp;
              <button
                class="btn btn-secondary"
                style={{ width: "330px", height: "50px" }}
                href="#"
              >
                Customize
              </button>
            </div>
          </div>
        </div>
    </Layout>
);
}