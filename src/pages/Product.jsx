import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel, Button, Spinner } from "react-bootstrap";
import Layout from "./components/Layout";
import { Category, Product } from "./components/Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { backendAppUrl } from "../config";
import { routes } from "../App";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router";

export default function ProductPage(props) {
  const productSeoTagline = props.productSeoTagline;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [prd, setPrd] = useState({});

  useEffect(() => {
    fetch(`${backendAppUrl}/products?seoTagline=${productSeoTagline}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        document.title = `Not Found | Bothub`;
        if (res.detail === "db-error") {
          setPrd("fail");
          return null;
        } else if (res.data === null) {
          setPrd("no-data");
          return null;
        } else {
          document.title = `${res.data.productName} | Bothub`;
          const videoLink = new URL(res.data.videoLink);
          res.data.videoId = videoLink.searchParams.get("v");
          setPrd(res.data);
          return res.data.categoryName;
        }
      })
      .then((categoryTag) => {
        fetch(`${backendAppUrl}/products/all?categoryName=${categoryTag}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((result) => result.json())
          .then((result) => {
            if (result.detail === "db-error") {
              setLoading(false);
              setProducts("fail");
            } else if (result.data.length === 0 || result.data === null) {
              setLoading(false);
              setProducts("no-data");
            } else {
              setLoading(false);
              if (result.data.length > 4) result.data = result.data.slice(0, 4);
              setProducts(result.data);
            }
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
            setProducts("fail");
          });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setPrd("fail");
      });
    // eslint-disable-next-line
  }, []);

  return (
    <Layout loginState={props.login} page="product">
      <section className="min-vh-100 d-flex justify-content-center align-items-center flex-column">
        {loading ? (
          <Spinner animation="border" size="lg" className="text-light" />
        ) : (
          <>
            <div className="row w-100 mt-3 mx-3 mb-2 justify-content-center">
              {prd === "fail" ? (
                <Redirect to={routes.error500} />
              ) : prd === "no-data" ? (
                <div className="my-4 fs-5 text-center">
                  Seems like the Product named{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    "{productSeoTagline.split("-").join(" ")}"
                  </span>{" "}
                  is not available.
                </div>
              ) : (
                <>
                  <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
                    <Carousel
                      style={{
                        borderRadius: "20px",
                        maxWidth: "600px",
                      }}
                    >
                      {prd.imageURL.split(";").map((url) => (
                        <Carousel.Item>
                          <img
                            className="d-block w-100 radius-20"
                            style={{ height: "500px" }}
                            src={url}
                            alt={prd.productName}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                  <div className="col-12 col-lg-6 p-3 p-md-4 d-flex justify-content-center justify-content-lg-start">
                    <div
                      className="card h-100 w-100 p-4"
                      style={{ maxWidth: "600px" }}
                    >
                      <div className="d-flex flex-column justify-content-around h-100">
                        <div className="fs-3 fw-bolder m-2">
                          {prd.productName}
                        </div>
                        <div className="m-2">
                          <div className="fs-5 fw-bold">
                            <FontAwesomeIcon icon={faRupeeSign} />{" "}
                            {prd.productPrice}
                          </div>
                          <small>*Inclusive of all taxes</small>
                        </div>
                        <div className="fs-6 m-2">{prd.productDescription}</div>
                        <div className="d-flex m-2">
                          <Button
                            variant="secondary"
                            className="on-hover-light m-2"
                            onClick={() => {
                              window.location.href = `${routes.checkout}?pid=${prd.productId}`;
                            }}
                          >
                            Buy Now
                          </Button>
                          <a 
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://chat.whatsapp.com/CbkoquUVanC1LEQWb9s1bq">
                          <button className="btn btn-whatsapp on-hover-light m-2">
                            <FontAwesomeIcon icon={faWhatsapp} /> Customize
                          </button></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {prd !== "fail" && prd !== "no-data" && (
              <div className="row w-100 mt-2 mx-3 mb-3">
                <div className="fs-4 fw-bolder text-center my-2 mb-4">
                  View more about the product
                </div>
                <div
                  className="embed d-flex justify-content-center"
                  style={{ alignContent: "center", alignItems: "center" }}
                >
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${prd.videoId}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            )}

            <div className="row w-100 p-4">
              <div className="fs-4 fw-bolder text-center my-2">See Also</div>
              <div className="row d-flex justify-content-center px-3 px-lg-5 m-0 m-md-3">
                {products === "fail" || products === "no-data"
                  ? props.categories.map((category) => (
                      <Category
                        imgPath={category.imageThumbnail}
                        categoryTitle={category.categoryName
                          .split("-")
                          .join(" ")}
                        categoryName={category.categoryName}
                      />
                    ))
                  : products.map((product) => (
                      <Product
                        seoTagline={product.seoTagline}
                        imgThumbnail={product.imageThumbnail}
                        productTitle={product.productName}
                        productPrice={product.productPrice}
                      />
                    ))}
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}
