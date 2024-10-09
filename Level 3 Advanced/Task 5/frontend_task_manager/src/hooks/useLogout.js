import { useAuthContext } from "./useAuthContext";
import { useTaskManagerContext } from "./useTaskManagerContext"

export const useLogout = () =>{
    const { dispatch } = useAuthContext()
    const { dispatch: taskDispatch } = useTaskManagerContext()

    const logout = () => {
        localStorage.removeItem('user');

        dispatch({type: 'LOGOUT'})
        taskDispatch({type: 'SET_TASKS', payload: []})
    }

    return{logout}
}