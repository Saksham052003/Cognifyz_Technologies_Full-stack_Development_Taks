import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTaskManagerContext } from '../hooks/useTaskManagerContext';

const Charts = () => {
    const { tasks } = useTaskManagerContext();

    const completedTasks = tasks.filter(task => task.completed).length;
    const notCompletedTasks = tasks.length - completedTasks;

    // Count the number of tasks by priority
    const priorityCounts = {
        high: tasks.filter(task => task.priority === 'high').length,
        medium: tasks.filter(task => task.priority === 'medium').length,
        low: tasks.filter(task => task.priority === 'low').length,
    };

    // Data for the completed and not completed tasks chart
    const taskStatusData = {
        labels: ['Completed', 'Not Completed'],
        datasets: [
            {
                label: 'Task Status',
                data: [completedTasks, notCompletedTasks],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },
        ],
    };

    // Data for the priority distribution chart
    const priorityData = {
        labels: ['High', 'Medium', 'Low'],
        datasets: [
            {
                label: 'Task Priorities',
                data: [priorityCounts.high, priorityCounts.medium, priorityCounts.low],
                backgroundColor: ['rgba(255, 206, 86, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(153, 102, 255, 0.6)'],
            },
        ],
    };

    return (
        <div>
            <h2>Task Statistics</h2>
            <p>Completed Tasks: {completedTasks}</p>
            <p>Not Completed Tasks: {notCompletedTasks}</p>

            <h3>Task Status Chart</h3>
            <Bar data={taskStatusData} options={{ responsive: true }} />

            <h3>Task Priority Distribution Chart</h3>
            <Bar data={priorityData} options={{ responsive: true }} />
        </div>
    );
};

export default Charts;
