import './header.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const [ifLoggedIn, setIfLoggedIn] = useState(Boolean(localStorage.getItem("loggedIn")));

  useEffect(() => {
    setIfLoggedIn(Boolean(localStorage.getItem("loggedIn")));
  })

  return (
    <div className="header">
      <Link to="/">
        <div className="icon-div">
          <img
            className="icon"
            src="https://www.freeiconspng.com/thumbs/airplane-icon-png/plane-icon-png-images--pictures--becuo-8.png"
            alt="TravelDest"
          />
        </div>
      </Link>

      <div className="categories">
        <Link to="/flights">
          <button className="categories-button">FLIGHTS</button>
        </Link>
        <button className="categories-button">BUSES</button>
        <button className="categories-button">TRAINS</button>
        <button className="categories-button" id="longer">HOLIDAY PACKAGES</button>
      </div>

      {ifLoggedIn ? (
        <div className="btn-group" style={{ marginRight: "20px" }}>
          <Link to="/profile">
            <button type="button" className="btn btn-secondary">Hello, Traveller!</button>
          </Link>
          <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Go to Profile</a></li>
            <li><a className="dropdown-item" href="#">Your bookings</a></li>
            <li><a className="dropdown-item" href="#">Your wallet</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" onClick={() => {setIfLoggedIn(false); localStorage.clear();}}>Logout</a></li>
          </ul>
        </div>
      ) : (
        <Link to="/login">
          <div className="profile">
            <button className="btn-profile">Login or Signup</button>
          </div>
        </Link>
      )}
    </div>
  );
}

export default Header