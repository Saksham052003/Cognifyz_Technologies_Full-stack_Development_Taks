import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () =>{
    const { signup } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await signup(email, password);
            navigate('/');
        }catch(error){
            console.error(error);
            alert('Signup faild. Please try agin.')
        }
    };

    return(
        <div className="container">
        <form onSubmit={handleSubmit} >
            <h2>Signup</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Signup</button>
        </form>
        </div>
    );
};

export default Signup;