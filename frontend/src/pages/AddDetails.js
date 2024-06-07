import React, {useState} from 'react'
import '../style/AddDetails.css'

function AddDetails() {

    const [year, setYear] = useState('');
	const [department, setDepartment] = useState('');

	const handleSubmitYear = async (e) => {
		e.preventDefault();

        if (!year) {
            alert('Year field is empty');
            return;
        }

		const response = await fetch('http://localhost:8000/api/add-year', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ year })
        });

        if (response.ok) {
            alert('Year added successfully');
            setYear('');
        } else {
            console.error('Failed to add year');
        }
	};

    const handleSubmitDepartment = async (e) => {
		e.preventDefault();

        if (!department) {
            alert('Department field is empty');
            return;
        }

		const response = await fetch('http://localhost:8000/api/add-department', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ department })
        });

        if (response.ok) {
            alert('Department added successfully');
            setDepartment('');
        } else {
            console.error('Failed to add department');
        }
	};

    return (
        <div className='details'>

            <div>
                <form onSubmit={handleSubmitYear} className='yearForm form'>
                    <h2>Add Year of Graduation</h2>
                    <input
                        type="text"
                        placeholder="Graduation Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />

                    <button type="submit" className='submitButton'>Add Year</button>

                </form>
            </div>

            <div>
                <form onSubmit={handleSubmitDepartment} className='departmentForm form'>
                    <h2>Add Department of Graduation</h2>
                    <input
                        type="text"
                        placeholder="Department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />

                    <button type="submit" className='submitButton'>Add Department</button>

                </form>
            </div>

        </div>
    )
}

export default AddDetails
