import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStudents from '../hooks/useStudents';
// for url parameters
import axios from 'axios';
import '../assets/StudentDetails.css';


const StudentDetails = () => {
     const { email } = useParams();
     //email from the url
     const [student, setStudent] = useState(null);
     //initially the student is null
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState('');
     const [isEditing, setIsEditing] = useState(false);


     useEffect(() => {
        axios
          .get(`http://localhost:8080/api/v1/students/${email}`)
          .then((response) => {
            setStudent(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            setError('Error fetching student data');
            setIsLoading(false);
          });
      }, [email]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
          ...prevStudent,
          [name]: value,
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .put(`http://localhost:8080/api/v1/students/${email}`, student)
          .then((response) => {
            alert('Student details updated successfully');
            setIsEditing(false);
          })
          .catch((error) => {
            setError('Error updating student data');
          });
      };

      if (isLoading) return <p>Loading student details...</p>;

      if (error) return <p>{error}</p>;
    
      if (!student) return <p>No student data available</p>;

      
  return (
    <div className="student-details-container">
      <h1>Student Details</h1>
      <form onSubmit={handleSubmit}>
        {/* Roll Number (non-editable) */}
        <div className="form-group">
          <label>Roll Number:</label>
          <input
            type="text"
            name="rollNumber"
            value={student.rollNumber}
            onChange={handleChange}
            disabled
          />
        </div>
        {/* First Name */}
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={student.firstName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        {/* Last Name */}
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={student.lastName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        {/* Add more fields as necessary */}
        {/* Buttons */}
        {isEditing ? (
          <>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit Details
          </button>
        )}
      </form>
    </div>
  );
};

export default StudentDetails;