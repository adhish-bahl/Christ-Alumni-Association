import React from 'react'
import '../style/Navbar.css'
import logo from '../images/christ logo.png'
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, onLogin }) {

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogin();
    }

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
                        <li><Link to="/" className="navitems" onClick={handleLogout}>Logout</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login" className="navitems">Login</Link></li>
                    </>
                )}
            </ul>

            <div>
                {isLoggedIn ? (
                    <p className='greetings'>Hello, Admin</p>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    )
}

export default Navbar
