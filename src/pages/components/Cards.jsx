


export function Category(props) {
    return (
        <div className="card">
            <div className="card-body text-center" >
                <img src={props.imgPath} className="card-img-top mb-2 radius-20" alt="..."/>
                <h5 className="card-title my-2 fw-bold">{props.categoryTitle}</h5>
                <a href={"#"+ props.categoryId} className="btn btn-secondary fw-bold my-2" >View All</a>
            </div>
        </div>
    );
}


export function Product(props) {

    return (
        <div className="card" onClick={goTo(props.url)}>
            <div className="card-body text-center" >
                <img src={props.imgThumbnail} className="card-img-top mb-2 radius-20" alt="..."/>
                <h5 className="card-title my-2 fw-bold">{props.productTitle}</h5>
                <h3 className="text-secondary my-2 fw-bold">Rs {props.productPrice}</h3>
            </div>
        </div>
    );

    //  Use like this. eg:
    //  <Product url="#" imgThumbnail="IOT.jfif" productTitle="Bosch Washing machine" productPrice="25000" />
}

const goTo = (url) => window.location.href(url)
