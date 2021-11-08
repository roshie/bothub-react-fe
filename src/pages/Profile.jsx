import Layout from "./components/Layout";
import { Collapse } from "react-bootstrap";
import { useState } from "react";
import BackgroundSlider from "react-background-slider";

export default function Profile(props) {
  const [open, setOpen] = useState(false);
  return (
    <Layout loginState={props.login} page="profile">
      <h2 className="m-5 mb-2 mt-2">Hello, MK</h2>
      <div
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="card bg-info h-50 mx-3 w-50"
      >
        <div className="card-body p-5 mx-auto justify-content-center "  >
          <h5 className="fw-bold my-0 mx-1 ">View my orders</h5>
        </div>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text ">Your Orders</div>
      </Collapse>
      <div
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="card bg-info h-50 mx-3 w-50"
      >
        <div className="card-body p-5 mx-auto justify-content-center "  >
          <h5 className="fw-bold my-0 mx-1 ">Change Delivery Address</h5>
        </div>
      </div>

      <Collapse in={open}>
        <div id="example-collapse-text ">Your Orders</div>
      </Collapse>
      
    </Layout>
  );
}
