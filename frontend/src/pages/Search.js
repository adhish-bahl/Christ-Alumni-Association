import React, { useState } from 'react'
import '../style/Search.css'
import axios from 'axios';
import Modal from 'react-modal';

function Search() {

	const [name, setName] = useState('');
	const [graduationYear, setGraduationYear] = useState('');
	const [department, setDepartment] = useState('');
	const [selectedAlumni, setSelectedAlumni] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const sampleResults = [
		{
			id: 1,
			name: "John Doe",
			department: "Computer Science",
			graduation_year: "2015",
			dob: "21-09-2003",
			email: "john.doeatchristuniversity.in",
			phone: "9999999999",
			specialisation: "AI",
			curricular_activities: "CR, University Rep",
			cocurricular_activities: "Signing, Football, Dancing"
		},
		{
			id: 2,
			name: "Jane Smith",
			department: "Electrical Engineering",
			graduation_year: "2016",
			dob: "21-09-2003",
			email: "john.doeatchristuniversity.in",
			phone: "9999999999",
			specialisation: "AI",
			curricular_activities: "CR, University Rep",
			cocurricular_activities: "Signing, Football, Dancing"
		},
		{
			id: 3,
			name: "Alice Johnson",
			department: "Mechanical Engineering",
			graduation_year: "2014",
			dob: "21-09-2003",
			email: "john.doeatchristuniversity.in",
			phone: "9999999999",
			specialisation: "AI",
			curricular_activities: "CR, University Rep",
			cocurricular_activities: "Signing, Football, Dancing"
		},
		{
			id: 4,
			name: "Bob Brown",
			department: "Civil Engineering",
			graduation_year: "2013",
			dob: "21-09-2003",
			email: "john.doeatchristuniversity.in",
			phone: "9999999999",
			specialisation: "AI",
			curricular_activities: "CR, University Rep",
			cocurricular_activities: "Signing, Football, Dancing"
		},
		{
			id: 5,
			name: "Emily Davis",
			department: "Chemical Engineering",
			graduation_year: "2017",
			dob: "21-09-2003",
			email: "john.doeatchristuniversity.in",
			phone: "9999999999",
			specialisation: "AI",
			curricular_activities: "CR, University Rep",
			cocurricular_activities: "Signing, Football, Dancing"
		}
	];

	// const [results, setResults] = useState([]);
	const [results, setResults] = useState(sampleResults);

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

	const handleRowClick = (alumni) => {
		setSelectedAlumni(alumni);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedAlumni(null);
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

				<table className='resultsTable'>
					<thead>
						<tr style={{ backgroundColor: "rgb(150, 173, 231)" }}>
							<th>Name</th>
							<th>Department</th>
							<th>Graduation Year</th>
						</tr>
					</thead>
					<tbody>
						{results.map((alumni) => (
							<tr key={alumni.id} onClick={() => handleRowClick(alumni)}>
								<td>{alumni.name}</td>
								<td>{alumni.department}</td>
								<td>{alumni.graduation_year}</td>
							</tr>
						))}
					</tbody>
				</table>

			</form>

			<Modal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="Alumni Details"
			>
				{selectedAlumni && (
					<div className='modalBox'>
						<h2>{selectedAlumni.name}</h2>
						<p><strong>Department:</strong> {selectedAlumni.department}</p>
						<p><strong>Graduation Year:</strong> {selectedAlumni.graduation_year}</p>
						<p><strong>Date of Birth:</strong> {selectedAlumni.dob}</p>
						<p><strong>Email:</strong> {selectedAlumni.email}</p>
						<p><strong>Phone:</strong> {selectedAlumni.phone}</p>
						<p><strong>Specialisation:</strong> {selectedAlumni.specialisation}</p>
						<p><strong>Curricular Activities:</strong> {selectedAlumni.curricular_activities}</p>
						<p><strong>Cocurricular Activities:</strong> {selectedAlumni.cocurricular_activities}</p>
						<button onClick={closeModal} className='closeModal'>X</button>
					</div>
				)}
			</Modal>

		</div>
	)
}

export default Search
