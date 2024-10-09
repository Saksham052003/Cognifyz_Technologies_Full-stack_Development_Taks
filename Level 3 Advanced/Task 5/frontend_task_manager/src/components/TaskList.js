import React, { useEffect } from 'react';
import { useTaskManagerContext } from '../hooks/useTaskManagerContext';
import { useAuthContext } from '../hooks/useAuthContext';
import TaskItem from './TaskItem';

const TaskList = () => {
    const { tasks, dispatch } = useTaskManagerContext();
    const { user } = useAuthContext();
    const backendURL = 'http://localhost:4000/api/taskmanager';

    useEffect(() => {
        const fetchTasks = async () => {
            if (!user) return;

            const response = await fetch(backendURL, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            const json = await response.json();

            if (response.ok) {
                // Set the fetched tasks in the context state
                dispatch({ type: 'SET_TASKS', payload: json });
            }
        };

        if (user) {
            fetchTasks();
        }
    }, [dispatch, user]);

    return (
        <div className="task-list">
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <TaskItem key={task._id} task={task} />
                ))
            ) : (
                <p className="no-tasks">No tasks available</p>
            )}
        </div>
    );
};

export default TaskList;
