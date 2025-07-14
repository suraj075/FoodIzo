import React, {  useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({url,setToken,setEmail}) => {
    let newUrl = url;
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password: ''
    });

  

    const handleChange = (e) => {
        const {name , value} = e.target;
      setFormData({
        ...formData,[name]:value
      });
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            alert("Email is missing");
            return;
        }
        setEmail(formData.email);
    
        try {
            if (!isLogin) {
                // Registration
               
                    const response = await axios.post(url + "/api/admin/register", formData);
                   
                    if (response.data.success) {
                        const token = response.data.token;
                        setToken(token);
                        localStorage.setItem("token", token);
        
                        const response2 = await axios.post(url + "/api/admin/sendotp", {
                            email: formData.email,
                        });
                        if (response2.data.success) {
                            toast.success("Otp sent Successfully");
                            navigate("/verify");
                        }
                        else{
                            toast.error(response2.data.message);
                        }
                    }else{
                        toast.error(response.data.message);
                    }

                    
                
     
            } else {
                // Login
                const response = await axios.post(url + "/api/admin/login", formData);
                if (response.data.success) {
                    const token = response.data.token;
                    setToken(token);
                    localStorage.setItem("token", token);
                    navigate("/add");
                    toast.success("Login Successfully");
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
        }
    };
    

    return (
        <div className="login-container">
            <div className="logo-container">
                <img src={assets.logo} alt="Logo" className="logo" />
            </div>
            <h1 className="welcome-text">Welcome To Admin</h1>
            <div className="login-box">
                <h2 className="form-title">{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit}>
                {!isLogin && (
                        <div className="form-group">
                            <label>Name</label>
                            <div className="name-input-container">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    )}
                
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span className="password-toggle" onClick={togglePassword}>
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </span>
                        </div>
                        {isLogin && (
                            <div className="forgot-password">
                                <span onClick={() => navigate('/forgotpassword/email')}>
                                    Forget Password?
                                </span>
                            </div>
                        )}
                    </div>
                   
                    <button type="submit" className="submit-btn">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <div className="toggle-form">
                    {isLogin ? (
                        <p>Don't have an account? <span onClick={() => setIsLogin(false)}>Sign Up</span></p>
                    ) : (
                        <p>Already have an account? <span onClick={() => setIsLogin(true)}>Login</span></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;