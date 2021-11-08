import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import IdToken from './pages/idToken';
import Home from './pages/Home';
import Product from './pages/Product';
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Authenticate from './pages/Authenticate';
import emailVerified from "./pages/emailVerified";
import viewOrders from './pages/viewOrders';
import PrivateRoute from "./PrivateRoute";
import 'bootstrap/scss/bootstrap.scss'
import './custom-bootstrap.scss';
import './App.scss';

import { initializeApp } from "firebase/app";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";



// Firebase Config
const firebaseConfig = {
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
  idToken: '/idToken',
  profile: '/profile',
  product: '/product',
  products: '/products',
  profile: '/profile',
  emailVerified: '/email-verified',
  checkout:'/checkout',
  viewOrders: '/viewOrders',
<<<<<<< HEAD

=======
  ordersummary: '/ordersummary',
>>>>>>> 7a069cbe7a3f67c49beea3411db0d47701342295
}

function App() {
  // Init Firebase
  initializeApp(firebaseConfig);

  return (
    <Router>
      <Switch>
        <Route exact path={routes.idToken} component={IdToken}/>
        <Route exact path={routes.emailVerified} component={emailVerified}/>
        <PrivateRoute exact path={routes.login} component={Authenticate} page="login"/>
        <PrivateRoute exact path={routes.signUp} component={Authenticate} page="signUp"/>
        <PrivateRoute exact path={routes.home} component={Home} />
        <PrivateRoute exact path={routes.product} component={Product} />
        <PrivateRoute exact path={routes.products} component={Products} />
        <PrivateRoute exact path={routes.profile} component={Profile} />
        <PrivateRoute exact path={routes.checkout} component={Checkout} />
        <PrivateRoute exact path={routes.viewOrders} component={viewOrders} />
        <PrivateRoute exact path={routes.ordersummary} component={OrderSummary} />
        {/* Add more ... */}
      </Switch>
    </Router>
  );
}

export default App;
