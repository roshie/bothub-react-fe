import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Headroom from "react-headroom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../App";
import logout from "../../logout";
import { Modal } from "react-bootstrap";
import {
  faEnvelope,
  faPhoneAlt,
  faAddressCard,
  faPlus,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function Layout(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setAndClose = (e) => {
    setShow(false);
    scroll(e.target.href);
  };

  useEffect(() => {
    scroll();
    // eslint-disable-next-line
  }, []);

  const scroll = (path = window.location.href) => {
    if (props.page === "home") {
      const href = path.split("/").pop();
      console.log("href: ", href);
      if (href.startsWith("#") && href !== "#") {
        const elem = document.querySelector(href);
        elem.scrollIntoView(true);
      }
    }
  };

  const MenuItems = (props) => {
    return (
      <>
        <Item
          href={props.page === "home" ? "#home" : routes.home}
          active={props.page === "home" ? true : false}
          onClick={setAndClose}
        >
          Home
        </Item>
        <Item
          href={
            props.page === "home" ? "#categories" : `${routes.home}#categories`
          }
          active={false}
          onClick={setAndClose}
        >
          Categories
        </Item>
        <Item
          href={
            props.page === "home"
              ? "#threeDPrinting"
              : `${routes.home}#threeDPrinting`
          }
          active={false}
          onClick={setAndClose}
        >
          3D Printing
        </Item>
        {props.loginState ? (
          <>
            <Item
              href={props.page === "profile" ? "#" : routes.profile}
              active={props.page === "profile" ? true : false}
            >
              Profile
            </Item>
            <Item href="NA" active={false} onClick={logout}>
              Logout
            </Item>
          </>
        ) : (
          <>
            <Item href={routes.login} active={false}>
              Login
            </Item>
            <Item href={routes.signUp} active={false}>
              Sign Up
            </Item>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Headroom>
        <nav
          className="navbar navbar-light bg-info shadow"
          style={{ height: "80px" }}
        >
          <div className="container-fluid justify-content-around">
            <span className="navbar-brand mb-0 d-flex flex-column">
              <Link to={routes.home} className="text-decoration-none">
                <h3 className="fw-bold text-light mb-0 on-hover-secondary">
                  BotHub.in
                </h3>
              </Link>
              <span
                className="text-light"
                style={{ fontSize: "9px", textAlign: "end" }}
              >
                Experience innovation
              </span>
            </span>
            <span className="navbar-brand mb-0 h1"></span>
            <span className="navbar-brand mb-0 h1 d-none d-md-block">
              <MenuItems {...props} navBar={true} />
            </span>
            <button
              className="navbar-toggler d-block d-md-none"
              type="button"
              onClick={handleShow}
            >
              <FontAwesomeIcon icon={faBars} className="text-secondary" />
            </button>
          </div>
        </nav>
      </Headroom>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header
          closeButton
          style={{ border: "none" }}
          className="bg-info"
        >
          <Modal.Title className="text-light">Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-primary d-flex flex-column">
          <MenuItems {...props} navBar={false} />
        </Modal.Body>
      </Modal>
      {props.children}

      <footer className="bg-secondary h-auto py-5">
        <div className="foot bg-secondary shadow"></div>
        <div className="col" style={{ marginLeft: "10%", marginRight: "10%" }}>
          <h3 className="fw-bolder text-light">Contact</h3>
          <div className="row mt-4">
            <div className="col-12 col-md-4 my-3">
              <h5>
                <FontAwesomeIcon icon={faBuilding} />
                <i class="fa fa-building mx-2"></i>BotHub
              </h5>
              <div className="mt-3 mx-4">
                <p>Build your Ideas with our Experts.</p>
                <h5>
                  <a
                    className="text-decoration-none text-light on-hover-primary"
                    href="https://zuetechnologies.com/"
                  >
                    About us
                  </a>
                </h5>
              </div>
            </div>
            <div className="col-12 col-md-4 my-3">
              <h5>
                <FontAwesomeIcon icon={faPlus} />
                <i class="fa fa-plus mx-2"></i>Connect with us
              </h5>
              <div className="mt-3 mx-4">
                <p>
                  <FontAwesomeIcon icon={faPhoneAlt} />
                  <i class="fa fa-phonealt mx-2"></i>
                  Mobile: 8870795518
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <i class="fa fa-envelope mx-2"></i>
                  Email: bothub.zue@gmail.com
                </p>
                <p>
                  <a
                    href="https://www.instagram.com/bothub_in/?hl=en"
                    className="text-decoration-none text-light on-hover-primary"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                    <i class="fa fa-instagram mx-2"></i>
                    bothub_in
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.facebook.com/profile.php?id=100071186148837"
                    className="text-decoration-none text-light on-hover-primary"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                    <i class="fa fa-facebook mx-2"></i>
                    bothub.in
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.linkedin.com/in/bot-hub-4289a8218/"
                    className="text-decoration-none text-light on-hover-primary"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                    <i class="fa fa-linkedin mx-2"></i>
                    Bot Hub
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.youtube.com/channel/UCfVAW1TcodkOPVLjywvER_g/featured"
                    className="text-decoration-none text-light on-hover-primary"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                    <i class="fa fa-youtube mx-2"></i>
                    bothub_in
                  </a>
                </p>
                <p>
                  <a
                    href="https://api.whatsapp.com/send?phone=8870795518"
                    className="text-decoration-none text-light on-hover-primary"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} />
                    <i class="fa fa-whatsapp mx-2"></i>
                    8870795518
                  </a>
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 my-3">
              <h5>
                <FontAwesomeIcon icon={faAddressCard} />
                <i class="fa fa-addresscard mx-2"></i>Address
              </h5>
              <div className="mt-3 mx-4">
                <p>9B, Anboli Nagar,</p>
                <p>Chitra Nagar, Saravanampatti, </p>
                <p>Coimbatore,</p>
                <p>Tamil Nadu - 641006.</p>
              </div>
            </div>
          </div>

          <div class="container text-center">
            <p class="copyright-text br">
              Copyright &copy; 2021 | All Rights Reserved by{" "}
              <a
                className="text-decoration-none text-light on-hover-primary"
                href="/"
              >
                BotHub.in
              </a>
            </p>
            <p class="copyright-text">
              Developed by{" "}
              <a
                className="text-decoration-none text-light on-hover-primary"
                href="https://github.com/TeamCheems"
              >
                Team Cheems
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function Item(props) {
  const propParams = {
    onClick: props.onClick,
    className: `navbar-link m-2 fs-6 ${
      props.active ? "text-secondary" : "text-light"
    }`,
    style: { textDecoration: "none", cursor: "pointer" },
  };
  if (props.href !== "NA") propParams["href"] = props.href;

  return <a {...propParams}>{props.children}</a>;
}
