import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";

export function Category(props) {
  return (
    <div className="card on-hover-scale m-2 card-product">
      <div className="card-body text-center">
        <img
          src={props.imgPath}
          style={{
            minWidth: "160px",
            maxWidth: "320px",
            minHeight: "120px",
            maxHeight: "240px",
          }}
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
  const extraParams =
    props.newTab === true
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
  return (
    <a
      className="card on-hover-scale cursor-pointer m-2 card-product text-decoration-none"
      href={`/${props.seoTagline}`}
      {...extraParams}
    >
      <div className="card-body text-center">
        <img
          src={props.imgThumbnail}
          style={{
            minWidth: "160px",
            maxWidth: "320px",
            minHeight: "120px",
            maxHeight: "240px",
          }}
          className="card-img-top mb-2 radius-20"
          alt="..."
        />
        <h5 className="card-title my-3 fw-bold text-light on-hover-light">
          {props.productTitle}
        </h5>
        <h3 className="text-secondary my-2 fw-bold fs-5">
          <FontAwesomeIcon icon={faRupeeSign} /> {props.productPrice}
        </h3>
      </div>
    </a>
  );
}
