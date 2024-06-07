import React, { useState, useEffect } from 'react'
import '../style/Search.css'
import axios from 'axios';
import Modal from 'react-modal';

function Search() {

	const [name, setName] = useState('');
	const [graduationYear, setGraduationYear] = useState('');
	const [department, setDepartment] = useState('');
	const [selectedAlumni, setSelectedAlumni] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [results, setResults] = useState([]);

	const handleSearch = async (e) => {
		e.preventDefault();

		if (name == "" && graduationYear == "" && department == "") {
			alert("All filters are empty")
			return
		}

		try {
			const response = await axios.get('http://localhost:8000/api/search', {
				params: {
					name,
					graduation_year: graduationYear,
					department,
				},
			});
			setResults(response.data);
			console.log(results)
		} catch (error) {
			console.error('Search failed', error);
		}

	};


	useEffect(() => {
		const fetchData = async () => {

			if (name == "" && graduationYear == "" && department == "") {
				// alert("All filters empty")
				setResults([])
				return
			}

			try {
				const response = await axios.get('http://localhost:8000/api/search', {
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

		fetchData();
	}, [name, graduationYear, department]);

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

				{results.length > 0 ? (
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
				) : (
					<p>No records found</p>
				)}

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
						<p><strong>Phone:</strong> {selectedAlumni.mobile}</p>
						<p><strong>Specialisation:</strong> {selectedAlumni.specialisation}</p>
						<p><strong>Curricular Activities:</strong> {selectedAlumni.extra_curricular_activities}</p>
						<p><strong>Cocurricular Activities:</strong> {selectedAlumni.co_curricular_activities}</p>
						<button onClick={closeModal} className='closeModal'>X</button>
					</div>
				)}
			</Modal>

		</div>
	)
}

export default Search
