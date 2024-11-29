import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStudents from '../hooks/useStudents';
// for url parameters
import axios from 'axios';
import '../assets/StudentDetails.css';
import apiClient from '../utils/ClientAPI';


const StudentDetails = () => {
     const { email } = useParams();
     //email from the url
     const [student, setStudent] = useState(null);
     //initially the student is null
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState('');
     const [isEditing, setIsEditing] = useState(false);

     //to fetch the domains 
     const [domains, setDomains] = useState([]);
     // initial no domain is there
     const [ specialisations, setSpecialisations] = useState([]);

     const [ placements, setPlacements ] = useState([]);

     const [errors, setErrors] = useState({});

     useEffect(() => {
        const fetchStudentAndDomains = async () => {
            try {
                // Fetch both student and domain data in parallel
                const [studentResponse, domainsResponse, specialisationResponse, placementResponse] = await Promise.all([
                    apiClient.get(`/students/${email}`), // Fetch student data
                    apiClient.get('/domains'),          // Fetch domain list
                    apiClient.get('/specialisations'),
                    apiClient.get('/placements')
                ]);
    
                // Set the responses to their respective states
                setStudent(studentResponse.data);       // Set student details
                setDomains(domainsResponse.data);  
                setSpecialisations(specialisationResponse.data);
                setPlacements(placementResponse.data);     // Set domain list
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching student or domain data');
                setIsLoading(false);
            }
        };
    
        fetchStudentAndDomains();
    }, [email]);


    const handleChange = (e) => {
        const { name, value } = e.target;
      
        // Update the student state
        setStudent((prevStudent) => ({
          ...prevStudent,
          [name]: value,
        }));
      
        // Validation for CGPA
        if (name === 'cgpa') {
          const cgpaValue = parseFloat(value);
          if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              cgpa: 'CGPA must be between 0 and 10',
            }));
          } else {
            // Remove CGPA error if it exists
            setErrors((prevErrors) => {
              const { cgpa, ...rest } = prevErrors;
              return rest;
            });
          }
        }
      };
      


      const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .put(`http://localhost:8080/api/v1/students/update`, student)
          .then((response) => {
            alert('Student details updated successfully');
            setIsEditing(false);
          })
          .catch((error) => {
            setError('Error updating student data');
          })};

    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            if(file.type.startsWith('image/')){
                const reader = new FileReader();
                reader.onloadend = () => {
        
                setStudent((prevStudent) => (
                {
                    ...prevStudent,
                    photographPath: file.name,
                    photographPreview: reader.result
                }
                ));};
                reader.readAsDataURL(file);
            }else{
                alert('please select an image file!')
            }
        }
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

        {student.photographPreview && (
  <div className="form-group">
    <label>Photograph Preview:</label>
    <img
      src={student.photographPreview}
      alt="Photograph Preview"
      style={{ width: '200px', height: 'auto' }}
    />
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

  {/* CGPA */}
  {/* <div className="form-group">
    <label>CGPA:</label>
    <input
      type="number"
      step="0.01"
      name="cgpa"
      value={student.cgpa}
      onChange={handleChange}
      disabled={!isEditing}
    />
  </div> */}

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
  <div className='form-group-dropdown form-group'>
  <label>Domain:</label>
            <select value={student.domain?.domain_id || ''}
                onChange={(e) => {
                    const domainId = e.target.value;
                    const selectedDomain = domains.find(domain => domain.domain_id === parseInt(domainId));
                    setStudent({ ...student, domain: selectedDomain || null });
                }}
                disabled={!isEditing} // Disable dropdown when not editing
                >
                <option value="">Select a domain</option>
                {domains.map(domain => (
                    <option key={domain.domain_id} value={domain.domain_id}>
                        {domain.program} - {domain.batch}
                    </option>
                ))}
            </select>
    </div>

    

    <div className="form-group-dropdown form-group">
    <label>Specialisation:</label>
    <select
        value={student.specialisation?.specialisation_id || ''} // Specialisation ID as the selected value
        onChange={(e) => {
            const specialisationId = e.target.value;
            const selectedSpecialisation = specialisations.find(
                (specialisation) => specialisation.specialisation_id === parseInt(specialisationId)
            );
            setStudent({ ...student, specialisation: selectedSpecialisation || null });
        }}
        disabled={!isEditing} // Disable dropdown when not in edit mode
    >
        <option value="">Select a specialisation</option>
        {specialisations.map((specialisation) => (
            <option key={specialisation.specialisation_id} value={specialisation.specialisation_id}>
                {specialisation.name} - {specialisation.description}
            </option>
        ))}
    </select>
</div>

<div className="form-group-dropdown form-group">
    <label>Placement:</label>
    <select
        value={student.placement_id?.id || ''} // Placement ID as the selected value
        onChange={(e) => {
            const placementId = e.target.value;
            const selectedPlacement = placements.find(
                (placement) => placement.id === parseInt(placementId)
            );
            setStudent({ ...student, placement_id: selectedPlacement || null });
        }}
        disabled={!isEditing} // Disable dropdown when not in edit mode
    >
        <option value="">Select placement id</option>
        {placements.map((placement) => (
            <option key={placement.id} value={placement.id}>
                {placement.organisation} - {placement.profile}
            </option>
        ))}
    </select>
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