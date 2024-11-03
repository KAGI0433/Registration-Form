import React, { useState } from 'react';
import './SignupForm.css'; 
import Image from '../Images/Image.png';
import Heading from '../Images/Heading.png';
import Glogin from '../Images/Glogin.png';
import Seperator from '../Images/Seperater.png';
import Logo from '../Images/Logo.png';

function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rememberMe: false
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            setMessage(result.message);
        } catch (error) {
            setMessage('Registration failed.');
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <img src={Logo} alt="Logo" className='logo' />
                <img src={Heading} alt="Heading" className='heading' />
                
                <button 
                    type="button" 
                    className="google-button" 
                    onClick={() => window.location.href = '/auth/google'}
                >
                    <img src={Glogin} alt="Glogin" className='glogin' />
                </button>
                
                <img src={Seperator} alt="Seperator" className='seperator'/>

                <input 
                    name="name" 
                    type="text" 
                    onChange={handleChange} 
                    placeholder="Name" 
                    required 
                />
                <input 
                    name="email" 
                    type="email" 
                    onChange={handleChange} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    name="password" 
                    type="password" 
                    onChange={handleChange} 
                    placeholder="Password" 
                    required 
                />
                <label>
                    <input 
                        name="rememberMe" 
                        type="checkbox" 
                        onChange={handleChange} 
                    />
                    Remember Me
                </label>
                <button type="submit">Register</button>
                
               
                <p className="login-link">
                    Already have an account? <a href="/auth/google">Log in</a>
                </p>
            </form>

            <div className="signup-image">
                <img src={Image} alt="Signup illustration" />
            </div>

            <p className={`feedback-message ${message.includes('failed') ? 'error' : 'success'}`}>
                {message}
            </p>
        </div>
    );
}

export default SignupForm;
