import React, { useState } from 'react'
import '../style/Login.css'

function Login() {

	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle login logic

		console.log("click")
	};

	return (
		<div className='login'>
			<form onSubmit={handleSubmit} className='loginForm'>
				<h2>Welcome Back, Admin</h2>
				<input
					type="username"
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
