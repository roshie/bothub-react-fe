import { Form, FloatingLabel, Button } from "react-bootstrap";




export default function userDetails() {
    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
            <div className="card col-md-8 m-5 ">
                <h2 className="text-center mt-5">User Details</h2>
                <div className="card-body w-100">
                    <Form className="mt-5 mb-4 mx-3">

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Full Name"
                            className="mb-3 col-md-8 text-light"

                        >
                            <Form.Control className="bg-primary border-primary text-light" type="text-field" placeholder="John Doe" />
                        </FloatingLabel>
                        <div className="row">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Mobile Number"
                                className="mb-3 col-md-6 text-light"

                            >
                                <Form.Control className="bg-primary border-primary text-light" required type="tel" placeholder="+919999988888" />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3 col-md-6 text-light"
                            >
                                <Form.Control className="bg-primary border-primary text-light" required type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                        </div>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Address"
                            className="mb-3 text-light">
                            <Form.Control className="bg-primary border-primary text-light" required type="text-area" placeholder="123 Main Street, New York, NY 10030" />
                        </FloatingLabel>
                        <div className="row ">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="City"
                                className="mb-3 col-md-4 text-light">
                                <Form.Control className="bg-primary border-primary text-light" required type="text" placeholder="Chennai" />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="State"
                                className="mb-3 col-md-4 text-light">
                                <Form.Control className="bg-primary border-primary text-light" required type="text" placeholder="Tamil Nadu" />
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Country"
                                className="mb-3 col-md-4 text-light">
                                <Form.Control className="bg-primary border-primary text-light" required type="text" placeholder="India" />
                            </FloatingLabel>
                        </div>
                        <div className="row">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Pin Code"
                                className="mb-3 col-md-6 text-light">
                                <Form.Control className="bg-primary border-primary text-light" required type="text" pattern="[1-9][0-9]{6}" placeholder="Tamil Nadu" />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Land Mark"
                                className="mb-3 col-md-6 text-light">
                                <Form.Control className="bg-primary border-primary text-light" required type="text" placeholder="Gettysburg" />
                            </FloatingLabel>
                        </div>
                        <div className="text-center">
                            <Button className="btn btn-secondary ">
                                Continue
                            </Button>
                            <Button className="btn btn-secondary" style={{marginLeft:"10px"}}>
                                Send Email Verification
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}