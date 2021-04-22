import { Fragment, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    <Navbar bg="light" expand="lg">
      <Link to="/">
        <Navbar.Brand>
          <img
            src="https://cdn1.iconfinder.com/data/icons/maps-and-navigation-11/24/jewel-style-map-gem-navigation-three-diamond-maps-gps-pin-jeweler-512.png"
            alt="Logo"
            width="50px"
          />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {!isAuthenticated ? (
            <Fragment>
              <Nav.Link>
                <NavLink to="/sign-up">Register</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/sign-in">Login</NavLink>
              </Nav.Link>
            </Fragment>
          ) : (
            <Fragment>
              <Nav.Link>
                <NavLink to="/entrancegate">EntranceGate</NavLink>
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
