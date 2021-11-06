import Layout from "./components/Layout";
import { Category } from "./components/Cards"

function LandingPage(props) {
  return (
    <section className="vh-100" id="home" name="home">
      <div className="row m-auto">
        <div className="col-12 col-md-6">
          <div className="fw-bold text-light tagline">
            A Shop for all Automation Projects
          </div>
        </div>
        <div className="col-12 col-md-6"></div>
      </div>
    </section>
  );
}

function Categories(props) {
  return (
    <section id="categories" className=" text-light" name="categories">
        <div className="row m-auto w-75">
            <div
                className="text-center pt-5 h2 "
                style={{ fontWeight: "bolder" }}
            >
                Shop by Category
            </div>
            <div className="row mt-4 mx-auto p-0 justify-content-center">
                <div className="col-md-4 my-3">
                    <Category imgPath="IOT.jfif" categoryTitle="IOT Components" categoryId="66767677"/>
                </div>
            </div>
        </div>
    </section>
  );
}

function D3Printing(props) {
    return (
      <section
        id="threeDPrinting"
        className="vh-100 text-light"
        name="threeDPrinting"
      >
        <div className="row m-auto">3d Printing</div>
      </section>
    );
}

export default function Home(props) {
  return (
    <Layout loginState={props.login} page="home">
      <LandingPage />
      <Categories />
      <D3Printing />
    </Layout>
  );
}



    