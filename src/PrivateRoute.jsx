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
      categories: null,
    };
  }

  setUserFalse = (categories) => {
    this.setState({
      user: false,
      isLoaded: true,
      categories,
    });
  };

  getPageName = (path) => {
    console.log(path);
    return Object.keys(routes).find((key) => routes[key] === path);
  };

  setCategories = () => {
    return fetch(`${backendAppUrl}/products/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (auth) => {
          return auth.data;
        },
        (error) => {
          console.log(error);
          return null;
        }
      );
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
                      categories: auth.categories.data,
                    });
                    localStorage.uid = data.uid;
                    localStorage.idToken = data.idToken;
                  } else this.setUserFalse(auth.categories.data);
                },
                (error) => {
                  console.log(error);
                  this.setCategories().then((data) => {
                    this.setUserFalse(data);
                  });
                }
              );
          });
      } else {
        this.setCategories().then((data) => {
          this.setUserFalse(data);
        });
      }
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
      propData.categories = this.state.categories;

      if (user) {
        return <Component login={true} user={user} {...propData} />;
      } else if (this.props.shouldLogin === true) {
        var getParams = "";
        var getParamValues = "";
        if (
          this.props.path === "/category/:categoryTag" ||
          this.props.path === "/:productSeoTagline"
        ) {
          getParams = "pathParam";
          getParamValues = window.location.pathname.split("/").pop();
        } else {
          const params = new URLSearchParams(window.location.search);
          for (const param of params) {
            getParams = getParams + ";" + param[0];
            getParamValues = getParamValues + ";" + param[1];
          }
          getParams = getParams.slice(1);
          getParamValues = getParamValues.slice(1);
        }
        const url = `${routes.login}?redirect=${
          this.getPageName(this.props.path) +
          (getParams !== ""
            ? `&params=${getParams}&values=${getParamValues}`
            : "")
        }`;
        return <Redirect to={url} />;
      } else {
        return <Component login={false} {...propData} />;
      }
    }
  }
}
