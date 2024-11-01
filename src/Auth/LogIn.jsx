import { Link } from 'react-router-dom';
import './SignUp.css'
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { userLogin } from '../Redux/Actions/LoginActions';

function LogIn() {

    let [registerData, setRegisterData] = useState({});
    let [validationErrors, setValidationErrors] = useState({});
    let dispatch = useDispatch();

    let handleChange = (e) => {
        let { name, value } = e.target
        setRegisterData({ ...registerData, [name]: value })
    }
    console.log(registerData);

    let validation = () => {
        let validationMessages = {};
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
        return validationMessages
    }

    let submitData = async (e) => {
        e.preventDefault();
        let formErrors = validation();
        if (Object.keys(formErrors).length > 0) {
            setValidationErrors(formErrors)
        }
        else {
            console.log(registerData)
            let checkEmail = await axios.get("http://localhost:3000/users?email=" + registerData.email);
            console.log(checkEmail.data.length);

            if (checkEmail.data.length === 1) {
                if (checkEmail.data[0].password === registerData.password) {
                    dispatch(userLogin(checkEmail.data[0]))
                    window.location = "/"
                }
                else {
                    toast.error("Incorrect Password")
                }
            }
            else {
                toast.error("Incorrect Email");
            }
        }
    }

    return (
        <>
            <div className='signup-wrap'>
                <form method="post" onSubmit={(e) => submitData(e)}>
                    <div className="box" style={{ padding: "10px" }}>
                        <h2 className='register'>Log In</h2>

                        <input type="email" placeholder='Enter Your Email' name='email' onChange={(e) => handleChange(e)} />
                        <div className='error'> {validationErrors.email && <p>{validationErrors.email}</p>}</div>

                        <input type="password" placeholder='Create Password' name='password' onChange={(e) => handleChange(e)} />
                        <div className='error'> {validationErrors.password && <p>{validationErrors.password}</p>}</div>

                        <button type="submit" className='register-btn' style={{ marginBottom: "15px" }}>Log In</button>

                        <p>
                            Don't have an account?
                            <Link to="/signUp">Sign Up</Link>
                        </p>
                    </div>
                </form >
            </div >
            <ToastContainer />
        </>
    )
}

export default LogIn;