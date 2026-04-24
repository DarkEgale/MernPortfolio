import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import './Navbar.scss';

export const Navbar = ({ navLinks }) => {
  const [toogle, setToogle] = useState(false);

  return (
    <header className="main-header">
      {toogle && <div className="menu-overlay" onClick={() => setToogle(false)}></div>}
      
      <nav className="navbar-container">
        <div className="nav-left">
          <h2 className="logo">MD<span>SHIMUL</span></h2>
        </div>

        <div className="navLinks">
          <ul className={toogle ? 'mobile-active' : ''}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.end}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => setToogle(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-right">
          <div className="menu-trigger" onClick={() => setToogle(!toogle)}>
            {toogle ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </nav>
    </header>
  );
};