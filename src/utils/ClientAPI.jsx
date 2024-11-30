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
    baseURL : 'http://localhost:8080/api/v1',
    timeout : 10000,
})

//timeout for a request - 10 seconds

//intercept all the requests 
apiClient.interceptors.request.use(
    (config) => {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        if (token) {
            // If token exists, include it in the Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle the error
        if (error.response && error.response.status === 500 ) {
            // If the token is invalid or expired
            const message = error.response.data?.message || '';
            if (message.includes('JWT expired')) {
                console.error(error);   
                alert('Session expired. Please log in again.');
                localStorage.removeItem('token'); // Clear the expired token
                window.location.href = '/login'; // Redirect to login page
            }
        }
        return Promise.reject(error); // Propagate other errors
    }
);
//response interceptor - intercept and process API responses- before they reach calling code
// so this passes successful responses unchanged directly to called code (response) => {response}
// error handling - (error) => {} processes errors globally and then reject the promise
//Promise.reject(error) - calling function then handles it using try catch or catch()

//can now easily directly call- const response = apiClient.get('/students')

//add auth header later
//retry failed requests

export default apiClient;