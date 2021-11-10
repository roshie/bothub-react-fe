export function Category(props) {
  return (
    <div className="card on-hover-scale">
      <div className="card-body text-center">
        <img
          src={props.imgPath}
          className="card-img-top mb-2 radius-20"
          alt="Thumbnail"
        />
        <h5 className="card-title my-2 fw-bol">{props.categoryTitle}</h5>
        <a
          href={`/category/${props.categoryName}`}
          className="btn btn-secondary fw-bold my-2 on-hover-light"
        >
          View All
        </a>
      </div>
    </div>
  );
}

export function Product(props) {
  return (
    <div
      className="card on-hover-scale cursor-pointer w-auto m-2"
      onClick={() => goTo(`/${props.seoTagline}`)}
    >
      <div className="card-body text-center">
        <img
          src={props.imgThumbnail}
          className="card-img-top mb-2 radius-20"
          alt="..."
        />
        <h5 className="card-title my-3 fw-bold">{props.productTitle}</h5>
        <h3 className="text-secondary my-2 fw-bold fs-5">
          &#x20B9; {props.productPrice}
        </h3>
      </div>
    </div>
  );
}

const goTo = (url) => (window.location.href = url);
