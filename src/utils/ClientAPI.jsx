import axios from 'axios';

//json data handling
//promise based syntax
//request and response interceptors -- what are these?

//creates an axios instance - with config mentioned
//timeout and baseurl
//uses this configuration as centralised instance
//root API call will use this API
// then endpoint - /students
const apiClient = axios.create({
    baseURL : 'https://localhost:8080/api',
    timeout : 10000,
})

//timeout for a request - 10 seconds

//response interceptor - intercept and process API responses- before they reach calling code
// so this passes successful responses unchanged directly to called code (response) => {response}
// error handling - (error) => {} processes errors globally and then reject the promise
//Promise.reject(error) - calling function then handles it using try catch or catch()

//can now easily directly call- const response = apiClient.get('/students')

//add auth header later
//retry failed requests


