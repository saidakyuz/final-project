import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Landingpage-Home/Navigation";
import Home from "./components/Landingpage-Home/Home";
import SignUp from "./components/Landingpage-Home/SignUp";
import SignIn from "./components/Landingpage-Home/SignIn";
import NotFound from "./components/Landingpage-Home/NotFound";
//import Footer from "./components/Home-Landingpage/Footer";
import EntranceGate from './components/Entrance-FindTreMos/EntranceGate';
import ProtectedRoute from './components/Landingpage-Home/ProtectedRoute';
import CreateATreMo from './components/CreateATreMo/CreateATreMo'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/cyborg/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        <ProtectedRoute exact path='/entrancegate' component={EntranceGate} />
        <ProtectedRoute exact path='/createatremo' component={CreateATreMo} />
        <Route path="*" component={NotFound} />
      </Switch>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
