import Layout from "./components/Layout";
import { Category } from "./components/Cards"
import { useEffect } from "react";

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
    useEffect(() => {
        document.title = "Bothub | A Stop for all Automation Projects"

        const MetaTags = '<!-- Primary Meta Tags --> \
        <title>Bothub | A Stop for all Automation Projects</title> \
        <meta name="title" content="Bothub | A Stop for all Automation Projects">\
        <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.">\
        <!-- Open Graph / Facebook -->\
        <meta property="og:type" content="website">\
        <meta property="og:url" content="https://bothub.in/">\
        <meta property="og:title" content="Bothub | A Stop for all Automation Projects">\
        <meta property="og:description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.">\
        <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png">\
        <!-- Twitter -->\
        <meta property="twitter:card" content="summary_large_image">\
        <meta property="twitter:url" content="https://bothub.in/">\
        <meta property="twitter:title" content="Bothub | A Stop for all Automation Projects">\
        <meta property="twitter:description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.">\
        <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png">'

        // document.head.appendChild(MetaTags)
    }, [])
    return (
        <Layout loginState={props.login} page="home">
        <LandingPage />
        <Categories />
        <D3Printing />
        </Layout>
    );
}



    