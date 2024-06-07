const mysql = require('mysql2/promise');
const { faker } = require('@faker-js/faker');

require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const departments = [
    { id: 1000, name: 'Computer Science' },
    { id: 1001, name: 'Professional Studies' },
    { id: 1002, name: 'Commerce' },
    { id: 1003, name: 'Architecture' },
    { id: 1004, name: 'English' },
    { id: 1005, name: 'Law' },
    { id: 1006, name: 'Psychology' }
];

const graduationYears = Array.from({ length: 21 }, (_, i) => 2000 + i); // 2000 to 2020

async function insertMockData() {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database');

    try {
        for (const year of graduationYears) {
            const numDepartments = year < 2010 ? 6 : 7; // Adjust the number of departments based on the year

            for (let i = 0; i < 50; i++) { // Add 50 students per year
                const name = faker.person.fullName().slice(0, 30); // Truncate to fit column length
                const dob = faker.date.past({ years: 30, refDate: new Date(2000, 0, 1) }).toISOString().split('T')[0];
                const email = faker.internet.email().slice(0, 40); // Truncate to fit column length
                const mobile = faker.helpers.replaceSymbols('##########');
                const department = departments[Math.floor(Math.random() * numDepartments)];
                const specialisation = faker.lorem.word().slice(0, 50); // Truncate to fit column length
                const extra_curricular = faker.lorem.sentence().slice(0, 255); // Truncate to fit column length
                const co_curricular = faker.lorem.sentence().slice(0, 255); // Truncate to fit column length

                const [graduationYearRows] = await connection.query('SELECT id FROM g_year WHERE year = ?', [year]);
                const graduation_year_id = graduationYearRows[0].id;

                const [departmentRows] = await connection.query('SELECT id FROM department WHERE department = ?', [department.name]);
                const department_id = departmentRows[0].id;

                await connection.query(
                    'INSERT INTO alumni (name, dob, email, mobile, department_id, graduation_year_id, specialisation, extra_curricular_activities, co_curricular_activities) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [name, dob, email, mobile, department_id, graduation_year_id, specialisation, extra_curricular, co_curricular]
                );
            }

            console.log(`Inserted 50 alumni for graduation year ${year}`);
        }
    } catch (error) {
        console.error('Error inserting mock data:', error);
    } finally {
        await connection.end();
    }
}

insertMockData();
