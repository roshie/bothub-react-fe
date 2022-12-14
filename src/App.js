import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Redirect } from "react-router";
import IdToken from './pages/idToken';
import Home from './pages/Home';
import ProductPage from './pages/Product';
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Authenticate, { ForgotPassword } from './pages/Authenticate';
import FirebaseAction from "./pages/firebaseAction";
import viewOrders from './pages/viewOrders';
import AdminOrders from './pages/adminOrders';
import UserDetails from './pages/userDetails';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';
import ThreeDPrinting from './pages/threeDPrinting'
import PrivateRoute from "./PrivateRoute";
import 'bootstrap/scss/bootstrap.scss'
import './custom-bootstrap.scss';
import './App.scss';

import { initializeApp } from "firebase/app";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
// import { useEffect } from "react";


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
  error500: '/error500',
  idToken: '/idToken',
  profile: '/profile',
  product: '/:productSeoTagline',
  products: '/category/:categoryTag',
  checkout:'/checkout',
  viewOrders: '/view-orders',
  verify: '/verify',
  forgotPassword: '/forgot-password',
  firebaseAction: '/firebase-action',
  orderSummary: '/order-summary',
  threeDPrinting: '/3d-printing',
  //Admin Routes
  adminOrders: '/admin/orders'
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
        <Route exact path={routes.error500} component={Error500}/>
        <PrivateRoute exact path={routes.login} component={Authenticate} page="login"/>
        <PrivateRoute exact path={routes.signUp} component={Authenticate} page="signUp"/>
        <PrivateRoute exact path={routes.home} component={Home} />
        <PrivateRoute exact path={routes.threeDPrinting} component={ThreeDPrinting} />
        <PrivateRoute exact path={routes.profile} component={Profile} shouldLogin={true}/>
        <PrivateRoute exact path={routes.checkout} component={Checkout} shouldLogin={true} />
        <PrivateRoute exact path={routes.viewOrders} component={viewOrders} shouldLogin={true} />
        <PrivateRoute exact path={routes.orderSummary} component={OrderSummary} shouldLogin={true}/>
        <PrivateRoute exact path={routes.verify} component={UserDetails} shouldLogin={true}/>
        <PrivateRoute exact path={routes.products} component={Products} />
        <PrivateRoute exact path={routes.product} component={ProductPage} />
        {/* Admin Pages */}
        <PrivateRoute exact path={routes.adminOrders} component={AdminOrders} shouldLogin={true} />
        <Redirect to={routes.error404} component={Error404} />
        <Redirect to={routes.error500} component={Error500} />
        {/* Add more ... */}
      </Switch>
    </Router>
  );
}

export default App;
