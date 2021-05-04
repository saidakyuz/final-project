import { useState, useEffect, Fragment } from "react";
import "../../App.css";

const Sidebar = ({ width, height, children }) => {
  const [xPosition, setX] = useState(width);
  const [display, setDisplay] = useState(false);

  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setDisplay(false);
    } else {
      setX(width);
      setDisplay(true);
    }
  };

  useEffect(() => {
    setX(0);
  }, []);

  return (
    <Fragment>
      <button
        onClick={() => toggleMenu()}
        className="toggle-menu"
        style={{
          transformOrigin: "left",
          transform: `translatex(-${xPosition}px)`,
        }}
      ></button>
      <div
        className="side-bar"
        style={{
          display: `${display ? "block" : "none"}`,
          minHeight: height,
        }}
      >
        <div className="content">{children}</div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
