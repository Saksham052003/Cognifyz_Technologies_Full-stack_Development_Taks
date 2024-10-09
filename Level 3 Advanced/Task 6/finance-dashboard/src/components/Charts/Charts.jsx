import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import 'chart.js/auto'; // Required to use Chart.js

const Charts = () => {
  const { user } = useAuth();
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const incomeResponse = await axios.get('http://localhost:7000/api/income', { headers });
      const expensesResponse = await axios.get('http://localhost:7000/api/expenses', { headers });

      setIncome(incomeResponse.data);
      setExpenses(expensesResponse.data);
    };

    fetchData();
  }, [user]);

  // Grouping income and expenses by month
  const groupByMonth = (data) => {
    const grouped = {};
    data.forEach((item) => {
      const month = new Date(item.date).getMonth() + 1; // Get month (1-based index)
      if (!grouped[month]) grouped[month] = 0;
      grouped[month] += item.amount;
    });
    return grouped;
  };

  const incomeByMonth = groupByMonth(income);
  const expensesByMonth = groupByMonth(expenses);

  // Bar chart data
  const barData = {
    labels: Object.keys(incomeByMonth).map((month) => `Month ${month}`),
    datasets: [
      {
        label: 'Salary',
        backgroundColor: 'blue',
        data: Object.values(incomeByMonth),
      },
      {
        label: 'Expenses',
        backgroundColor: 'red',
        data: Object.values(expensesByMonth),
      },
    ],
  };

  // Pie chart data for the selected month
  const totalIncome = incomeByMonth[selectedMonth] || 0;
  const totalExpenses = expensesByMonth[selectedMonth] || 0;
  const leftover = totalIncome - totalExpenses;

  const pieData = {
    labels: ['Salary', 'Expenses', 'Leftover'],
    datasets: [
      {
        data: [totalIncome, totalExpenses, leftover],
        backgroundColor: ['blue', 'red', 'green'],
      },
    ],
  };

  return (
    <div className="charts-container">
      <h1 className='name'>Charts</h1>
      
      <div className="bar-chart chart-container"> {/* Added class for styling */}
        <h2>Monthly Salary and Expenses</h2>
        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
  
      <div className="pie-chart chart-container"> {/* Added class for styling */}
        <h2>Salary vs Expenses for Selected Month</h2>
        <label htmlFor="month">Select Month: </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {Object.keys(incomeByMonth).map((month) => (
            <option key={month} value={month}>
              Month {month}
            </option>
          ))}
        </select>
  
        <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default Charts;
