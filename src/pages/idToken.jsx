import React from "react";
import { getAuth, getIdToken, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Row, Col, Button, Container } from "react-bootstrap";

// idToken - For Dev purpose
export default class IdToken extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: false,
            uid: null,
            copied: false
        }
    }

    setUidIDToken(uid, user) {
        getIdToken(user).then((idToken) => {
            this.setState({
                token: idToken,
                uid: uid
            })
            localStorage.uid = uid
            localStorage.idToken = idToken
          }, (error) => {
            this.setState({
               token: false
            })
        });
    }

    componentDidMount() {
        const auth = getAuth();
         onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                this.setUidIDToken(uid, user);
            } 
        })
    }


    signInwithGoogle() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                this.setUidIDToken(result.user.uid, result.user);
            }).catch((error) => {
                console.log(error.message)
        });
    }

    logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            this.setState({
                token: false,
                uid: false
            })
            
          }).catch((error) => {
            console.log(error.message)
        });
        window.location.reload();
    }

    render () {
        if (!this.state.token) {
            return (
                <div className="vh-100 p-5" style={{backgroundColor: 'black', fontWeight: 'bold', fontFamily: 'monospace', color: 'white', pointer: 'cursor'}}>
                    <Container className="d-flex flex-column justify-content-center align-items-center border rounded h-100">
                        <Row className="justify-content-center my-4">
                            <Button as={Col} onClick={this.signInwithGoogle} variant="dark" className="btn btn-outline-light">Sign In with Google</Button>
                        </Row>
                    </Container>
                </div>
            );
        } else {
            return(
                <div className="vh-100 p-5 font-weight-bold text-light cursor-pointer" style={{backgroundColor: 'black', fontFamily: 'monospace'}}>
                    <Container className="d-flex flex-column justify-content-center align-items-center border rounded h-100">
                        <Row className="text-center">
                            <h4>ID Tokens</h4>
                        </Row>
                        <Row className="my-2">
                            <div> UID: {this.state.uid}</div> 
                        </Row>
                        <Row>
                            <div> IDTOKEN: <Button onClick={() => {navigator.clipboard.writeText(this.state.token); this.setState({ copied: true})}} variant="dark" className="btn btn-outline-light my-1">{this.state.copied ? "Done!" : "Copy"}</Button></div> 
                            <textarea readOnly rows="7" cols="30" value={this.state.token} ></textarea>
                        </Row>
                        <Row className="justify-content-center my-4">
                            <Button as={Col} onClick={this.logout} variant="dark" className="btn btn-outline-light">Logout</Button>
                            <Button as={Col} onClick={() => {window.location.reload()}} variant="dark" className="mx-2 btn btn-outline-light">Refresh</Button> 
                        </Row>
                    </Container>
                </div>
                
            )
        }
    }
}