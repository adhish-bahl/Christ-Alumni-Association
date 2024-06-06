import React from 'react'
import '../style/Navbar.css'
import logo from '../images/christ logo.png'
import { Link } from 'react-router-dom';

function Navbar() {
    const isLoggedIn = false;

    return (
        <div className='navbar'>
            <img src={logo} alt="Christ Logo" className='logo' />
            <ul className='list'>
                <li><Link to="/" className="navitems">Home</Link></li>
                <li><Link to="/about" className="navitems">About</Link></li>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/search" className="navitems">Search Alumni</Link></li>
                        <li><Link to="/register" className="navitems">Add Alumni</Link></li>
                        <li><Link to="/addDetails" className="navitems">Add Year/Department</Link></li>
                        <li><Link to="/logout" className="navitems">Logout</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login" className="navitems">Login</Link></li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default Navbar
