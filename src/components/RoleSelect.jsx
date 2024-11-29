import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets//RoleSelect.css'

//basically that this is a function - with the parameters and what to do next
const RoleSelect = () => {
    const navigate = useNavigate('');

    return (
        <div className="select-role-container">
      <h2>Select a Role</h2>
      <div className="cards">
        <div className="card" onClick={() => navigate('/adminlogin')}>
          <div className="card-content">
            <div className="card-icon admin-icon"></div>
            <h3>Admin</h3>
          </div>
        </div>
        <div className="card" onClick={() => alert('Student Page is under construction!')}>
          <div className="card-content">
            <div className="card-icon student-icon"></div>
            <h3>Student</h3>
          </div>
        </div>
      </div>
    </div>
    )
};

export default RoleSelect;