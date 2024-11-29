import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStudents from '../hooks/useStudents';
import './StudentList.css'; 
//in presentation layer!

const StudentList = () => {
    //custom hook, to fetch the students
    const {students, isLoading, error} = useStudents();

    const navigate = useNavigate();
    // Handle the student click
    const handleStudentClick = (id) => {
        navigate(`/student/${id}`);
    };


    if (isLoading) return (<p>Loading Students...</p>);

    if(error) return <p>{error} encountered!</p>;

    //hook for navigation

    //lets put navigation on hold for now, since we just want to display the static list of students here!
    /*
    const navigate = useNavigate();

    //handle the studentClick
    const handleStudentClick = (id) => {
        navigate(`/student/${id}`);
    };
    */
   
    /* check is the students list has students*/
    /* for now not using the clicking handling part!*/
    return (
        <>
            <h1>
                Student List
            </h1>
            {students.length > 0 ? (
            <table table striped bordered >
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
              </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr 
                        key={student._email}
                        onClick={() => handleStudentClick(student.email)}
                    >
                        <td>{student.rollNumber}</td>
                        <td>{student.firstName} {student.lastName}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            )
            : (
                <p className="no-students">No Students available</p>
            )}
            
        </>
    );
};   

export default StudentList;
