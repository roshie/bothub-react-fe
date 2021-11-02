import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import IdToken from './pages/idToken';
import Home from './pages/Home';
import PrivateRoute from "./PrivateRoute";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDYWjzXg1TsC0lXtKQkGeep_IMMl7z_onQ",
  authDomain: "bothub-6a2e3.firebaseapp.com",
  projectId: "bothub-6a2e3",
  storageBucket: "bothub-6a2e3.appspot.com",
  messagingSenderId: "649455413731",
  appId: "1:649455413731:web:c60c68942c6b830c23d8d6",
  measurementId: "G-9TVY77QJ8T"
};


function App() {
  
  initializeApp(firebaseConfig);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/idToken" component={IdToken}/>
        <PrivateRoute exact path="/bleh" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
