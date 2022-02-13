import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';


import './NavLinks.css';

const NavLinks = () => {
  const auth = useContext(AuthContext);
  
  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
        <li> <NavLink to={`/${auth.userId}/flights`}>MY FLIGHTS</NavLink></li>
      )}
      {(auth.isLoggedIn && (auth.role=== "admin" || auth.role=== "sales" ) ) && (
        <li> <NavLink to="/flight/new">ADD FLIGHT</NavLink></li>
      )}
      {auth.isLoggedIn && (
        <li> <NavLink to="/news/new"> NEWS
        </NavLink></li>
      )}
      {(auth.isLoggedIn &&  (auth.role=== "admin" || auth.role=== "sales" ) ) && (
        <li> <NavLink to="/note">ADD NOTE</NavLink></li>
      )}
      {(auth.isLoggedIn && (auth.role=== "admin" || auth.role=== "sales" ) ) && (
        <li> <NavLink to="/gendec">GEN DEC</NavLink></li>
      )}
      {auth.isLoggedIn && (
        <li> <NavLink to="/aircraft">AIRCRAFT</NavLink></li>
      )}
      {auth.isLoggedIn && (
        <li> <NavLink to={`/${auth.userId}/crew`}>CREW</NavLink></li>
      )}

      {(auth.isLoggedIn && (auth.role=== "admin" || auth.role=== "sales" ) ) && (
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            ADD
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li> <NavLink to="/crew/new">ADD CREW</NavLink></li>
            <li> <NavLink to="/caas/new">ADD CAA</NavLink></li>
            <li> <NavLink to="/broker">ADD BROKER</NavLink></li>
            <li> <NavLink to="/airport/new">ADD AIRPORT</NavLink></li>
            <li> <NavLink to="/auth/new">ADD USER</NavLink></li>
          </div>
        </div>
      )}
      {!auth.isLoggedIn && (
        <li  > <NavLink to="/auth"  >AUTHENTICATE</NavLink></li>
      )}
      {auth.isLoggedIn && (
        <li id="logIn">
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );

};

export default NavLinks;