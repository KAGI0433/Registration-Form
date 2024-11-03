import React, { useState } from 'react';
import './SignupForm.css'; 
import Image from '../Images/Image.png'
import Heading from '../Images/Heading.png'

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
            <img src={Heading} alt="Signup illustration" />
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
                <button 
                    type="button" 
                    className="google-button" 
                    onClick={() => window.location.href = '/auth/google'}
                >
                    Continue with Google
                </button>
                <p className={`feedback-message ${message.includes('failed') ? 'error' : 'success'}`}>
                    {message}
                </p>
            </form>
            <div className="signup-image">
                <img src={Image} alt="Signup illustration" />
            </div>
        </div>
    );
}

export default SignupForm;
