import React from 'react';
import { useNavigate } from 'react-router-dom';

//basically that this is a function - with the parameters and what to do next
const RoleSelect = () => {
    const navigate = useNavigate('');

    return (
        <div>
            Select a role
        <div className = "card">
            <div className="card-body">
                Admin
            </div>
            {/* So here we are not having any event to submit - so we just use navigate hook to move to a page */}
            {/* we are giving a route here, and we will define this in the calling function - App.js*/}
            <button className='btn btn-secondary' onClick={() => navigate('/login')}>Select</button>
            
        </div>
        <div className = "card">
            <div className="card-body">
                Student
            </div>
            <button className='btn btn-secondary' onClick={() => alert("Student Page is under construction~")}>Select</button>
        </div>
        </div>
    )
};

export default RoleSelect;