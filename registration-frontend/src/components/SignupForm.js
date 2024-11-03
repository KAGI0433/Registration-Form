// SignupForm.js
import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <input name="name" type="text" onChange={handleChange} placeholder="Name" />
            <input name="email" type="email" onChange={handleChange} placeholder="Email" />
            <input name="password" type="password" onChange={handleChange} placeholder="Password" />
            <label>
                <input name="rememberMe" type="checkbox" onChange={handleChange} />
                Remember Me
            </label>
            <button type="submit">Register</button>
            <button type="button" onClick={() => window.location.href = '/auth/google'}>Continue with Google</button>
            <p>{message}</p>
        </form>
    );
}
export default SignupForm;
