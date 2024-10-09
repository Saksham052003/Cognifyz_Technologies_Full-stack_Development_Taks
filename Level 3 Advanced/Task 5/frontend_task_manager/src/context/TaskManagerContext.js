import { createContext, useReducer } from 'react';
import { useState } from 'react';

export const TaskManagerContext = createContext();

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === action.payload._id ? action.payload : task
                ),
            };
        case 'SET_TASKS':
            return { ...state, tasks: action.payload }; // Updated to return an array of tasks
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload._id),
            };
        default:
            return state;
    }
};

export const TaskManagerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, { tasks: [] }); // Start with an empty array
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    return (
        <TaskManagerContext.Provider value={{ ...state, dispatch, token, setToken }}>
            {children}
        </TaskManagerContext.Provider>
    );
};
