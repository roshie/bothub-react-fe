import Layout from "./components/Layout";
import { Collapse } from "react-bootstrap";
import { useState } from "react";
import BackgroundSlider from "react-background-slider";

export default function Profile(props) {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(false);
  const [password, setPassword] = useState(false);
  return (
    <Layout loginState={props.login} page="profile">
      <div className="row m-auto w-75">
        <h2 className="m-5 mb-2 mt-3">Hello, Keerthi</h2>

        {/* My Orders start here */}

        <div
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          className="card bg-info h-50 mx-3 w-75 mt-3  "
        >
          <div className="card-body p-5 mx-auto justify-content-center ">
            <h5 className="fw-bold my-0 mx-1  ">View my orders</h5>
          </div>
        </div>
        <Collapse in={open}>
          <div id="example-collapse-text ">
            <div className="row mt-4 mx-auto p-0 justify-content-left">
              <div className="col-md-6 my-3 ">
                <div className="card">
                  <div className="card-body">
                    <div className="mx-2">
                      <div className="mb-5 row">
                        <div className="col-lg-6 text-center d-flex justify-content-center flex-column">
                          <img src="IOT.jfif" />
                        </div>
                        <div className="col-lg-6 text-center mt-4 ">
                          <p>Dispatched</p> {props.orderStatus}
                          <h2>Washing Machine</h2>
                          {props.productTitle}
                          <p>Discription</p>
                          <p>Order Placed on:</p>
                          <h4>Rs 25,000</h4>
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <a href="#">
                          <button
                            type="button"
                            class="btn btn-secondary fw-bold my-2"
                          >
                            View Details
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Collapse>

        {/* Change Address starts here */}

        <div
          onClick={() => setAddress(!address)}
          aria-controls="example-collapse-text"
          aria-expanded={address}
          className="card bg-info h-50 mx-3 w-75 mt-5"
        >
          <div className="card-body p-5 mx-auto justify-content-center ">
            <h5 className="fw-bold my-0 mx-1 ">Change Delivery Address</h5>
          </div>
        </div>

        <Collapse in={address}>
          <div id="example-collapse-text ">
            <div className="card mt-4 ">
              <div className="card-body mx-4">
                <form>
                  <div class="form-group mt-4 mb-4 ">
                    <label for="fullname" class="mb-2">
                      Full Name
                    </label>
                    <input
                      type="text area "
                      class="form-control mb-2"
                      id="fullname"
                      aria-describedby="emailHelp"
                      placeholder="Enter your Full name"
                    />

                    {/* </div> */}
                    <label for="mobile" class="mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      class="form-control mb-2"
                      id="mobile"
                      aria-describedby="emailHelp"
                      placeholder="+91 88077 13289"
                    />

                    <label for="address" class="mb-2">
                      Your Address
                    </label>
                    <input
                      type="text area"
                      class="form-control mb-2"
                      id="address"
                      aria-describedby="emailHelp"
                      placeholder="Enter address"
                    />
                    <label for="city" class="mb-2">
                      City
                    </label>
                    <input
                      type="text area"
                      class="form-control mb-2"
                      id="city"
                      aria-describedby="emailHelp"
                      placeholder="Chennai"
                    />
                    <label for="landmark" class="mb-2">
                      Landmark:
                    </label>
                    <input
                      type="text-area"
                      class="form-control mb-2"
                      id="landmark"
                      aria-describedby="emailHelp"
                      placeholder="Near by MK House"
                    />
                    <label for="state" class="mb-2">
                      State
                    </label>
                    <input
                      type="text-area"
                      class="form-control mb-2"
                      id="state"
                      aria-describedby="emailHelp"
                      placeholder="Tamil Nadu"
                    />

                    <label for="country" class="mb-2">
                      Country
                    </label>
                    <input
                      type="text-field"
                      class="form-control mb-2"
                      id="country"
                      aria-describedby="emailHelp"
                      placeholder="India"
                    />
                    <label for="pin" class="mb-2">
                      Pin Code:
                    </label>
                    <input
                      type="text area"
                      class="form-control mb-2"
                      id="pin"
                      aria-describedby="emailHelp"
                      placeholder="600062"
                    />
                    <div class="form-group"></div>

                    <a
                      href="#"
                      button
                      type="submit"
                      class="btn btn-secondary mt-2"
                    >
                      Submit
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Collapse>

        {/* Change password starts here */}

        <div
          onClick={() => setPassword(!password)}
          aria-controls="example-collapse-text"
          aria-expanded={password}
          className="card bg-info h-50 mx-3 w-75 mt-5"
        >
          <div className="card-body p-5 mx-auto justify-content-center ">
            <h5 className="fw-bold my-0 mx-1 ">Change Password</h5>
          </div>
        </div>

        <Collapse in={password}>
          <div id="example-collapse-text ">
            <div className="card mt-4">
              <div className="card-body mx-4">
                <label class="mb-2" for="exampleInputPassword1">
                  Current Password:
                </label>
                <input
                  type="password"
                  class="form-control mb-2"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
                <label for="exampleInputPassword1" class="mb-2">
                  New Password:
                </label>
                <input
                  type="password"
                  class="form-control mb-2"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
                <label for="exampleInputPassword1" class="mb-2">
                  Re-enter Password
                </label>
                <input
                  type="password"
                  class="form-control mb-2"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
                <div class="form-group"></div>

                <a href="#" button type="submit" class="btn btn-secondary mt-2">
                  Submit
                </a>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </Layout>
  );
}
