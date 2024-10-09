import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const IncomeForm = ({ setIncome }) => {
  const { user } = useAuth();
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const newIncome = { source, amount };
    const response = await axios.post('http://localhost:7000/api/income/add', newIncome, { headers });

    setIncome((prev) => [...prev, response.data]);
    setSource('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Income</h3>
      <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Income Source" required />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <button type="submit">Add Income</button>
    </form>
  );
};

export default IncomeForm;
