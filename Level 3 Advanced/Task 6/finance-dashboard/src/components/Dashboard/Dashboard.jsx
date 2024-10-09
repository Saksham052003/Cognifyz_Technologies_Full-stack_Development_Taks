import React, { useEffect, useState } from 'react';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const expensesResponse = await axios.get('http://localhost:7000/api/expenses', { headers });
      const incomeResponse = await axios.get('http://localhost:7000/api/income', { headers });

      setExpenses(expensesResponse.data);
      setIncome(incomeResponse.data);
    };

    fetchData();
  }, [user]);

  // Function to calculate time ago
  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'just now';
  };

  return (
    <div className="dashboard-container">
      <h1 className='name'>Dashboard</h1>
      <div className="forms-container">
        <IncomeForm setIncome={setIncome} />
        <ExpenseForm setExpenses={setExpenses} />
      </div>
      <div className="income-expense-list">
        <h2>Income List</h2>
        {income.length > 0 ? (
          <ul>
            {income.map((inc) => (
              <li key={inc._id}>
                {`${inc.source}: ₹${inc.amount}`} - <span>{timeAgo(inc.date)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No income recorded.</p>
        )}
        <h2>Expense List</h2>
        {expenses.length > 0 ? (
          <ul>
            {expenses.map((exp) => (
              <li key={exp._id}>
                {`${exp.description}: ₹${exp.amount}`} - <span>{timeAgo(exp.date)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses recorded.</p>
        )}
      </div>
      {/* Uncomment the Charts component when ready */}
      {/*<Charts expenses={expenses} income={income} />*/}
    </div>
  );
};

export default Dashboard;
