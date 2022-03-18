import Layout from "./components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {Form, FloatingLabel, Row} from "react-bootstrap";


// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper.min.css";
// import "swiper/components/effect-coverflow/effect-coverflow.min.css";
// import "swiper/components/pagination/pagination.min.css";
// import "swiper/components/navigation/navigation.min.css";
// import "./styles.css";
// import SwiperCore, {
//   EffectCoverflow,
//   Pagination,
//   Navigation
// } from "swiper/core";

// SwiperCore.use([EffectCoverflow, Pagination, Navigation]);


// import img1 from "../assets/slideshow-1.jpg";
// import img2 from "../assets/slideshow-2.jpg";
// import img3 from "../assets/slideshow-3.jpg";
// import img4 from "../assets/slideshow-4.jpg";



export default function ThreeDPrinting(props) {
  return (
    <Layout
      loginState={props.login}
      page="threeDPrinting"
    >
      <section className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-75 justify-content-center h-100 w-100 mx-5 py-5">
        <div className="col-12 col-lg-6 text-center my-5">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mt-3 fw-bolder">
                Submit your 3D Graphics here!
              </h3>
              <Form className="mt-5 mb-4 mx-3">
                <Row>
                  <FloatingLabel
                    controlId="floatingInput"
                    className=" mb-3 col-md-6 text-light"
                    label="&emsp;Full Name"
                  >
                    <Form.Control
                      className="bg-primary border-primary text-light"
                      required
                      type="text"
                      placeholder="Joe Dohn"
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
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingTextarea2"
                  className="mb-3 text-light"
                  label="Any Instructions"
                >
                  <Form.Control
                    className="bg-primary border-primary text-light"
                    required
                    as="textarea"
                    style={{ height: "100px" }}
                    placeholder="Any Instructions"
                  />
                </FloatingLabel>
                <div class="bg-primary border-primary text-light mb-3 d-flex">
                  <p className="p-3">Upload Files (if you want to)</p><br/>
                  <input type="file" class="on-hover-secondary p-3" id="fileupload"/>
                </div>
                <div className="text-center">
                  <a
                    href="mailto:bothub.zue@gmail.com"
                    className="btn btn-secondary fw-bold my-2 fs-5 bg-gradient on-hover-light"
                  >
                    Submit
                  </a>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 d-flex justify-content-center flex-column align-items-center my-5">
          <div className="fw-bold text-light tagline text-center">
          3D Printing
          </div>
          <div className="fw-bold text-light mt-4 fs-4">Upload Your Files and Details here for Printing</div>
          <div className="text-light mb-2 mt-2 fs-5 text-center">We do the perfect and high quality 3D Printing Models for you.Give your details in the respective text boxes and upload your 3D model in the upload files, only if you want to.</div>
          <div className="text-light mb-2 mt-2 fs-5 text-center">For more information</div>
          <a 
            target="_blank"
            rel="noopener noreferrer"
            href="https://chat.whatsapp.com/CbkoquUVanC1LEQWb9s1bq">
            <button className="btn btn-whatsapp on-hover-light m-2 my-2">
            <FontAwesomeIcon icon={faWhatsapp} /> Connect With Us
            </button>
          </a>
        </div>
      </div>
      </section>

    <section className="vh-100" id="home" name="home">
    <div className="row m-auto w-75">
       {/* <div className="container">
      <div className="title_wrapper">
        <div className="reactLogo">
          <img src="images/react.png" />
        </div>
        <div className="title_">
          <span>React</span>Swiper Slider
        </div>
      </div>
      <Swiper
        navigation={true}
        effect={"coverflow"}
        centeredSlides={true}
        slidesPerView={window.innerWidth < 768 ? 1 : "auto"}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        pagination={{
          clickable: true
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="images/1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/6.jpg" />
        </SwiperSlide>
      </Swiper>
    </div> */}
    </div>
</section>
    </Layout>
    
  );
}
