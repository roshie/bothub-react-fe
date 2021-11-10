import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel, Button } from "react-bootstrap";
import Layout from "./components/Layout";
import { Product } from "./components/Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function ProductPage(props) {
  const productSeoTagline = props.productSeoTagline;
  console.log(productSeoTagline);

  return (
    <Layout loginState={props.login} page="product">
      <div className="min-vh-100 d-flex justify-content-center align-items-center flex-column">
        <div className="row w-100 mt-3 mx-3 mb-2 justify-content-center">
          <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
            <Carousel
              style={{
                borderRadius: "20px",
                maxWidth: "600px",
              }}
            >
              <Carousel.Item>
                <img
                  className="d-block w-100 radius-20"
                  style={{ height: "500px" }}
                  src="example.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 radius-20"
                  style={{ height: "500px" }}
                  src="example.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 radius-20"
                  style={{ height: "500px" }}
                  src="example.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-12 col-lg-6 p-3 p-md-4 d-flex justify-content-center justify-content-lg-start">
            <div className="card h-100 w-100 p-4" style={{ maxWidth: "600px" }}>
              <div className="d-flex flex-column justify-content-around h-100">
                <div className="fs-3 fw-bolder m-2">Bosch Washing Machine</div>
                <div className="fs-5 fw-bold m-2">Rs 25000</div>
                <div className="fs-6 m-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat ad nostrum ipsam libero error provident, dignissimos
                  corrupti reprehenderit, dolor tempore labore nulla dicta, vero
                  at accusantium facere? Necessitatibus, quisquam inventore!
                </div>
                <div className="d-flex m-2">
                  <Button variant="secondary" className="on-hover-light m-2">
                    Buy Now
                  </Button>
                  <button className="btn btn-whatsapp on-hover-light m-2">
                    <FontAwesomeIcon icon={faWhatsapp} /> Customize
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-100 mt-2 mx-3 mb-3">
          <div className="fs-4 fw-bolder text-center my-2">
            View more about the product
          </div>
          <div
            className="embed m-1 m-md-2 d-flex justify-content-center"
            style={{ alignContent: "center", alignItems: "center" }}
          >
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/4uREqbCNT-c"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div className="row w-100 m-4">
          <div className="fs-4 fw-bolder text-center my-2">See Also</div>
          <div className="row d-flex justify-content-center px-3 px-lg-5 m-0 m-md-3">
            <Product
              seoTagline="bosch-washing-machine"
              imgThumbnail={"IOT.jfif"}
              productTitle="Bosch Washing machine"
              productPrice="25000"
            />
            <Product
              seoTagline="bosch-washing-machine"
              imgThumbnail={"IOT.jfif"}
              productTitle="Bosch Washing machine"
              productPrice="25000"
            />
            <Product
              seoTagline="bosch-washing-machine"
              imgThumbnail={"IOT.jfif"}
              productTitle="Bosch Washing machine"
              productPrice="25000"
            />
            <Product
              seoTagline="bosch-washing-machine"
              imgThumbnail={"IOT.jfif"}
              productTitle="Bosch Washing machine"
              productPrice="25000"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
