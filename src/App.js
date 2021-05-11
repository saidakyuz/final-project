import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Landingpage-Home/Navigation";
import Home from "./components/Landingpage-Home/Home";
import SignUp from "./components/Landingpage-Home/SignUp";
import SignIn from "./components/Landingpage-Home/SignIn";
import NotFound from "./components/Landingpage-Home/NotFound";
//import Footer from "./components/Home-Landingpage/Footer";
import ProtectedRoute from './components/Landingpage-Home/ProtectedRoute';
import EntranceGate from './components/Entrance-FindTreMos/EntranceGate';
import CreateATreMo from './components/CreateATreMo/CreateATreMo'
import TreasureChest from "./components/TreasureChest/TreasureChest";
import HelpInspirations from "./components/HelpInspirations/HelpInspirations";
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
        <ProtectedRoute exact path='/treasurechest' component={TreasureChest} />
        <ProtectedRoute exact path='/helpinspirations' component={HelpInspirations} />
        <Route path="*" component={NotFound} />
      </Switch>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
