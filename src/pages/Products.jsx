import { Product } from "./components/Cards";
import Layout from "./components/Layout";

export default function Products(props) {
  const categoryTag = props.categoryTag;

  return (
    <Layout loginState={props.login} page="products">
      <section
        id="products"
        className="min-vh-75 text-light px-auto"
        name="products"
      >
        <div className="row d-flex justify-content-center w-75 mx-auto">
          <div className="text-center py-5 h2 fw-bolder h-auto">
            {categoryTag.split("-").join(" ")}

            {/* Todo: Get categoryname from backend */}
          </div>
          <div className="row d-flex justify-content-center">
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
      </section>
    </Layout>
  );
}
