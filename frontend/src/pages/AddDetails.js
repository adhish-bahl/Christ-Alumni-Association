import React, {useState} from 'react'
import '../style/AddDetails.css'

function AddDetails() {

    const [year, setYear] = useState('');
	const [department, setDepartment] = useState('');

	const handleSubmitYear = (e) => {
		e.preventDefault();
		// Handle login logic

		console.log("year")
	};

    const handleSubmitDepartment = (e) => {
		e.preventDefault();
		// Handle login logic

		console.log("department")
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
