// this is a business logic code - reusable, modular solution
//manage fetching and state of the students

// make 2 hooks - UseStudents and UseStudent

// utitlity hooks - useAuth, usePagination, useFilterS?

import { useEffect, useState } from 'react';
import apiClient from '../utils/ClientAPI';
// importing apiClient because I would need the call from backend to fetch the data and serve it
import { useNavigate } from 'react-router-dom';

const useStudents = () =>  {
    const [students, setStudents] = useState([]);
    // initialising to empty array
    // state for storing student data
    const [isLoading, setIsLoading] = useState(true)  
    // initialising to loading is true
    const [error, setError] = useState(null);
    // initially the error would be null'
    const navigate = useNavigate();
    

    // this would be an async call - but why? - makes an api request to fetch the data
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await apiClient.get('/students');
                setStudents(response.data);
            } catch (err) {
                console.log(err.response);
                if (err.response && err.response.status === 500) {
                    {
                        setError('Authentication token failed. Please log in again.');
                        localStorage.removeItem('token'); // Clear invalid token
                        navigate('/adminlogin'); // Redirect to login page
                    }

                } else {
                    // Handle other errors
                    setError('Failed to fetch student records.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudents();
    }, [navigate]);


    //when to trigger the fetchStudents? when this hook is used in the component- which hook? useStudents
    // useEffect( ()=> {
    //     fetchStudents();
    
    // empty array - so that the fetch function runs only once?

    return {students, isLoading, error};
}

export default useStudents;