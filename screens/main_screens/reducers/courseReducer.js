import {
    READ_MYCOURSES_SUCCESS,
    READ_MYCOURSES_FAIL,
    RESET_MYCOURSES,
    LOADING_MYCOURSE
  } from "../../actions";


  const initialState = {
    loading: false,
    my_courses: null,
    errors:null
  }

  export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case READ_MYCOURSES_SUCCESS:
            return{
                ...state,
                loading:false,
                my_courses:payload
            }

        case READ_MYCOURSES_FAIL:
            return{
                ...state,
                loading:false,
                errors:payload
            }
        case LOADING_MYCOURSE:
          return{
            ...state,
            loading:true
          }
        case RESET_MYCOURSES:
          return{
            loading: false,
            my_courses: null,
            errors:null
          }
      default:
        return state;
    }
  } 