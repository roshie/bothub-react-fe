import Layout from "./components/Layout";


export default function viewOrders(props) {
    return (
      <Layout loginState={props.login} page="viewOrders">
        <section id="viewOrders" className=" text-light" name="viewOrders">
          <div className="row m-auto w-75">
            <div
              className="text-center pt-5 h2 "
              style={{ fontWeight: "bolder" }}
            >
              Your Orders
            </div>
            <div className="row mt-4 mx-auto p-0 justify-content-center">
              <div className="col-md-12 my-3">
                        <div className="card">
                <div className="card-body" >
                <div className="mx-5">
                    {/* <h5 className="card-title my-2 fw-bold mb-3">Dispatched</h5> */}
                    <div className="mt-5 row">
                    <div className="col-lg-6 text-center d-flex justify-content-center flex-column">
                       <img src = "IOT.jfif"/>
                    </div>
                    <div className="col-lg-6 text-center mt-4">
                        <h6>Dispatched</h6>
                        <h2>Washing Machine</h2>
                        <p>Discription</p>
                        <h4>Rs 25,000</h4>
                    </div>
                    </div>
                    <div className="text-center mt-2">
                        {/* <a href="#"><button type="button" class="btn btn-secondary fw-bold my-2 mx-5">Track Package</button></a> */}
                        <a href="#"><button type="button" class="btn btn-secondary fw-bold my-2">View Details</button></a>
                    </div>

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
  