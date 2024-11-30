import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../utils/ClientAPI';
import useEducation from '../hooks/useEducation.jsx';
import '../assets/StudentDetails.css';


const StudentDetails = () => {
    const { email } = useParams(); // Get email from URL parameters
    const [student, setStudent] = useState(null); // Initial state for student data
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state for error handling
    const [isEditing, setIsEditing] = useState(false); // Editing state
    const [domains, setDomains] = useState([]); // Domains dropdown data
    const [specialisations, setSpecialisations] = useState([]); // Specialisations dropdown data
    const [placements, setPlacements] = useState([]); // Placements dropdown data
    const [errors, setErrors] = useState({}); // Errors object for form validation
    const [isEditingPhoto, setIsEditingPhoto] = useState(false);
    
    const initialEducationList = useMemo(() => student?.education_list || [], [student]);
    // Custom hook to handle education data
   
    const navigate = useNavigate();
    const {
        educationList,
        educationForm,
        error: educationError,
        handleEducationChange,
        handleAddEducation,
        handleRemoveEducation,
    } = useEducation(initialEducationList);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const filePath = URL.createObjectURL(file); // Get the absolute path
                setStudent((prevStudent) => ({
                    ...prevStudent,
                    photographPath: filePath, // Store the full path as a string
                }));
            } else {
                alert('Please select a valid image file.');
            }
        }
      };

    // Fetch student data and related dropdowns (domains, specialisations, placements)
    useEffect(() => {
        const fetchStudentAndDomains = async () => {
            try {
                // Fetch all data in parallel
                const [studentResponse, domainsResponse, specialisationResponse, placementResponse] = await Promise.all([
                    apiClient.get(`/students/${email}`),
                    apiClient.get('/domains'),
                    apiClient.get('/specialisations'),
                    apiClient.get('/placements')
                ]);

                // Set the fetched data into state
                setStudent(studentResponse.data);
                setDomains(domainsResponse.data);
                setSpecialisations(specialisationResponse.data);
                setPlacements(placementResponse.data);
                setIsLoading(false);
            } catch (error) {
                
                console.log(error);
                setError('Error fetching student or domain data');
                setIsLoading(false);
                navigate('/adminlogin');
                
            }
        };

        fetchStudentAndDomains();
    }, [email]);

    // Handle changes in student input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));

        // Validate CGPA field to ensure it's between 0 and 10
        if (name === 'cgpa') {
            const cgpaValue = parseFloat(value);
            if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    cgpa: 'CGPA must be between 0 and 10',
                }));
            } else {
                setErrors((prevErrors) => {
                    const { cgpa, ...rest } = prevErrors;
                    return rest;
                });
            }
        }
    };

    // Handle form submission to save the updated student details
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Include updated educationList in the student payload
            const updatedStudent = { ...student, education_list: educationList };
            
            console.log('updates is :' ,updatedStudent);
            console.log('Payload being sent:', JSON.stringify(updatedStudent, null, 2));

            await apiClient.put(`http://localhost:8080/api/v1/students/update`, updatedStudent);
            alert('Student details updated successfully');
            setIsEditing(false);
        } catch (error) {
            window.location.reload();
            console.log(error);
            setError('Error updating student data');
        }
    };

    // Handle file upload for student photograph
    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         if (file.type.startsWith('image/')) {
    //             const reader = new FileReader();
    //             console.log(file.name)
    //             console.log(file)
    //             reader.onloadend = () => {
    //                 setStudent((prevStudent) => ({
    //                     ...prevStudent,
    //                     photographPath: file.name,
    //                     photographPreview: reader.result
    //                 }));
    //             };
    //             reader.readAsDataURL(file);
    //         } else { 
    //             alert('Please select an image file!');
    //         }
    //     }
    // };

    // Show loading spinner or error message while data is being fetched
    if (isLoading) return <p>Loading student details...</p>;
    if (error) return <p>{error}</p>;
    if (!student) return <p>No student data available</p>;

    return (
        <div className="student-details-container">
        <h1>Student Details</h1>
        
        {/* Student Photo Preview and Upload */}
        {/* <div className="student-photo-container">
    {student.photographPath ? (
        <div className="student-photo-wrapper" onClick={() => isEditing && document.getElementById('photographUpload').click()}>
            <img
                src={student.photographPath}
                alt="Student Photo"
                className="student-photo"
            />
        </div>
    ) : (
        <div
            className="photo-placeholder"
            onClick={() => isEditing && document.getElementById('photographUpload').click()}
        >
            No Photo
        </div>
    )}

    {isEditing && (
        <input
            type="file"
            id="photographUpload"
            name="photograph"
            style={{ display: 'none' }} // Hidden file input
            onChange={handlePhotoChange}
        />
    )}
</div> */}

{student.photographPath && (
  <div className="form-group">
    <label>Photograph Preview:</label>
    <div className="student-photo-wrapper" onClick={() => isEditing && document.getElementById('photographUpload').click()}>
    <img
      src={student.photographPath}
      alt="Photograph Preview"
      style={{ width: '200px', height: 'auto' }}
    />
    </div>
  </div>
)}
  {/* Photograph Path */}
  <div className="form-group">
    <label>Photograph:</label>
    <input
      type="file"
      name="photograph"
      onChange={handleFileChange}
      disabled={!isEditing}
    />
  </div>

    
        <form onSubmit={handleSubmit}>
            {/* Roll Number */}
            <div className="form-group">
                <label>Roll Number:</label>
                <input
                    type="text"
                    name="rollNumber"
                    value={student.rollNumber}
                    disabled
                />
            </div>
    
            {/* Email */}
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={student.email}
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
    
            {/* CGPA */}
            <div className="form-group">
                <label>CGPA:</label>
                <input
                    type="number"
                    step="0.01"
                    name="cgpa"
                    value={student.cgpa}
                    onChange={handleChange}
                    disabled={!isEditing}
                    min="0"
                    max="10"
                />
                {errors.cgpa && <p className="error">{errors.cgpa}</p>}
            </div>
    
            {/* Total Credits */}
            <div className="form-group">
                <label>Total Credits:</label>
                <input
                    type="number"
                    name="totalCredits"
                    value={student.totalCredits}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>
    
            {/* Graduation Year */}
            <div className="form-group">
                <label>Graduation Year:</label>
                <input
                    type="text"
                    name="graduationYear"
                    value={student.graduationYear}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>
    
            {/* Domain Dropdown */}
            <div className="form-group-dropdown form-group">
                <label>Domain:</label>
                <select
                    value={student.domain?.domain_id || ''}
                    onChange={(e) => {
                        const domainId = e.target.value;
                        const selectedDomain = domains.find(domain => domain.domain_id === parseInt(domainId));
                        setStudent({ ...student, domain: selectedDomain || null });
                    }}
                    disabled={!isEditing}
                >
                    <option value="">Select a domain</option>
                    {domains.map(domain => (
                        <option key={domain.domain_id} value={domain.domain_id}>
                            {domain.program} - {domain.batch}
                        </option>
                    ))}
                </select>
            </div>
    
            {/* Specialisation Dropdown */}
            <div className="form-group-dropdown form-group">
                <label>Specialisation:</label>
                <select
                    value={student.specialisation?.specialisation_id || ''}
                    onChange={(e) => {
                        const specialisationId = e.target.value;
                        const selectedSpecialisation = specialisations.find(
                            (specialisation) => specialisation.specialisation_id === parseInt(specialisationId)
                        );
                        setStudent({ ...student, specialisation: selectedSpecialisation || null });
                    }}
                    disabled={!isEditing}
                >
                    <option value="">Select a specialisation</option>
                    {specialisations.map((specialisation) => (
                        <option key={specialisation.specialisation_id} value={specialisation.specialisation_id}>
                            {specialisation.name} - {specialisation.description}
                        </option>
                    ))}
                </select>
            </div>
    
            {/* Placement Dropdown */}
            <div className="form-group-dropdown form-group">
                <label>Placement:</label>
                <select
                    value={student.placement_id?.id || ''}
                    onChange={(e) => {
                        const placementId = e.target.value;
                        const selectedPlacement = placements.find(
                            (placement) => placement.id === parseInt(placementId)
                        );
                        setStudent({ ...student, placement_id: selectedPlacement || null });
                    }}
                    disabled={!isEditing}
                >
                    <option value="">Select placement</option>
                    {placements.map((placement) => (
                        <option key={placement.id} value={placement.id}>
                            {placement.organisation} - {placement.profile}
                        </option>
                    ))}
                </select>
            </div>
    
            {/* Education List Table */}
            <div>
      <h3>Education History</h3>
      <table className="education-table">
        <thead>
          <tr>
            <th>Education Type</th>
            <th>Percentage</th>
            <th>Year</th>
            <th>School Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {educationList.map((education, index) => (
            <tr key={index}>
              <td>{education.educationType}</td>
              <td>{education.percentage}</td>
              <td>{education.year}</td>
              <td>{education.schoolName}</td>
              <td>
                <button type="button" onClick={() => handleRemoveEducation(index)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div>
          <h4>Add/Edit Education</h4>
          <div>
            <label>Education Type:</label>
            <input
              type="text"
              name="educationType"
              value={educationForm.educationType}
              onChange={handleEducationChange}
            />
          </div>
          <div>
            <label>Percentage:</label>
            <input
              type="text"
              name="percentage"
              value={educationForm.percentage}
              onChange={handleEducationChange}
            />
          </div>
          <div>
            <label>Year:</label>
            <input
              type="text"
              name="year"
              value={educationForm.year}
              onChange={handleEducationChange}
            />
          </div>
          <div>
            <label>School Name:</label>
            <input
              type="text"
              name="schoolName"
              value={educationForm.schoolName}
              onChange={handleEducationChange}
            />
          </div>
          <button type="button" onClick={handleAddEducation}>
            Add Education
          </button>
          {educationError && <p className="error">{educationError}</p>}
        </div>
      )}
    </div>
    
            {/* Submit and Cancel Buttons */}
            {isEditing ? (
                <>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <button type="button" onClick={() => setIsEditing(true)}>Edit Details</button>
            )}
        </form>
    </div>
    


    
    );
};

export default StudentDetails;
