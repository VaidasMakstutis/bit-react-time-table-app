import WorksReducer from "../reducers/WorksReducer";
import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import * as services from "../services/worksServices";
import { auth } from "../services/authServices";
import { getWorks, openForm, addWorkData, validateWork, setFilter, filterWorks } from "../actions/WorksActions";

const initialState = {
  worksItems: [],
  worksFiltered: [],
  work: {
    date: "",
    company: "",
    service: "",
    description: "",
    startTime: "",
    endTime: ""
  },
  errors: [],
  isOpen: false,
  filter: {},
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [state, dispatch] = useReducer(WorksReducer, initialState);

  useEffect(() => {
    if (loading) return;
    try {
      services.getAllWorks(data => {
        dispatch(getWorks(data));
      }, user);
    } catch (error) {
      console.log(error);
    }
  }, [user, loading]);
  

  useEffect(() => {
    dispatch(filterWorks(state.filter));
  }, [state.filter])


  const handleForm = status => {
    dispatch(openForm(status));
  };

  const handleAddWorkData = input => {
    dispatch(addWorkData(input));
  };

  const workValidation = data => {
    dispatch(validateWork(data));
  };

  const addWorkToFirestore = data => {
    try {
      services.addWork(data);
    } catch (error) {
      console.log(error);
    }
    handleForm(false);
  };

  const updateFirestore = (id, data) => {
    try {
      services.updateWork(id, data);
    } catch {
      console.log(error);
    }
  };

  const deleteFromFirestore = id => {
    try {
      services.deleteWork(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = criteria => {
    dispatch(setFilter(criteria));
  }

  return (
    <AppContext.Provider
      value={{ ...state, handleForm, handleAddWorkData, workValidation, addWorkToFirestore, updateFirestore, deleteFromFirestore, handleFilter }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
