import Layout from "./components/Layout"


function LandingPage() {
    return (
        <section className="vh-100">
            <div className="row m-auto">
                <div className="col-12 col-md-6">
                    <div className="fw-bold text-light tagline">A Shop for all Automation Projects</div>
                </div>
                <div className="col-12 col-md-6"></div>
            </div>
        </section>
    );
}

function Categories() {
    return (
        <section className="vh-100 text-light">
            <div className="row m-auto">
                Categories
            </div>
        </section>
    );
}

export default function Home(props) {
    return (
        <Layout loginState={props.login} page="home">
            <LandingPage />
            <Categories />
        </Layout>
    );
}