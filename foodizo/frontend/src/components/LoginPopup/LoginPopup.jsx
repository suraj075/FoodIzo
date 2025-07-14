import React, { useState, useContext,useEffect } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaEyeSlash } from "react-icons/fa6";

const LoginPopup = ({ setShowLogin }) => {
    const { url,token,setToken} = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };


    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;

        try {
            if (currState === "Login") {
                newUrl += "/api/user/login";
                
            } else {
                newUrl += "/api/user/register";
            }

            const response = await axios.post(newUrl, data);
            if(response.data.success){
                setToken(response.data.token);
                localStorage.setItem("token",response.data.token);
                setShowLogin(false);
            }else{
                alert(response.data.message);
            }



        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? null : (
                        <input
                            type="text"
                            onChange={onChangeHandler}
                            name="name"
                            value={data.name}
                            placeholder='Your name'
                            required
                        />
                    )}
                    <input
                        type="email"
                        onChange={onChangeHandler}
                        placeholder='Your email'
                        name="email"
                        value={data.email}
                        required
                    />
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            onChange={onChangeHandler}
                            placeholder='Password'
                            name="password"
                            value={data.password}
                            required
                        />
                        {showPassword ? (
                            <FaEyeSlash className="eye-icon" onClick={onShowPassword} />
                        ) : (
                            <FaRegEye className="eye-icon" onClick={onShowPassword} />
                        )}
                    </div>
                    {currState === "Login" ?<div onClick={()=>{
                        setShowLogin(false);
                        navigate('/reset')}} className="forget-password">Forget Password?</div>:null}
                </div>
                <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ? (
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;