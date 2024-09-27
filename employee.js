const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB connection URL
const url = "mongodb+srv://sharika:sharika04@cluster0.d7vbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'companyDB';
const client = new MongoClient(url);

// Define a function to connect to MongoDB and insert multiple employees
async function insertEmployees() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const employees = db.collection('employees');
        
        // Define multiple employee documents
        const employeeList = [
            {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                department: "Engineering",
                position: "Software Engineer",
                salary: 85000,
                hireDate: new Date('2023-01-15'),
                isActive: true
            },
            {
                firstName: "Jane",
                lastName: "Smith",
                email: "jane.smith@example.com",
                phone: "987-654-3210",
                department: "Marketing",
                position: "Marketing Specialist",
                salary: 65000,
                hireDate: new Date('2022-07-10'),
                isActive: true
            },
            {
                firstName: "Emma",
                lastName: "Johnson",
                email: "emma.johnson@example.com",
                phone: "555-789-1234",
                department: "Human Resources",
                position: "HR Manager",
                salary: 90000,
                hireDate: new Date('2021-03-05'),
                isActive: false
            },
            {
                firstName: "James",
                lastName: "Williams",
                email: "james.williams@example.com",
                phone: "555-654-3210",
                department: "Engineering",
                position: "DevOps Engineer",
                salary: 95000,
                hireDate: new Date('2020-10-12'),
                isActive: true
            }
        ];

        // Insert multiple employee documents into MongoDB
        const result = await employees.insertMany(employeeList);
        console.log(`${result.insertedCount} employees inserted successfully.`);
        
    } catch (error) {
        console.error('Error inserting employees:', error);
    } finally {
        await client.close();
    }
}

// Call insertEmployees() to populate the MongoDB database
insertEmployees().catch(console.dir);

// Define a function to fetch employees
async function getEmployees() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const employees = db.collection('employees');
        
        // Fetch all employees
        const allEmployees = await employees.find({}).toArray();
        return allEmployees;

    } catch (error) {
        console.error('Error fetching employees:', error);
        return [];
    }
}

// Set up a route to display employees on the webpage in a table
app.get('/', async (req, res) => {
    const employees = await getEmployees();

    // Create HTML to display employee data in a table
    let html = `
        <h1>Employee List</h1>
        <table border="1" cellpadding="10" cellspacing="0">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Hire Date</th>
                    <th>Active Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Loop through employees and populate the table rows
    employees.forEach(emp => {
        html += `
            <tr>
                <td>${emp.firstName}</td>
                <td>${emp.lastName}</td>
                <td>${emp.email}</td>
                <td>${emp.phone}</td>
                <td>${emp.department}</td>
                <td>${emp.position}</td>
                <td>${emp.salary}</td>
                <td>${new Date(emp.hireDate).toLocaleDateString()}</td>
                <td>${emp.isActive ? 'Active' : 'Inactive'}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    // Send the HTML as the response
    res.send(html);
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
