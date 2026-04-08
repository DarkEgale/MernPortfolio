import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import './Navbar.scss';
export const Navbar = ({ navLinks }) => {
  const[toogle,setToogle]=useState(false)
  return (
    <header>
      <nav>
        <div className="nav-left">
          <h1>MD SHIMUL</h1>
        </div>
        <div className="navLinks">
          <ul className={toogle?'mobile-active':''}>
            {navLinks.map((link) => (
              <li>
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.end}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={()=>setToogle(!toogle)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-right">
            <label htmlFor="" onClick={()=>setToogle(!toogle)}>
                <Menu size={20} style={{color:'black'}}/>
            </label>
        </div>
      </nav>
    </header>
  );
};
