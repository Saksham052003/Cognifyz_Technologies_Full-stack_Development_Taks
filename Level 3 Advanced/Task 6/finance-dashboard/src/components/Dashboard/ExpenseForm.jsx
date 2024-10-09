import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ExpenseForm = ({ setExpenses }) => {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const newExpense = { description, amount };
    const response = await axios.post('http://localhost:7000/api/expenses/add', newExpense, { headers });

    setExpenses((prev) => [...prev, response.data]);
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Expense</h3>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Expense Description" required />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
