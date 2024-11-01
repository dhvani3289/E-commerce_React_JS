import { Link } from 'react-router-dom';
import './SignUp.css'
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignUp() {

    let [registerData, setRegisterData] = useState({});
    let [validationErrors, setValidationErrors] = useState({});

    let handleChange = (e) => {
        let { name, value } = e.target
        setRegisterData({ ...registerData, [name]: value })
    }
    console.log(registerData);

    let validation = () => {
        let validationMessages = {};
        if (!registerData.username) {
            validationMessages.username = 'Username is required';
        }
        if (!registerData.email) {
            validationMessages.email = 'Email is required';
        }
        else if (!registerData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            validationMessages.email = 'You have entered an invalid email address!'
        }
        if (!registerData.password) {
            validationMessages.password = 'Password is required';
        }
        else if (!registerData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)) {
            validationMessages.password = 'Enter a password between 7 to 15 characters which contain at least one numeric digit and a special character.'
        }
        if (!registerData.termsAndConditions) {
            validationMessages.termsAndConditions = 'Please agree to the Terms and Conditions before submitting.';
        }
        return validationMessages
    }

    let submitData = async (e) => {
        e.preventDefault();
        let formErrors = validation();
        if (Object.keys(formErrors).length > 0) {
            setValidationErrors(formErrors)
        }
        else {
            let check = await axios.get("http://localhost:3000/users?email=" + registerData.email);
            console.log(check.data, "check");
            if (check.data.length == 0) {
                if (registerData.password === registerData.confirmPassword) {
                    await axios.post("http://localhost:3000/users", registerData);
                }
            }
            else {
                toast.error("Email already exists");
            }
        }
    }

    return (
        <>
            <div className='signup-wrap'>
                <form method="post" onSubmit={(e) => submitData(e)}>
                    <div className="box">
                        <h2 className='register'>Registration</h2>
                        <input type="text" placeholder='Enter Your Name' name='username' onChange={(e) => handleChange(e)} />
                        <div className='error'> {validationErrors.username && <p>{validationErrors.username}</p>}</div>

                        <input type="email" placeholder='Enter Your Email' name='email' onChange={(e) => handleChange(e)} />
                        <div className='error'> {validationErrors.email && <p>{validationErrors.email}</p>}</div>

                        <input type="password" placeholder='Create Password' name='password' onChange={(e) => handleChange(e)} />
                        <div className='error'> {validationErrors.password && <p>{validationErrors.password}</p>}</div>

                        <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e) => handleChange(e)} />
                        <div className='error'> {validationErrors.confirmPassword && <p>{validationErrors.confirmPassword}</p>}</div>

                        <div style={{ display: "flex", alignItems: 'center' }}>
                            <input type="checkbox" name="termsAndConditions" id="#check" />
                            <label htmlFor="#check" style={{ height: "25px" }}>I accept all terms & conditions</label>
                        </div>
                        <div className='error'> {validationErrors.termsAndConditions && <p>{validationErrors.termsAndConditions}</p>}</div>

                        <button type="submit" className='register-btn'>Register Now</button>
                        <p>
                            Already have an account?
                            <Link to="/logIn">Login Now</Link>
                        </p>

                    </div>
                </form >
            </div >
            <ToastContainer />
        </>
    )
}

export default SignUp;