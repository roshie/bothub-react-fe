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

    setUidIDToken(uid, user) {
        getIdToken(user).then((idToken) => {
            this.setState({
                token: idToken,
                uid: uid
            })
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
                    <div> UID: {this.state.uid}</div> 
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