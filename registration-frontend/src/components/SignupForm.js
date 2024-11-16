import React, { useState } from 'react'; 
import './SignupForm.css'; 
import Image from '../Images/Image.png';
import Heading from '../Images/Heading.png';
import Glogin from '../Images/Glogin.png';
import Seperator from '../Images/Seperator.png';
import Logo from '../Images/Logo.png';
import axios from 'axios';

function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Correct backend URL (change localhost to your backend's public URL if deployed)
            const response = await axios.post('http://localhost:4000/SignupForm', { name, email, password });
            
            if (response.status === 200) {
                setMessage('Registration successful!');
            } else {
                setMessage('Unexpected error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <img src={Logo} alt="Logo" className="logo" />
                <img src={Heading} alt="Heading" className="heading" />
                
                <button 
                    type="button" 
                    className="google-button" 
                    onClick={() => window.location.href = '/auth/google'}
                >
                    <img src={Glogin} alt="Sign up with Google" className="glogin" />
                </button>
                
                <img src={Seperator} alt="Separator" className="separator" />

                <input 
                    name="name" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Name" 
                    required 
                />
                <input 
                    name="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    name="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <label>
                    <input 
                        name="rememberMe" 
                        type="checkbox" 
                    />
                    Remember Me
                </label>
                <button type="submit">Register</button>
                
                <p className="login-link">
                    Already have an account? <a href="/login">Log in</a>
                </p>
            </form>

            <div className="signup-image">
                <img src={Image} alt="Signup illustration" />
            </div>

            {/* Show feedback message */}
            {message && (
                <p className={`feedback-message ${message.includes('failed') ? 'error' : 'success'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default SignupForm;
