import React, { useState } from 'react'
import '../style/Login.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 
import CryptoJS from 'crypto-js';

function Signup() {

    const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [cnfPassword, setCnfPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory(); 

    const handleSubmit = async (e) => {
		e.preventDefault();

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setMessage('Password must be at least 8 characters long and contain at least one number and one special character.');
            return;
        }

        if(password !== cnfPassword) {
            setMessage("Password does not match!");
            return;
        }
        
        const encryptedPassword = CryptoJS.AES.encrypt(password, "alumni").toString();

		try {
			const response = await axios.post('http://localhost:8000/api/signup', { username: userName, password: encryptedPassword });			
			
			if (response.status === 200) {
				history.push('/login');
			}

		} catch (error) {
			console.error('Signup failed:', error);
			if (error.response && error.response.data) {
				alert('Signup failed: ' + error.response.data);
			} else {
				alert('Signup failed: An unexpected error occurred.');
			}
		}
	};

    return (
        <div className='login'>
            <form onSubmit={handleSubmit} className='loginForm'>
				<h2>Create your Account, Admin</h2>
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

				<input
					type="password"
					placeholder="Confirm Password"
					value={cnfPassword}
					onChange={(e) => setCnfPassword(e.target.value)}
				/>

				<label className='messageLabel'>{message}</label>

				<button type="submit" className='submitButton'>Signup</button>
			</form>
        </div>
    )
}

export default Signup
