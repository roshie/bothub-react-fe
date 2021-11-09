import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Redirect } from "react-router";
import IdToken from './pages/idToken';
import Home from './pages/Home';
import Product from './pages/Product';
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Authenticate, { ForgotPassword } from './pages/Authenticate';
import FirebaseAction from "./pages/firebaseAction";
import viewOrders from './pages/viewOrders';
import userDetails from './pages/userDetails';
import Error404 from './pages/Error404';
import PrivateRoute from "./PrivateRoute";
import 'bootstrap/scss/bootstrap.scss'
import './custom-bootstrap.scss';
import './App.scss';

import { initializeApp } from "firebase/app";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import { getAuth, getIdToken } from "@firebase/auth";


// Firebase Config
export const firebaseConfig = {
  apiKey: "AIzaSyDYWjzXg1TsC0lXtKQkGeep_IMMl7z_onQ",
  authDomain: "bothub-6a2e3.firebaseapp.com",
  projectId: "bothub-6a2e3",
  storageBucket: "bothub-6a2e3.appspot.com",
  messagingSenderId: "649455413731",
  appId: "1:649455413731:web:c60c68942c6b830c23d8d6",
  measurementId: "G-9TVY77QJ8T"
};

// Routes
export const routes = {
  login: '/login',
  signUp: '/sign-up',
  home: '/',
  error404: '/error404',
  idToken: '/idToken',
  profile: '/profile',
  product: '/product',
  products: '/products',
  checkout:'/checkout',
  viewOrders: '/view-orders',
  verify: '/verify',
  forgotPassword: '/forgot-password',
  firebaseAction: '/firebase-action',
  orderSummary: '/order-summary'
}

function App() {
  // Init Firebase
  initializeApp(firebaseConfig);

  return (
    <Router>
      <Switch>
        <Route exact path={routes.idToken} component={IdToken}/>
        <Route exact path={routes.forgotPassword} component={ForgotPassword}/>
        <Route exact path={routes.firebaseAction} component={FirebaseAction}/>
        <Route exact path={routes.error404} component={Error404}/>
        <PrivateRoute exact path={routes.login} component={Authenticate} page="login"/>
        <PrivateRoute exact path={routes.signUp} component={Authenticate} page="signUp"/>
        <PrivateRoute exact path={routes.home} component={Home} />
        <PrivateRoute exact path={routes.product} component={Product} />
        <PrivateRoute exact path={routes.products} component={Products} />
        <PrivateRoute exact path={routes.profile} component={Profile} shouldLogin={true}/>
        <PrivateRoute exact path={routes.checkout} component={Checkout} shouldLogin={true} />
        <PrivateRoute exact path={routes.viewOrders} component={viewOrders} shouldLogin={true} />
        <PrivateRoute exact path={routes.orderSummary} component={OrderSummary} shouldLogin={true}/>
        <PrivateRoute exact path={routes.verify} component={userDetails} shouldLogin={true}/>
        <Redirect to={routes.error404} component={Error404} />
        {/* Add more ... */}
      </Switch>
    </Router>
  );
}

export default App;

export function getToken() {
  const auth = getAuth();
  const user = auth.currentUser;
  getIdToken(user).then((idToken) => { 
      return idToken;
  })
}