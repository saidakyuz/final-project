import { Fragment, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../../assets/white-jewel-pin.png";
//import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
//import { FaBeer } from 'react-icons/fa';

const Navigation = () => {
  const { isAuthenticated, signIn, signOut } = useContext(AuthContext);
  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/">
        <Navbar.Brand>
          <img
            src={Logo}
            //src="https://cdn1.iconfinder.com/data/icons/maps-and-navigation-11/24/jewel-style-map-gem-navigation-three-diamond-maps-gps-pin-jeweler-512.png"
            alt="LogoIcon"
            width="50px"
          />
        </Navbar.Brand>
      </Link>
      <Link to="/">
        <h4 className="text font-weight-bold">
          <strong>T[R]eMo</strong>
        </h4>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {!isAuthenticated ? (
            <Nav.Link>
              <div onClick={signIn}>Sign in with Google</div>
            </Nav.Link>
          ) : (
            <Fragment>
              <Nav.Link>
                <NavLink to="/entrancegate">
                  <h6 className="light-blue-text">Let's Go!</h6>
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <div onClick={signOut}>Sign out</div>
              </Nav.Link>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
