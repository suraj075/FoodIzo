import React, {  useState } from 'react';
import './ResetPassword.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import {useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = ({ url}) => {
    const location = useLocation();
    const {email} = location.state|| {};
    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords({
            ...passwords,
            [name]: value
        });
    };
   

   

    const togglePasswordVisibility = (field) => {
        setShowPassword({
            ...showPassword,
            [field]: !showPassword[field]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (passwords.password !== passwords.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        if (passwords.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            const response = await axios.post(url + "/api/admin/reset/setpassword", {
                email,
                password: passwords.password
            });
            
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/');
            } else {
                toast.error( "Failed to reset password");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="reset-password-container">
            <div className="logo-container">
                <img 
                    src={assets.logo} 
                    alt="Logo" 
                    className="logo" 
                    onClick={() => navigate('/')}
                />
            </div>
            <div className="reset-password-box">
                <h1 className="title">Reset Your Password</h1>
                <p className="subtitle">Please enter your new password</p>

                <form onSubmit={handleSubmit} className="reset-password-form">
                    <div className="form-group">
                        <label>New Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword.password ? "text" : "password"}
                                name="password"
                                placeholder="Enter new password"
                                value={passwords.password}
                                onChange={handleChange}
                                required
                            />
                            <span 
                                className="password-toggle" 
                                onClick={() => togglePasswordVisibility('password')}
                            >
                                {showPassword.password ? '👁️' : '👁️‍🗨️'}
                            </span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword.confirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={passwords.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <span 
                                className="password-toggle" 
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                            >
                                {showPassword.confirmPassword ? '👁️' : '👁️‍🗨️'}
                            </span>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button type="submit" className="reset-btn">
                            Reset Password
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;