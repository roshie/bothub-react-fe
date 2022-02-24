import Layout from "./components/Layout";
import { Category } from "./components/Cards";
import { useEffect, useState, useLayoutEffect } from "react";
import BackgroundSlider from "react-background-slider";
import { Carousel, Form, FloatingLabel,Row} from "react-bootstrap";
import emailjs from "emailjs-com";
import { routes } from "../App";

import img1 from "../assets/slideshow-1.jpg";
import img2 from "../assets/slideshow-2.jpg";
import img3 from "../assets/slideshow-3.jpg";
import img4 from "../assets/slideshow-4.jpg";

// Capture window viewport width (Hook)
function useWindowSize() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function LandingPage(props) {
  const viewportWidth = useWindowSize();
  const slideshowImages = [img1, img2, img3, img4];

  return (
    <section
      className="vh-100 d-flex justify-content-center align-items-center"
      id="home"
      name="home"
    >
      <div className="mt-neg-5 w-100 h-100">
        <div id="bg-carousel" className="d-block d-lg-none"></div>
        <div className="row w-100 h-100 mx-auto">
          <div className="col-12 col-lg-6 d-flex justify-content-center flex-column ps-lg-5 px-5 px-lg-0">
            <div className="fw-bold text-light text-center text-lg-start mx-0 ms-xl-5 ms-lg-3 z-index-1">
              BotHub.in
            </div>
            <div className="fw-bold text-light tagline text-center text-lg-start mx-0 ms-xl-5 mx-lg-3 z-index-1">
              A Stop for all Automation Devices.
            </div>
            <div className="text-center text-lg-start mx-0 ms-xl-5 ms-lg-3 z-index-1">
              <a
                href="#categories"
                className="btn-lg btn btn-secondary fw-bold my-2 fs-5 bg-gradient on-hover-light"
              >
                Explore
              </a>
            </div>
          </div>
          <div className="col-12 col-lg-6 text-center d-none d-lg-block px-0 overflow-hidden">
            <Carousel className="h-100 w-100">
              <Carousel.Item className="h-100">
                <img
                  src={img1}
                  alt=".."
                  className="h-100"
                  style={{ width: "150%" }}
                />
              </Carousel.Item>
              <Carousel.Item className="h-100">
                <img
                  src={img2}
                  alt=".."
                  className="h-100"
                  style={{ width: "150%" }}
                />
              </Carousel.Item>
              <Carousel.Item className="h-100">
                <img
                  src={img3}
                  alt=".."
                  className="h-100"
                  style={{ width: "150%" }}
                />
              </Carousel.Item>
              <Carousel.Item className="h-100">
                <img
                  src={img4}
                  alt=".."
                  className="h-100"
                  style={{ width: "150%" }}
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
      {viewportWidth <= 992 && (
        <BackgroundSlider
          images={slideshowImages}
          duration={8}
          transition={2}
          style={{ opacity: "0.5" }}
        />
      )}
    </section>
  );
}

function Categories(props) {
  return (
    <section
      id="categories"
      className="text-light my-5 py-3 d-flex justify-content-center"
      name="categories"
    >
      <div className="row d-flex justify-content-center w-75">
        <div className="text-center h2 fw-bolder my-4">Shop by Category</div>
        <div className="row d-flex justify-content-center">
          {props.categories.map((category) => (
            <Category
              imgPath={category.imageThumbnail}
              categoryTitle={category.categoryName.split("-").join(" ")}
              categoryName={category.categoryName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function D3Printing(props) {
  return (
    <section
      id="threeDPrinting"
      className="min-vh-100 text-light d-flex justify-content-center align-items-center"
      name="threeDPrinting"
    >
      <div className="row w-75 justify-content-center h-100 w-100 mx-5 py-5">
        <div className="col-12 col-lg-6 d-flex justify-content-center flex-column align-items-center my-5">
          <div className="fw-bold text-light mb-2 mt-4 fs-5">3D Printing</div>
          <div className="fw-bold text-light tagline text-center">
            You Design, We Develop
          </div>
          <div className="fw-bold text-light mb-2 fs-5 text-center mt-2">
            We provied 3D Printing services
          </div>
          <div>
            <a
              variant="secondary"
              className="btn btn-secondary fw-bold my-2 mt-3 on-hover-light"
              href={routes.threeDPrinting}
            >
              View Details
            </a>
          </div>
        </div>
        <div className="col-12 col-lg-6 text-center my-5">
          <img className="d3printer" src="3d-printer.png" alt="3DPrinter" />
        </div>
      </div>
    </section>
  );
}

function Ideas(props) {

  //Email
function sendEmail(e) {
  e.preventDefault();

  emailjs.sendForm('gmail', 'Idea', e.target, 'user_7XB3XS38prREIcbKimuFi')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    e.target.reset()
}

  return (
    <section
      id="ideas"
      className="min-vh-100 text-light bg-info d-flex justify-content-center align-items-center"
      name="idea"
    >
      <div className="row w-75 justify-content-center h-100 w-100 mx-5 py-5">
        <div className="col-12 col-lg-6 text-center my-5">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mt-3 fw-bolder">
                Submit your Ideas here!
              </h3>
              <Form className="mt-5 mb-4 mx-3" onSubmit={sendEmail}>
                <Row>
                  <FloatingLabel
                    controlId="floatingInput"
                    className=" mb-3 col-md-6 text-light"
                    label="&emsp;Full Name"
                    
                  >
                    <Form.Control
                      className="bg-primary border-primary text-light"
                      required
                      type="text-field"
                      placeholder="Joe Dohn"
                      name="name"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    className="mb-3 col-md-6 text-light"
                    label="&emsp;Mobile Number"
                    
                  >
                    <Form.Control
                      className="bg-primary border-primary text-light"
                      required
                      type="tel"
                      placeholder="9080691390"
                      name="mobile"
                    />
                  </FloatingLabel>
                </Row>
                <FloatingLabel
                  controlId="floatingInput"
                  className="mb-3 text-light"
                  label="Email"
                  
                >
                  <Form.Control
                    className="bg-primary border-primary text-light"
                    required
                    type="email"
                    placeholder="johndoe@gmail.com"
                    name="email"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingTextarea2"
                  className="mb-3 text-light"
                  label="Your Ideas"
                  
                >
                  <Form.Control
                    className="bg-primary border-primary text-light"
                    required
                    as="textarea"
                    style={{ height: "100px" }}
                    placeholder="I have a Brilliant Idea..."
                    name="ideas"
                  />
                </FloatingLabel>
                <div className="text-center">
                  <button
                    className="btn btn-secondary fw-bold my-2 fs-5 bg-gradient on-hover-light"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 d-flex justify-content-center flex-column align-items-center my-5">
          <div className="fw-bold text-light mb-2 mt-4 fs-5">IdeaStorm</div>
          <div className="fw-bold text-light tagline text-center">
            Your Ideas are welcome
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(props) {
  useEffect(() => {
    document.title = "Bothub | A Stop for all Automation Devices";
    // eslint-disable-next-line
  }, []);

  return (
    <Layout loginState={props.login} page="home">
      <LandingPage />
      <Ideas />
      <Categories categories={props.categories} />
      <D3Printing />
    </Layout>
  );
}
