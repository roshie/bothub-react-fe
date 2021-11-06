import Layout from "./components/Layout";
import { Category } from "./components/Cards"
import { useEffect } from "react";

function LandingPage(props) {
  return (
    <section className="vh-100" id="home" name="home">
      <div className="hero d-flex justify-content-center align-items-center cen">
        <div className="row w-75">
          <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 mt-md-5 padding_zero d-flex justify-content-center flex-column">
              <div className="fw-bold text-light tagline">A Shop for all Automation Projects.</div>
              <a href="#"><button id="Explore" className="btn-lg btn btn-secondary fw-bold my-2">Explore</button></a>
            </div>  
            <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12 my-auto padding_zero text-center">
                <img className="pic floating" src="ROBOT.png"/>
          </div>     
        </div>   
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
        <div className="hero d-flex justify-content-center align-items-center cen">
          <div className="row w-75">
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 padding_zero d-flex justify-content-center flex-column">
                <div className="fw-bold text-light mb-2 mt-4" style={{fontSize: '25px'}}>3D Printing</div>
                <div className="fw-bold text-light tagline">You Design, We Develope</div>
                <div className="fw-bold text-light mb-2" style={{fontSize: '20px'}}>We provied 3D Printing services</div>
                <a href="#"><button id="View" className="btn-lg btn btn-secondary fw-bold my-2">View Details</button></a>
            </div>  
            <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12 my-auto padding_zero text-center">
                <img className="pict"src="3d-printer.png"/>
            </div>     
          </div>   
        </div>
      </section>
    );
}

export default function Home(props) {
    useEffect(() => {
        document.title = "Bothub | A Stop for all Automation Projects"

        // eslint-disable-next-line
    }, [])
    return (
        <Layout loginState={props.login} page="home">
        <LandingPage />
        <Categories />
        <D3Printing />
        </Layout>
    );
}



    