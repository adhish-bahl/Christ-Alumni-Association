import React, { useState } from 'react'
import '../style/Search.css'
import axios from 'axios';

function Search() {

	const [name, setName] = useState('');
	const [graduationYear, setGraduationYear] = useState('');
	const [department, setDepartment] = useState('');
	const [results, setResults] = useState([]);

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.get('http://localhost:5000/api/alumni/search', {
				params: {
					name,
					graduation_year: graduationYear,
					department,
				},
			});
			setResults(response.data);
		} catch (error) {
			console.error('Search failed', error);
		}
	};

	return (
		<div className='search'>
			<form onSubmit={handleSearch} className='searchForm'>

				<h2 className='heading'>Search Alumni</h2>

				<div>

					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					<input
						type="text"
						placeholder="Graduation Year"
						value={graduationYear}
						onChange={(e) => setGraduationYear(e.target.value)}
					/>

					<input
						type="text"
						placeholder="Department"
						value={department}
						onChange={(e) => setDepartment(e.target.value)}
					/>

					<button type="submit" className='submitButton'>Search</button>
				</div>
			</form>
			<ul>
				{results.map((alumni) => (
					<li key={alumni.id}>
						{alumni.name} - {alumni.department} - {alumni.graduation_year}
					</li>
				))}
			</ul>

		</div>
	)
}

export default Search
