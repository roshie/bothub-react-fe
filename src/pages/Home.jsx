import Layout from "./components/Layout"


export default function Home(props) {
    return (
        <Layout loginState={props.login} page="home">
            <h1 className="text-dark"> Home</h1>
        </Layout>
    );
}