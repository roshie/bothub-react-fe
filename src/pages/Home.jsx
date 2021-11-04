import { useRef } from "react";
import Layout from "./components/Layout"


function LandingPage(props) {
    return (
        <section className="vh-100" id="home" name="home">
            <div className="row m-auto">
                <div className="col-12 col-md-6">
                    <div className="fw-bold text-light tagline">A Shop for all Automation Projects</div>
                </div>
                <div className="col-12 col-md-6"></div>
            </div>
        </section>
    );
}

function Categories(props) {
    return (
        <section id="categories" className="vh-100 text-light" name="categories">
            <div className="row m-auto">
                Categories
            </div>
        </section>
    );
}

function D3Printing(props) {
    return (
        <section id="threeDPrinting" className="vh-100 text-light" name="threeDPrinting">
            <div className="row m-auto">
                3d Printing
            </div>
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