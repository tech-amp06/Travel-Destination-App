import './header.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const ifLoggedIn = location.state || false;

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
        <button className="categories-button" id="longer">
          HOLIDAY PACKAGES
        </button>
      </div>

      {ifLoggedIn ? (
        <div className="profile">
          <button className="btn-profile">Hello, Traveller!</button>
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