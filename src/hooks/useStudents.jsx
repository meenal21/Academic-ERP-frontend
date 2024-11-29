// this is a business logic code - reusable, modular solution
//manage fetching and state of the students

// make 2 hooks - UseStudents and UseStudent

// utitlity hooks - useAuth, usePagination, useFilterS?

import { useEffect, useState } from 'react';
import apiClient from '../utils/ClientAPI';
// importing apiClient because I would need the call from backend to fetch the data and serve it

const useStudents = () =>  {
    const [students, setStudents] = useState([]);
    // initialising to empty array
    // state for storing student data
    const [isLoading, setIsLoading] = useState(true)  
    // initialising to loading is true
    const [error, setError] = useState(null);
    // initially the error would be null'
    

    // this would be an async call - but why? - makes an api request to fetch the data
    const fetchStudents = async () => {
        //in try block - if error thrown from the get - we can catch here
        try{
            const response = await apiClient.get('/students');
            setStudents(response.data);
            console.log(response.data);
        }
        catch(err){
            setError("Failed to fetch records");
        }
        // stop the loading once the response is in our hands
        finally{
            setIsLoading(false);
        }
    };

    //when to trigger the fetchStudents? when this hook is used in the component- which hook? useStudents
    useEffect( ()=> {
        fetchStudents();
    }, []);
    // empty array - so that the fetch function runs only once?

    return {students, isLoading, error};
}

export default useStudents;