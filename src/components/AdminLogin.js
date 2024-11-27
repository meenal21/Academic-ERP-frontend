import React, { useState }  from 'react';
// import  './LoginForm.css'

//creating a functional component - LoginForm()
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //eventListener - when form will be submitted
    //e here is the event object - here the form data
    //using await async here
    const handleSubmit = async (e) => {
    e.preventDefault()
    // to prevent the default behavior of that element - form submission
    // to prevent page reloading
    // to let Js handle the form submission
    // form data would stay in the react states - email and password

    try{

        //fetch sends a request to the url mentioned - method is defined inside
        //the url is the server wala url - where the login details will be processed - use post here
        const response = await fetch('http://localhost:3000/api/login',
            {
                method : 'POST',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password})
            }

        );

        if (!response.ok){
            throw new Error('Failed to login! Please check credentials.');
        }

        //json converts from json to javascript object
        // await - so that the code waits for the response before it loads and also makes sure the data is fully parsed object
        const data = await response.json();
        console.log(data);
        
        if(data.success){
            alert(data.message);
        }
        else{
            alert('Login failed!');
        }
    }
    //implementing exception handling
    catch(error){
        console.error("Error during Login", error);
        alert('An error occured! Please try again later');
    }
};

return (
    <div className="login-form-container">
        <h2>Login</h2>
        <br/>
        {/* using the event listener  onSubmit and using handle submit */}  
        <form onSubmit={handleSubmit} className = "login-form">
        {/* using anonymous function in the onChange event handler */}
        {/*e.target.value  */} 
        <div classname='form-group'>
        <input type='email' placeholder='enter your email here' className='form-control' value={email} onChange={(e)=> setEmail(e.target.value)} required/>
        </div>
        <br/>
        <div classname='form-group'>
        <input type='password' placeholder='enter your password here' className='form-control' value= {password} onChange={(e)=> setPassword(e.target.value)} required/>
        </div>
        <br />
        <button type="submit" className='btn btn-primary'>Login</button>
        </form>
    </div>
);
};

export default LoginForm;