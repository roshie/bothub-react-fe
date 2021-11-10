import React from "react";
import { Redirect } from "react-router-dom";
import { getAuth, onAuthStateChanged, getIdToken } from "firebase/auth";
import { Spinner } from "react-bootstrap";
import { routes } from "./App";
import { backendAppUrl, getRequestParams } from "./config";

export default class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      user: false,
    };
  }

  setUserFalse = () => {
    this.setState({
      user: false,
      isLoaded: true,
    });
  };

  getPageName = (path) => {
    console.log(path);
    return Object.keys(routes).find((key) => routes[key] === path);
  };

  componentDidMount() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const data = {
          uid: user.uid,
          idToken: "",
        };
        getIdToken(user)
          .then((idToken) => {
            data.idToken = idToken;
          })
          .then(() => {
            fetch(`${backendAppUrl}/users/auth-status`, {
              ...getRequestParams("POST", data),
            })
              .then((res) => res.json())
              .then(
                (auth) => {
                  if (auth.status === "true") {
                    this.setState({
                      user,
                      isLoaded: true,
                    });
                    localStorage.uid = data.uid;
                    localStorage.idToken = data.idToken;
                  } else this.setUserFalse();
                },
                (error) => {
                  this.setUserFalse();
                  console.log(error);
                }
              );
          });
      } else this.setUserFalse();
    });
  }

  render() {
    const { isLoaded, user } = this.state;

    if (!isLoaded) {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh", width: "100vw" }}
        >
          <Spinner animation="border" size="lg" className="text-light" />
        </div>
      );
    } else {
      const Component = this.props.component;

      const propData = {
        ...this.props,
      };

      if (this.props.path === "/category/:categoryTag") {
        propData.categoryTag = window.location.pathname.split("/").pop();
      } else if (this.props.path === "/:productSeoTagline") {
        propData.productSeoTagline = window.location.pathname.split("/").pop();
      }

      if (user) {
        return <Component login={true} user={user} {...propData} />;
      } else if (this.props.shouldLogin === true) {
        return (
          <Redirect
            to={`${routes.login}?redirect=${this.getPageName(this.props.path)}`}
          />
        );
      } else {
        return <Component login={false} {...propData} />;
      }
    }
  }
}
