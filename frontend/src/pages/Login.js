import React, { useState, useContext } from 'react'
import '../style/Login.css'
import axios from 'axios';

function Login() {

	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('http://localhost:8000/api/login', { username: userName, password });

			if (response.status === 200) {
				window.location.href = '/search';
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

				<button type="submit" className='submitButton'>Login</button>

			</form>
		</div>
	)
}

export default Login
