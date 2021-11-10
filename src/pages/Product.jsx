import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-bootstrap";
import Layout from "./components/Layout";

export default function Product(props) {
  const productSeoTagline = props.productSeoTagline;
  console.log(productSeoTagline);

  return (
    <Layout loginState={props.login} page="product">
      <div className="row my-2 m-2">
        <div className="col-12 col-md-6">
          <Carousel variant="dark" style={{ borderRadius: "20px" }}>
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
        <div className="col-12 col-md-6">
          <div className="card w-100 h-75 my-4">
            <div className="card-body">
              <h2 className="card-title my-2 fw-bold" style={{ color: "#fff" }}>
                Product title
              </h2>
              <h3 className="h3 mt-4" style={{ color: "#fff" }}>
                Price
              </h3>
            </div>
            <div className="column">
              <a
                class="btn btn-secondary"
                style={{ width: "300px", height: "50px", marginLeft: "20px" }}
                href="/checkout"
              >
                Buy now
              </a>{" "}
              &nbsp; &nbsp; &nbsp;
              <a
                class="btn btn-secondary"
                style={{ width: "330px", height: "50px" }}
                href="https://api.whatsapp.com/send?phone=9790013652"
              >
                Customize
              </a>
              {/* </button> */}
            </div>
          </div>
        </div>
      </div>
      <div
        className="embed m-2 d-flex justify-content-center"
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
    </Layout>
  );
}
