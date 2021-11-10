import Layout from "./components/Layout";
import { Button, Badge } from "react-bootstrap";

export default function viewOrders(props) {
  return (
    <Layout loginState={props.login} page="viewOrders">
      <section
        id="viewOrders"
        className="min-vh-100 text-light"
        name="viewOrders"
      >
        <div className="row m-auto w-md-75">
          <div
            className="text-center py-4 mt-2 h2"
            style={{ fontWeight: "bolder" }}
          >
            Your Orders
          </div>
          <div id="orders-holder">
            <OrderComponent
              productName="Bosch Washing Machine"
              orderDate="15.05.21"
              imgThumbnail="IOT.jfif"
              status="Delivered"
            />
            <OrderComponent
              productName="Bosch Washing Machine"
              orderDate="15.05.21"
              imgThumbnail="IOT.jfif"
              status="Delivered"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function OrderComponent(props) {
  return (
    <div className="card p-2 p-md-3 w-100 my-3">
      <div className="d-flex justify-content-center">
        <div className="col-4 p-0 d-none d-sm-block my-auto">
          <img
            src={props.imgThumbnail}
            className="w-100 h-auto"
            style={{ borderRadius: "10px" }}
            alt="..."
          />
        </div>
        <div className="col-12 col-sm-8 ps-4 ps-md-5 p-2">
          <div className="d-flex align-items-center flex-column justify-content-between flex-md-row h-100">
            <div className="col-12 col-md-8">
              <div className="d-flex flex-column justify-content-around h-100 align-items-center align-items-sm-start">
                <div className="fs-5 fw-bolder text-center text-md-start my-1">
                  {props.productName}
                </div>
                <div className="fs-6 my-1 text-center text-md-start">
                  Ordered on: {props.orderDate}
                </div>
                <Button variant="secondary" className="my-2 w-50" size="sm">
                  View Order Details
                </Button>
              </div>
            </div>
            <div className="col-12 col-md-4 text-center text-sm-start text-md-center">
              <Badge
                bg="success"
                className="mw-75 p-2 my-2"
                style={{ borderRadius: "15px" }}
              >
                {props.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
