import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/RoleSelect.css'; // Assuming you have the updated CSS file

const RoleSelect = () => {
    const navigate = useNavigate();
    

    return (
        <div className="select-role-container">
            <h2>Select Your Role</h2>
            <p className="role-description">
                Choose a role to proceed and get redirected to the relevant dashboard.
            </p>

            <div className="role-buttons">
                {/* Admin Role Button */}
                <button 
                    className="role-button admin-button" 
                    onClick={() => navigate('/adminlogin')}
                    aria-label="Go to Admin Login"
                >
                    Admin
                </button>

                {/* Student Role Button */}
                <button 
                    className="role-button student-button" 
                    onClick={() => alert('Student Page is under construction!')}
                    aria-label="Go to Student Dashboard"
                >
                    Student
                </button>
            </div>
        </div>
    );
};

export default RoleSelect;
