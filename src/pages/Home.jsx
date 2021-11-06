import { useRef } from "react";
import Layout from "./components/Layout";
import { Card } from "react-bootstrap";

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
        <div data-aos="fade-in" data-aos-duration="2000">
          <div
            className="text-center pt-5 h2 "
            style={{ fontWeight: "bolder" }}
          >
            Categories
          </div>
          <div class="row mt-4 ">
  <div class="col-sm-4 mb-3 ">
  <div class="card" style={{backgroundColor:'#192245',borderRadius:'20px'}}>
    
    <div class="card-body text-center " >
    <img src="IOT.jfif" class="card-img-top" style={{borderRadius:'20px'}} alt="..."/>
    
      <h5 class="card-title mt-4">IOT Components</h5>
      <a href="#" class="btn btn-danger mt-2" >View More</a>
    </div>
  </div>
  </div>
  <div class="col-sm-4 mb-3">
  <div class="card" style={{backgroundColor:'#192245',borderRadius:'20px'}}>
    
    <div class="card-body text-center " >
    <img src="IOT.jfif" class="card-img-top" style={{borderRadius:'20px'}} alt="..."/>
    
      <h5 class="card-title mt-4">IOT Components</h5>
      <a href="#" class="btn btn-danger mt-2" >View More</a>
    </div>
  </div>
  </div>
  <div class="col-sm-4 mb-3">
    <div class="card" style={{backgroundColor:'#192245',borderRadius:'20px'}}>
    
      <div class="card-body text-center " >
      <img src="IOT.jfif" class="card-img-top" style={{borderRadius:'20px'}} alt="..."/>
      
        <h5 class="card-title mt-4">IOT Components</h5>
        <a href="#" class="btn btn-danger mt-2" >View More</a>
      </div>
    </div>
  </div>
</div>
          </div>
          </div>
      
    </section>
  );
}

function threeDPrinting(props) {
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
      <threeDPrinting />
    </Layout>
  );
}
