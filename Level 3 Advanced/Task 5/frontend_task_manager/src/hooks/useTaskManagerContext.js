import { useContext } from 'react';
import { TaskManagerContext } from '../context/TaskManagerContext';

export const useTaskManagerContext = () => {
    const context = useContext(TaskManagerContext);

    if (!context) {
        throw new Error('useTaskManagerContext must be used within a TaskManagerProvider');
    }

    return context;
};
