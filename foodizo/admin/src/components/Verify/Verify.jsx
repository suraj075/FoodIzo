import React, { useState} from 'react';
import './Verify.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from'react-router-dom';


const Verify = ({url,email,token,setToken}) => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        //isNaN(element.value): Checks if the typed value is not a number — if so, it stops further execution to prevent non-numeric input.

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        //This below code is commonly used in OTP input fields to automatically move to the next input box when a user types a digit.
        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (e.target.value === '' && e.target.previousSibling) {
                e.target.previousSibling.focus();
            }
            console.log(index);
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
        }
    };

    

    const handleSubmit = async(e) => {
        e.preventDefault();
        const otpValue = otp.join('');

        try {
            const response = await axios.post(url + "/api/admin/verifyotp", {
                email: email,
                otp: otpValue
            });
    
            if (response.data.success) {
                navigate("/add");
                toast.success("Register Successfully");
            } else {
                toast.error(response.data.message);
                localStorage.removeItem("token");
                setToken("");
            }
        } catch (error) {
            console.error("OTP Verification Error:", error);
            toast.error("Something went wrong. Please try again later.");
        }
        
    };

    return (
        <div className="verify-container">
            <div className="verify-box">
                <h1 className="verify-title">Verify Your Email</h1>
                <p className="verify-subtitle">Please enter the verification code sent to your email</p>
                
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
                    <button type="submit" className="verify-btn">
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Verify;