import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../style/Register.css'

function Register() {

	const [formData, setFormData] = useState({
		name: '',
		dob: '',
		email: '',
		mobile: '',
		department: '',
		graduation_year: '',
		specialisation: '',
		extra_curricular: '',
		co_curricular: '',
	});

	const [departments, setDepartments] = useState([]);
	const [graduationYears, setGraduationYears] = useState([]);

	useEffect(() => {
		// Fetch departments
		const fetchDepartments = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/department');
				setDepartments(response.data);
			} catch (error) {
				console.error('Error fetching departments', error);
			}
		};

		// Fetch graduation years
		const fetchGraduationYears = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/graduation-year');
				setGraduationYears(response.data);
			} catch (error) {
				console.error('Error fetching graduation years', error);
			}
		};

		fetchGraduationYears();
		fetchDepartments();
	}, []);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:5000/api/alumni/register', formData);
			alert('Registration successful');
		} catch (error) {
			console.error('Registration failed', error);
		}
	};

	return (
		<div className='register'>

			<form onSubmit={handleSubmit} className='registerForm'>

				<h2 className='heading'>Give your details to Register as Alumni</h2>

				<input
					type="text"
					name="name"
					placeholder="Name"
					value={formData.name}
					onChange={handleChange}
					required
				/>

				<input
					type="date"
					name="dob"
					placeholder="Date of Birth"
					value={formData.dob}
					onChange={handleChange}
				/>

				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>

				<input
					type="tel"
					name="mobile"
					placeholder="Mobile"
					value={formData.mobile}
					onChange={handleChange}
				/>

				<select
					name="department"
					value={formData.department}
					onChange={handleChange}
					required
				>
					<option value="" disabled>Select Department</option>
					{departments.map((department) => (
						<option key={department.id} value={department.department}>
							{department.department}
						</option>
					))}
				</select>

				<select
					name="graduation_year"
					value={formData.graduation_year}
					onChange={handleChange}
					required
				>
					<option value="" disabled>Select Graduation Year</option>
					{graduationYears.map((year) => (
						<option key={year.id} value={year.year}>
							{year.year}
						</option>
					))}
				</select>

				<input
					type="text"
					name="specialisation"
					placeholder="Specialisation"
					value={formData.specialisation}
					onChange={handleChange}
				/>

				<textarea
					name="extra_curricular"
					placeholder="Extra Curricular Activities"
					value={formData.extra_curricular}
					onChange={handleChange}
				/>

				<textarea
					name="co_curricular"
					placeholder="Co-Curricular Activities"
					value={formData.co_curricular}
					onChange={handleChange}
				/>

				<button type="submit" className='submitButton'>Register</button>
			</form>
		</div>
	)
}

export default Register
