import React from "react";
import { Redirect } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Spinner } from "react-bootstrap";
import { routes } from "./App";

export default class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            user: false
        };
    }

    componentDidMount() {
        const auth = getAuth();
         onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("AuthState: True")
                this.setState({
                    user,
                    isLoaded: true
                })
            } else {
                console.log("AuthState: False")
                this.setState({
                    isLoaded: true
                })
            }
        })

    }

    render() {
        const {isLoaded, user} = this.state;

        if (!isLoaded) {
            return (
                <div className="d-flex justify-content-center align-items-center"
                        style={{ height: "100vh", width: "100vw" }}>
                    <Spinner animation="border" className="text-light"/>
                </div>
            );

        } else {

            const Component = this.props.component;

            if (user) {
                return <Component login={true} user={user} {...this.props}/>
            } else if (this.props.shouldLogin === true) {
                return <Redirect to={{pathname: `${routes.login}?redirect=${getPageName(this.props.path)}`}}/>;
            } else {
                return <Component login={false} {...this.props}/>
            }
        }
    }
}

const getPageName = (path) => Object.keys(routes).find(key => routes[key] === path);