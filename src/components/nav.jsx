import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse } from "react-bootstrap";
function Nav() {
  //for colapsing menu on small screens
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid  container-xxl">
        <a className="navbar-brand" href="#">
          VSC
        </a>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          id="toggle-button"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Collapse in={open}>
          <div className="navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Newsy
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="new-post" className="nav-link">
                  Dodaj news
                </NavLink>
              </li>
            </ul>
          </div>
        </Collapse>
      </div>
    </nav>
  );
}

export default Nav;
