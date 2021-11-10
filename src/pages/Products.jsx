import { Product } from "./components/Cards";
import Layout from "./components/Layout";

export default function Products(props) {
  const categoryTag = props.categoryTag;

  return (
    <Layout loginState={props.login} page="products">
      <section
        id="products"
        className="min-vh-75 text-light my-auto"
        name="products"
      >
        <div className="row m-auto w-75 mt-4">
          <div className="text-center pt-5 h2" style={{ fontWeight: "bolder" }}>
            {categoryTag.split("-").join(" ")}
          </div>
          <div className="row mt-4 mx-auto p-0 justify-content-center">
            <div className="col-md-4 my-3">
              <Product
                seoTagline="bosch-washing-machine"
                imgThumbnail={"IOT.jfif"}
                productTitle="Bosch Washing machine"
                productPrice="25000"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
