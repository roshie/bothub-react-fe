import Layout from "./components/Layout";
import { Button, Badge, Spinner } from "react-bootstrap";
import { routes } from "../App";
import { useEffect, useState } from "react";
import { getRequestParams, backendAppUrl } from "../config";

export default function ViewOrders(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    document.title = `View Orders | Bothub`;

    fetch(`${backendAppUrl}/orders/all`, {
      ...getRequestParams("POST", {
        uid: localStorage.uid,
        idToken: localStorage.idToken,
        user: 1,
      }),
    })
      .then((res) => res.json())
      .then(
        (res) => {
          console.log(res);
          if (res.detail === "db-error" || res.detail === "forbidden") {
            setError(true);
            setLoading(false);
          } else {
            const val = res;
            setOrders(val);
            setLoading(false);
          }
        },
        (err) => {
          console.log(err);
          setError(true);
          setLoading(false);
        }
      );
  });

  return (
    <>
      {!error ? (
        <Layout loginState={props.login} page="viewOrders">
          <section
            id="viewOrders"
            className="min-vh-100 text-light d-flex justify-content-center align-items-center"
            name="viewOrders"
          >
            {" "}
            {loading ? (
              <Spinner animation="border" size="lg" className="text-light" />
            ) : (
              <div className="row m-auto w-md-75">
                <div
                  className="text-center py-4 mt-2 h2"
                  style={{ fontWeight: "bolder" }}
                >
                  Your Orders
                </div>
                {orders === "no-data" ? (
                  <div className="row text-center fs-5">
                    You don't have any orders to display.
                  </div>
                ) : (
                  <div id="orders-holder">
                    {orders.map((order) => {
                      return (
                        <OrderComponent
                          productName={order.productName}
                          orderDate={order.timeOrdered}
                          imgThumbnail={order.imageThumbnail}
                          status={order.shipping.status}
                          link={
                            order.shipping.status !== "NA"
                              ? null
                              : order.shipping.link
                          }
                          orderId={order.orderId}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </section>
        </Layout>
      ) : (
        <> {/* Return error500 component */}</>
      )}
    </>
  );
}

function OrderComponent(props) {
  return (
    <div className="card p-2 p-md-3 w-100 my-3">
      <div className="d-flex">
        <div className="col-4 p-0 d-none d-sm-block my-auto">
          <img
            src={props.imgThumbnail}
            className="w-100 h-auto"
            style={{ borderRadius: "10px" }}
            alt="..."
          />
        </div>
        <div className="col-12 col-sm-8 ps-4 ps-md-5 p-2">
          <div className="d-flex align-items-center justify-content-between h-100">
            <div className="col-8">
              <div className="d-flex flex-column justify-content-around h-100 align-items-center align-items-sm-start">
                <div className="fs-5 fw-bolder text-center text-md-start my-1">
                  {props.productName}
                </div>
                <div className="fs-6 my-1 text-center text-md-start">
                  Ordered on: {props.orderDate}
                </div>
                <Button
                  variant="secondary"
                  className="my-2 w-50"
                  size="sm"
                  onClick={() => {
                    window.location.href = `${routes.orderSummary}?orderId=${props.orderId}`;
                  }}
                >
                  View Order Details
                </Button>
              </div>
            </div>
            <div className="col-4 text-center text-sm-start text-md-center">
              <Badge
                bg="success"
                className="mw-75 p-2 my-2"
                style={{ borderRadius: "15px" }}
              >
                {props.status !== "NA" ? (
                  props.status
                ) : (
                  <a
                    href={props.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none on-hover-light"
                  >
                    View Delivery Status Here
                  </a>
                )}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
