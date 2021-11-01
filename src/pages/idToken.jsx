import React from "react";
import { getAuth, getIdToken, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


export default class IdToken extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: false,
            uid: null
        }
    }

    componentDidMount() {
        const auth = getAuth();
         onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                getIdToken(user).then((idToken) => {
                    this.setState({
                        token: idToken,
                        uid: uid
                    })
                    console.log("UID", uid);
                    console.log("idToken", idToken)

                  }, (error) => {
                    this.setState({
                       token: false
                    })
                  });
            } else {
            }
        })
    }


    signInwithGoogle() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        var uid = null; var token = null;
        signInWithPopup(auth, provider)
        .then((result) => {
            getIdToken(result.user).then((idToken) => {
                token = idToken;
                uid = result.user.uid
                console.log("UID", result.user.uid);
                console.log("idToken", idToken)
                
              }, (error) => {
                this.setState({
                   token: false
                })
              });
              this.setState({
                token: token,
                uid: uid
            })

        }).catch((error) => {
            // Handle Errors here.
            
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
            // An error happened.
          });
          window.location.reload();
    }

    render () {
        if (!this.state.token) {
            return (
                <> 
                    <input
                    type={"button"}
                    style={{ textTransform:"capitalize"}}
                    onClick={this.signInwithGoogle}
                    value={"Sign In with Google"}
                    />
                </>
            );
        } else {
            return(
                <>
                    <div> IDTOKEN: {this.state.token}</div> 
                    <input
                    type={"button"}
                    style={{ textTransform:"capitalize"}}
                    onClick={this.logout}
                    value={"Logout"}
                    />
                    <input
                    type={"button"}
                    style={{ textTransform:"capitalize"}}
                    onClick={() => {window.location.reload()}}
                    value={"Refresh"}
                    />
                </>
                )
        }
    }
}