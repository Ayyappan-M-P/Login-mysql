const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "123456", // Replace with your MySQL password
  database: "EmployeeManagement",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

// Add Employee Endpoint
app.post("/add-employee", (req, res) => {
  const { name, employeeId, email, phoneNumber, department, dateOfJoining, role } = req.body;

  // Validate required fields
  if (!name || !employeeId || !email || !phoneNumber || !department || !dateOfJoining || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    INSERT INTO Employees (name, employee_id, email, phone_number, department, date_of_joining, role)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [name, employeeId, email, phoneNumber, department, dateOfJoining, role];

  db.query(sql, values, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Employee ID or Email already exists" });
      }
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Employee added successfully", employeeId: result.insertId });
  });
});

// Get Employees Endpoint (Optional)
app.get("/employees", (req, res) => {
  const sql = "SELECT * FROM Employees";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
