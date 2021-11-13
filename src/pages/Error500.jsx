import { Link } from "react-router-dom";
import { routes } from "../App.js";
import { useEffect } from "react";
export default function Error500(props) {
  useEffect(() => {
    document.title = "Error! | Bothub";
  });
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card bg-info h-100 mx-3">
        <div className="card-body p-5">
          <h2 className="fw-bold ">Something went wrong.</h2>
          <h5>
            Please try again later.
            <Link
              to={routes.home}
              className="text-decoration-none text-secondary"
            >
              {" "}
              Go To Home
            </Link>
          </h5>
          <Link className="text-decoration-none" to={routes.home}>
            <h6 className="text-secondary fw-bold text-light mt-5">
              BotHub.in
            </h6>
          </Link>
        </div>
      </div>
    </div>
  );
}
