import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "" });

  const departments = ["HR", "Engineering", "Marketing"];

  const validate = () => {
    const newErrors = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;


    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.employeeId.trim())
      newErrors.employeeId = "Employee ID is required.";
    else if (formData.employeeId.length > 10)
      newErrors.employeeId = "Employee ID must not exceed 10 characters.";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!phoneRegex.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    if (!formData.department)
      newErrors.department = "Please select a department.";
    if (!formData.dateOfJoining)
      newErrors.dateOfJoining = "Date of joining is required.";
    else if (new Date(formData.dateOfJoining) > new Date())
      newErrors.dateOfJoining = "Date of joining cannot be in the future.";
    if (!formData.role.trim()) newErrors.role = "Role is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionMessage(""); // Clear previous message
  
    if (validate()) {
      try {
        const response = await fetch("http://localhost:5000/add-employee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setAlert({ show: true, message: "Form submitted successfully!" });
          setSubmissionMessage("Employee added successfully!");
          handleReset();
        } else {
          setTimeout(() => {
            setAlert({ show: false, message: "" });
          }, 3000);
          setSubmissionMessage(data.error || "Failed to add employee.");
        }
      } catch (error) {
        setSubmissionMessage("Server error. Please try again later.");
      }
    }
  };
  

  const handleReset = () => {
    setFormData({
      name: "",
      employeeId: "",
      email: "",
      phoneNumber: "",
      department: "",
      dateOfJoining: "",
      role: "",
    });
    setErrors({});
    setSubmissionMessage("");
  };

  return (
    <div className="App">
    {alert.show && <div className="alert">{alert.message}</div>}
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="First and Last Name"
            />
          </label>
          {errors.name && <small>{errors.name}</small>}
        </div>

        <div className="form-group">
          <label>
            Employee ID:
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Max 10 characters"
            />
          </label>
          {errors.employeeId && <small>{errors.employeeId}</small>}
        </div>

        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
            />
          </label>
          {errors.email && <small>{errors.email}</small>}
        </div>

        <div className="form-group">
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="10-digit number"
            />
          </label>
          {errors.phoneNumber && <small>{errors.phoneNumber}</small>}
        </div>

        <div className="form-group">
          <label>
            Department:
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </label>
          {errors.department && <small>{errors.department}</small>}
        </div>

        <div className="form-group">
          <label>
            Date of Joining:
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
            />
          </label>
          {errors.dateOfJoining && <small>{errors.dateOfJoining}</small>}
        </div>

        <div className="form-group">
          <label>
            Role:
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., Manager, Developer"
            />
          </label>
          {errors.role && <small>{errors.role}</small>}
        </div>

        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {submissionMessage && (
        <p className={submissionMessage.includes("Error") ? "error" : "success"}>
          {submissionMessage}
        </p>
      )}
    </div>
  );
};

export default App;
