import {ADD_WORK_DATA, OPEN_FORM, SET_WORKS, VALIDATE_WORK} from "../actions/types";
import workValidation from "../utilities/workValidation";

const WorksReducer = (state, action) => {
    switch(action.type) {
        case SET_WORKS:
            return {
                ...state,
                worksItems: action.payload
            }
            case OPEN_FORM:
            return {
                ...state,
                isOpen: action.payload
            }
            case ADD_WORK_DATA:
                return {
                    ...state,
                    work: {...state.work, ...action.payload}
                }
            case VALIDATE_WORK:
                return {
                    ...state,
                    errors: workValidation(action.payload)
                }
        default:
            return state;
    }
}

export default WorksReducer;