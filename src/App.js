import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
<<<<<<< HEAD
import EntranceGate from './components/EntranceGate';
import ProtectedRoute from './components/ProtectedRoute';
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
=======
import ProtectedRoute from './components/ProtectedRoute';
import EntryGate from "./components/EntryGate";

>>>>>>> master

const App = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
<<<<<<< HEAD
        <ProtectedRoute exact path='/entrancegate' component={EntranceGate} />
=======
        <ProtectedRoute exact path='/entrygate' component={EntryGate} />
>>>>>>> master
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
