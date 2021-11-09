import Layout from "./components/Layout";
import { Col, Collapse, Form, Row, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { routes , getToken } from "../App";
import { backendAppUrl, getRequestParams } from '../config'



export default function Profile(props) {
  const [address, setAddress] = useState(false);
  const [password, setPassword] = useState(false);
  const [editPersonal, setEditPersonal] = useState(false);
  const [state, setState] = useState({
      
      fullName:'',
      email:'',
      phoneNumber:'',
      address:'',
      city:'',
      _state:'',
      country:'',
      pincode:'',
      landmark:''
  })
  const [oldData,setOldData]= useState({})
  const [passwords,setPasswords] = useState({
    currentPassword:'',
    newPassword:'',
    confirmPassword:''
  })
  const [pageLoaded, setPageLoaded] = useState(false);
  const [passwordChangeLoaded, setPasswordChangeLoaded] = useState(false);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [shippingInfoLoaded, setShippingInfoLoaded] = useState(false);

useEffect(()=>{
    const data={
        uid: localStorage.uid,
        idToken: localStorage.idToken
    }
    fetch(`${backendAppUrl}/users`, {
        ...getRequestParams('GET', data)
    })
    .then((response) => {
        if (response.ok) {
            const result = response.json();
            if (result.detail === "db-error") {
                console.error("error")
            } else  {
                setOldData(result)
              setState({
                ...state,
                fullName:(result.fullName===null) ? '' : result.fullName,
                email:(result.email===null) ? '' : result.email,
                phoneNumber:(result.mobileNumber===null) ? '' : result.mobileNumber,
                address:(result.address===null) ? '' : result.address,
                city:(result.city===null) ? '' : result.city,
                _state:(result.state===null) ? '' : result.state,
                country:(result.country===null) ? '' : result.country,
                pincode:(result.pinCode===null) ? '' : result.pinCode,
                landmark:(result.landMark===null) ? '' : result.landMark
              })
            }
          } else {
            console.error(response.json().detail);
            
          }
    },
    (err) => {
        console.log(err)
        
    })
    //eslint-disable-next-line
},[])
const submitPersonalInfo=()=>{
    const data = {
        ...oldData,
        fullName:state.fullName,
        mobileNumber:state.phoneNumber,
        uid:localStorage.uid,
        idToken:getToken()
    }
    fetch(`${backendAppUrl}/users`, {
        ...getRequestParams('PUT', data)
    }) .then((res)=>{
        res=res.json()
        if(res==="success")
        {
            setOldData({
                ...oldData,
                fullName:state.fullName,
                mobileNumber:state.phoneNumber,
            })
        }
        else if(res.detail==="db-error")
        {

        }
    })
}
const submitShippingInfo=()=>{
    const data = {
        ...oldData,
        address: (state.address==='') ? null : state.address,
        city: (state.city==='') ? null : state.city,
        state: (state._state==='') ? null : state._state,
        country: (state.country==='') ? null : state.country,
        pinCode: (state.pincode==='') ? null : state.pincode,
        landMark: (state.landmark==='') ? null : state.landmark,
        uid:localStorage.uid,
        idToken:getToken()
    }
    fetch(`${backendAppUrl}/users`, {
        ...getRequestParams('PUT', data)
    }) .then((res)=>{
        res=res.json()
        if(res==="success")
        {
            
        }
        else if(res.detail==="db-error")
        {
            
        }
    })
}














  return (
    <Layout loginState={props.login} page="profile">
      <div className="d-flex align-items-center justify-content-center min-vh-100">
      <Spinner animation="border" className="text-light" />
        <div className="col-12 col-lg-8">
          <div className="row fs-2 m-3 fw-bold">Hello, Keerthi </div>
          <div
            className="row m-2"
            onClick={() => {
              window.location.href = routes.viewOrders;
            }}
          >
            <div className="card d-flex justify-content-center on-hover smooth-transition ">
              <div className="fs-6 m-3">View Orders</div>
            </div>
          </div>

          <div className="row m-2">
            <div
              className="card d-flex justify-content-center on-hover smooth-transition "
              onClick={() => setEditPersonal(!editPersonal)}
              aria-controls="addressDiv"
              aria-expanded={editPersonal}
            >
              <div className="fs-6 m-3">Edit Personal Info</div>
            </div>
            <Collapse in={editPersonal}>
              <div
                className="col-12 card px-4 px-md-5 py-4 my-2"
                id="addressDiv"
              >
                <Form onSubmit={() => false}>
                  <Row>
                    <Col>
                      <Form.Label
                        className="text-light my-2"
                        label="password"
                
                      >
                        Full Name
                      </Form.Label>
                      <Form.Control
                        className="bg-primary border-primary text-light"
                        placeholder="John Doe"
                        required
                        value={state.fullName}
                        onChange={(e)=>{setState({...state,fullName:e.target.value})}}
                        
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Label
                        className="text-light mt-3 mb-2 my-2"
                        label="password"
                      >
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        className="bg-primary border-primary text-light"
                        type="tel"
                        placeholder="+91 88073 00000"
                        required
                        value={state.phoneNumber}
                        onChange={(e)=>{setState({...state,phoneNumber:e.target.value})}}
                        
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Label
                        className="text-light mt-3 mb-2 my-2"
                        label="password"
                      >
                        Email
                      </Form.Label>
                      <Form.Control
                        className="bg-primary border-primary text-light"
                        type="email" 
                        placeholder="bothub@gmail.com"
                        value={state.email}
                        onChange={(e)=>{setState({...state,email:e.target.value})}}
                        readOnly
                      />
                    </Col>
                  </Row>

                  <Row className="my-5 mx-2">
                    <Button variant="secondary"
                    type="submit"
                    onClick={submitPersonalInfo}
                    >
                      Save
                      <Spinner
                        animation="border"
                        size="sm"
                        className="text-light"
                      />
                    </Button>
                  </Row>
                </Form>
              </div>
            </Collapse>
          </div>






          <div className="row m-2">
            <div
              className="card d-flex justify-content-center on-hover smooth-transition "
              onClick={() => setAddress(!address)}
              aria-controls="addressDiv"
              aria-expanded={address}
            >
              <div className="fs-6 m-3">Edit Shipping Address</div>
            </div>
            <Collapse in={address}>
              <div
                className="col-12 card px-4 px-md-5 py-4 my-2"
                id="addressDiv"
              >
                <Form onSubmit={() => false}>
                  <Row>
                    <Col>
                      <Form.Label className="text-light my-2" label="Address">
                        Address
                      </Form.Label>
                      <Form.Control className="bg-primary border-primary text-light"
                      value={state.address}
                      onChange={(e)=>{setState({...state,address:e.target.value})}}
                       />
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
                      <Form.Control className="bg-primary border-primary text-light" 
                      value={state.city}
                      onChange={(e)=>{setState({...state,city:e.target.value})}}
                      />
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
                      <Form.Control className="bg-primary border-primary text-light" 
                      value={state._state}
                      onChange={(e)=>{setState({...state,_state:e.target.value})}}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Label className="text-light mt-3 my-2" as={Col}>
                        Country
                      </Form.Label>
                      <Form.Control className="bg-primary border-primary text-light"
                       value={state.country}
                       onChange={(e)=>{setState({...state,country:e.target.value})}}
                      />
                    </Col>
                    <Col>
                      <Form.Label className="text-light mt-3 my-2" as={Col}>
                        {" "}
                        Pincode
                      </Form.Label>
                      <Form.Control className="bg-primary border-primary text-light" 
                       value={state.pincode}
                       onChange={(e)=>{setState({...state,pincode:e.target.value})}}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Label
                        className="text-light mt-3 mb-2 my-2"
                        label="Address"
                      >
                        Landmark
                      </Form.Label>
                      <Form.Control className="bg-primary border-primary text-light" 
                       value={state.landmark}
                       onChange={(e)=>{setState({...state,landmark:e.target.value})}}
                       />
                    </Col>
                  </Row>

                  <Row className="my-5 mx-2">
                    <Button variant="secondary"  onClick={submitShippingInfo} >
                      Update
                      <Spinner
                        animation="border"
                        size="sm"
                        className="text-light"
                      />
                    </Button>
                  </Row>
                </Form>
              </div>
            </Collapse>
          </div>

          <div className="row m-2">
            <div
              className="card d-flex justify-content-center on-hover smooth-transition "
              onClick={() => setPassword(!password)}
              aria-controls="addressDiv"
              aria-expanded={password}
            >
              <div className="fs-6 m-3">Change Password</div>
            </div>
            <Collapse in={password}>
              <div
                className="col-12 card px-4 px-md-5 py-4 my-2"
                id="addressDiv"
              >
                <Form onSubmit={() => false}>
                  <Row>
                    <Col>
                      <Form.Label
                        className="text-light my-2"
                        label="password"
                        type="password"
                        placeholder="Password"
                      >
                        Current Password
                      </Form.Label>
                      <Form.Control
                        className="bg-primary border-primary text-light"
                        type="password"
                        placeholder="Current Password"
                        value={passwords.currentPassword}
                        onChange={(e)=>{setPasswords({...passwords,currentPassword:e.target.value})}}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Label
                        className="text-light mt-3 mb-2 my-2"
                        label="password"
                      >
                        New Password
                      </Form.Label>
                      <Form.Control
                        className="bg-primary border-primary text-light"
                        type="password"
                        placeholder="New Password"
                        value={passwords.newPassword}
                        onChange={(e)=>{setPasswords({...passwords,newPassword:e.target.value})}}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Label
                        className="text-light mt-3 mb-2 my-2"
                        label="password"
                      >
                        Confirm New Password      
                      </Form.Label>
                      <Form.Control
                        className="bg-primary border-primary text-light"
                        type="password"
                        placeholder="Confirm New Password"
                        value={passwords.confirmPassword}
                        onChange={(e)=>{setPasswords({...passwords,confirmPassword:e.target.value})}}
                      />
                    </Col>
                  </Row>

                  <Row className="my-5 mx-2">
                    <Button variant="secondary">
                      Update Password
                      <Spinner
                        animation="border"
                        size="sm"
                        className="text-light"
                      />
                    </Button>
                  </Row>
                </Form>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </Layout>
  );
}
