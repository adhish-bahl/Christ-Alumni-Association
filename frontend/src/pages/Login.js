import React, { useState } from 'react'
import '../style/Login.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import CryptoJS from 'crypto-js';

function Login({ onLogin }) {

	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
    const history = useHistory(); 

	const handleSubmit = async (e) => {
		e.preventDefault();

		const encryptedPassword = CryptoJS.AES.encrypt(password, "alumni").toString();

		try {
			const response = await axios.post('http://localhost:8000/api/login', { username: userName, password: encryptedPassword });			
			
			if (response.status === 200) {
				// JWT
				localStorage.setItem('token', response.data.token);

				onLogin();
				history.push('/search');
			}

		} catch (error) {
			console.error('Login failed:', error);
			if (error.response && error.response.data) {
				alert('Login failed: ' + error.response.data);
			} else {
				alert('Login failed: An unexpected error occurred.');
			}
		}
	};

	return (
		<div className='login'>
			<form onSubmit={handleSubmit} className='loginForm'>
				<h2>Welcome Back, Admin</h2>
				<input
					type="text"
					placeholder="Username"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>

				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button type="submit" className='submitButton' style={{marginBottom:"1rem"}}>Login</button>

			<h4>Don't have an account? Click <Link to="/signup" >here</Link> to make one.</h4>
			</form>
		</div>
	)
}

export default Login
