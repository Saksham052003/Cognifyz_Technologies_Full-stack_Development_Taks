import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTaskManagerContext } from '../hooks/useTaskManagerContext';

const TaskForm = () => {
    const [taskname, setTaskname] = useState('');
    const [priority, setPriority] = useState('low');
    const { user } = useAuthContext();
    const { dispatch } = useTaskManagerContext();
    const backendURL = 'http://localhost:4000/api/taskmanager';

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newTask = {
            taskname,
            completed: false,
            priority,
        };

        const response = await fetch(backendURL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'ADD_TASK', payload: json });
            setTaskname('');
            setPriority('low');
        } else {
            console.error(json.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Task</h2>
            <input 
                type="text" 
                placeholder="Task Name" 
                value={taskname} 
                onChange={(e) => setTaskname(e.target.value)} 
                required 
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
