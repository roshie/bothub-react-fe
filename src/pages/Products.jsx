import { useEffect, useState } from "react";
import { Product } from "./components/Cards";
import Layout from "./components/Layout";
import { backendAppUrl } from "../config";
import { Spinner } from "react-bootstrap";

export default function Products(props) {
  const [categoryTag, setCategoryTag] = useState(props.categoryTag);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${backendAppUrl}/products/all?categoryName=${categoryTag}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.detail === "db-error") {
          setLoading(false);
          setProducts("fail");
        } else if (res.data.length === 0) {
          setLoading(false);
          setProducts("no-data");
        } else {
          setLoading(false);
          setProducts(res.data);
          setCategoryTag(res.categoryName);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setProducts("fail");
      });
    // eslint-disable-next-line
  }, []);

  return (
    <Layout
      loginState={props.login}
      page="products"
      categories={props.categories}
    >
      {loading ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <Spinner animation="border" size="lg" className="text-light" />
        </div>
      ) : (
        <section
          id="products"
          className="min-vh-75 text-light px-auto"
          name="products"
        >
          <div className="row d-flex justify-content-center w-100 mx-auto">
            <div className="text-center py-5 h2 fw-bolder h-auto">
              {categoryTag.split("-").join(" ")}
            </div>
            <div className="row d-flex justify-content-center">
              {products === "no-data" ? (
                <div className="my-4 fs-5 text-center">
                  No Products Available
                </div>
              ) : products === "fail" ? (
                <> {/* Return error500 component */}</>
              ) : (
                products.map((product) => (
                  <Product
                    seoTagline={product.seoTagline}
                    imgThumbnail={product.imageThumbnail}
                    productTitle={product.productName}
                    productPrice={product.productPrice}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
