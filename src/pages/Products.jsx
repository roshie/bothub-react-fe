import { Product } from "./components/Cards";
import Layout from "./components/Layout";
export default function Products(props) {
  return (
    <Layout>
      <section id="products" className=" text-light" name="products">
        <div className="row m-auto w-75">
          <div
            className="text-center pt-5 h2 "
            style={{ fontWeight: "bolder" }}
          >
            IOT Components
          </div>
          <div className="row mt-4 mx-auto p-0 justify-content-center">
            <div className="col-md-4 my-3">
              <Product
                url="/product"
                imgThumbnail="IOT.jfif"
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
