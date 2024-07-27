import { useState } from "react";
import { Link } from "react-scroll";
import logo from '../images/logo.png';


function Navbar() {
  const [nav, setNav] = useState(false);

  const changeBackground = () => {
    if(window.scrollY >= 50){
      setNav(true);
    } else {
      setNav(false);
    }
  }
  window.addEventListener('scroll', changeBackground);
  return (
      <nav className={nav ? "nav active" : "nav"}>
        <Link to='home' className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="nav-icon"></span>
        </label>
        <ul className="menu">
          <li><Link to='main' smooth={true} duration={1000}>Home</Link></li>
          <li><Link to='features' smooth={true} duration={1000}>Salles</Link></li>
          <li><Link to='offer' smooth={true} duration={1000}>Offres</Link></li>
          <li><Link to='about' smooth={true} duration={1000}>About</Link></li>
          <li><Link to='Booking' smooth={true} duration={1000}>Reservation</Link></li>
          <li><Link to='contact' smooth={true} duration={1000}>Contact</Link></li>
        </ul>
      </nav>
  );
}

export default Navbar;
