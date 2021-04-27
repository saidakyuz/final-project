import { Fragment, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Navbar, Nav } from "react-bootstrap";
//import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
//import { FaBeer } from 'react-icons/fa';


const Navigation = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/">
        <Navbar.Brand>
          <img
            src="./assets/white-jewel-pin.png"
            //src="https://cdn1.iconfinder.com/data/icons/maps-and-navigation-11/24/jewel-style-map-gem-navigation-three-diamond-maps-gps-pin-jeweler-512.png"
            alt="LogoIcon"
            width="50px"
          />
        </Navbar.Brand>
      </Link>
      <Link  to="/">
      <h4 className="text font-weight-bold">
          <strong>T[R]eMo</strong>
      </h4></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {!isAuthenticated ? (
            <Fragment>
              <Nav.Link>
                <NavLink to="/sign-up"><h6 className="white-text">Register</h6></NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/sign-in"><h6 className="white-text">Login</h6></NavLink>
              </Nav.Link>
            </Fragment>
          ) : (
            <Fragment>
              <Nav.Link>
                <NavLink to="/entrancegate"><h6 className="light-blue-text">EntranceGate</h6></NavLink>
              </Nav.Link>
              <Nav.Link>
                <div onClick={logout}>Logout</div>
              </Nav.Link>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
