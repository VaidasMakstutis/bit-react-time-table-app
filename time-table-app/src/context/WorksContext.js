import WorksReducer from "../reducers/WorksReducer";
import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import * as services from "../services/worksServices";
import { auth } from "../services/authServices";
import { getWorks, openForm, addWorkData, validateWork} from "../actions/WorksActions";

const initialState = {
    worksItems: [],
    work: {
        date: '',
        company: '',
        service: '',
        description: '',
        startTime: '',
        endTime: ''
    },
    errors: [],
    isOpen: false
}

const AppContext = createContext();

const AppProvider =({children}) => {
    const [user, loading, error] = useAuthState(auth);
    const [state, dispatch] = useReducer(WorksReducer, initialState)
    
    useEffect(()=>{
        if(loading) return
        try{
            services.getAllWorks(data=>{
                dispatch(getWorks(data))
            }, user)
        }catch(error){
            console.log(error);
        }
    },[user, loading])

    console.log(state);

    const handleForm = (status) => {
        dispatch(openForm(status));
    }

    const handleAddWorkData = (input) => {
        dispatch(addWorkData(input));
    }

    const workValidation = (data) => {
        dispatch(validateWork(data));
    }

    const addWorkToFirestore = (data) => {
        try {
            services.addWork(data)
        }catch(error){
            console.log(error);
        }
        handleForm(false);
    }
    
    return (
        <AppContext.Provider value={{...state, handleForm, handleAddWorkData, workValidation, addWorkToFirestore}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider}