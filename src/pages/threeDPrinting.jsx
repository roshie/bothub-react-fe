import Layout from "./components/Layout";

export default function ThreeDPrinting(props) {
  return (
    <Layout
      loginState={props.login}
      page="threeDPrinting"
      categories={props.categories}
    >
      <section className="min-vh-100 d-flex justify-content-center align-items-center">
        {/* put your code here */}
        Hello from threeDPrinting
      </section>
    </Layout>
  );
}
