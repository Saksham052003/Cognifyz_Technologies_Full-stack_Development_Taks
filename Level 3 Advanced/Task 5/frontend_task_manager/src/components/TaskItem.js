import React, { useState } from 'react';
import { useTaskManagerContext } from '../hooks/useTaskManagerContext';
import { useAuthContext } from '../hooks/useAuthContext';

const TaskItem = ({ task }) => {
    const { dispatch } = useTaskManagerContext();
    const { user } = useAuthContext();
    const backendURL = 'http://localhost:4000/api/taskmanager';
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.taskname);
    const [editedPriority, setEditedPriority] = useState(task.priority);
    const [completed, setCompleted] = useState(task.completed);

    const handleSave = async () => {
        const updatedTask = { 
            taskname: editedTitle, 
            priority: editedPriority, 
            completed: task.completed,
            _id: task._id,
        };
    
        // Optimistically update the state
        dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
        setIsEditing(false);
    
        const response = await fetch(`${backendURL}/${task._id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });
    
        if (!response.ok) {
            console.error("Update failed");
            // Revert the state change if the update fails
            dispatch({ type: 'SET_TASKS', payload: task });
        }
    };
    
    const handleDelete = async () => {
        console.log('Deleting task:', task);
    
        // Optimistically update the state
        dispatch({ type: 'DELETE_TASK', payload: task });
    
        const response = await fetch(`${backendURL}/${task._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
            
        })
        const json = await response.json()
    
        if (response.ok) {
            // Optionally, revert the state change if the delete fails
            dispatch({ type: 'DELETE_TASK', payload: json });
        } 
    };    
    const toggleCompleted = async () => {
        const updatedTask = { 
            ...task, 
            completed: !completed 
        };

        // Optimistically update the state
        dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
        setCompleted(!completed);

        const response = await fetch(`${backendURL}/${task._id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });

        if (!response.ok) {
            console.error("Update failed");
            // Revert the state change if the update fails
            dispatch({ type: 'UPDATE_TASK', payload: task });
            setCompleted(task.completed);
        }
    };

    return (
        <div className="task-item">
            {isEditing ? (
                <>
                    <input 
                        type="text" 
                        value={editedTitle} 
                        onChange={(e) => setEditedTitle(e.target.value)} 
                    />
                    <select 
                        value={editedPriority} 
                        onChange={(e) => setEditedPriority(e.target.value)} 
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{task.taskname}</h4>
                    <p>Priority: {task.priority}</p>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={completed} 
                            onChange={toggleCompleted} 
                        />
                        Completed
                    </label>
                    <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default TaskItem;
