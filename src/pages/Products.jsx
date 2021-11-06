import Layout from './components/Layout';
export default function Products(props)
{
    return(
        <Layout>
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
                    {/* <Category imgPath="IOT.jfif" categoryTitle="IOT Components" categoryId="66767677"/> */}
                </div>
            </div>
        </div>
    </section>
        </Layout>
    )
}

