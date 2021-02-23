import {
    READ_COURSES_SUCCESS,
    READ_COURSES_FAIL,
    RESET_COURSES,
    LOADING_COURSES
  } from "../../actions";


  const initialState = {
    loading: false,
    courses: null,
    errors:null
  }

  export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case READ_COURSES_SUCCESS:
            return{
                ...state,
                loading:false,
                courses:payload
            }
        case LOADING_COURSES:
            return{
                ...state,
                loading:true
            }
        case READ_COURSES_FAIL:
            return{
                ...state,
                loading:false,
                errors:payload
            }

        case RESET_COURSES:
            return{
                loading: false,
                courses: null,
                errors:null
            }

      default:
        return state;
    }
  } 