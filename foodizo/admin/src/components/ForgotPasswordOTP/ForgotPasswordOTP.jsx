import React, { useEffect, useState } from 'react';
import './ForgotPasswordOTP.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordOTP = ({ url}) => {
    const location = useLocation();
    const {email} = location.state;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const navigate = useNavigate();

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (e.target.value === '' && e.target.previousSibling) {
                e.target.previousSibling.focus();
            }
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
        }
    };

    const handleResendOTP = async () => {
        try {
            const response = await axios.post(url + "/api/admin/reset/emailotp", { email:email});
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error("Sorry! Something went wrong. Please try again later.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        
        try {
            const response = await axios.post(url + "/api/admin/reset/verifyemail", {
                email,
                otp: otpValue
            });
            
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/resetpassword',{state:{email:email}});
            } else {
                toast.error("Invalid OTP. Please try again.");
            }
        } catch (error) {
            toast.error("Verification failed. Please try again.");
        }
    };

    return (
        <div className="forgot-otp-container">
            <div className="logo-container">
                <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className="logo" />
            </div>
            <div className="forgot-otp-box">
                <h1 className="title">Enter Verification Code</h1>
                <p className="subtitle">
                    Please enter the verification code sent to<br />
                    <span className="email-text">{email}</span>
                </p>

                <form onSubmit={handleSubmit} className="otp-form">
                    <div className="otp-group">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                className="otp-input"
                            />
                        ))}
                    </div>

                    <div className="action-buttons">
                        <button type="submit" className="verify-btn">
                            Verify OTP
                        </button>
                        <button 
                            type="button" 
                            className="back-btn"
                            onClick={() => navigate('/')}
                        >
                            Back
                        </button>
                    </div>
                </form>

                <div className="resend-section">
                    <p>Didn't receive the code?</p>
                    <button 
                        className="resend-btn" 
                        onClick={handleResendOTP}
                    >
                        Resend OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordOTP;