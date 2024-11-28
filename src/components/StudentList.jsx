import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStudents from '../hooks/useStudents';

//in presentation layer!

const StudentList = () => {
    //custom hook, to fetch the students
    const {students} = useStudents();
    //hook for navigation
    const navigate = useNavigate();

    //handle the studentClick
    const handleStudentClick = (id) => {
        navigate(`/student/${id}`);
    };

    return (
        <>
            <h1>
                Student List
            </h1>
            {students.length > 0 ? {
                students.map((student) => (
                    <div key = {student.id} onClick={() => handleStudentClick(student.id)}>
                    <h2>{student.full_name}</h2>
                    <p>Grade: {student.grade}</p>
                    </div>
                ))
            }

        </>
    )''
};   
