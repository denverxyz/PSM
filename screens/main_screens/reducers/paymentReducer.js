import {
    ENROLL_SUCCESS,
    ENROLL_FAIL,
    RESET_ENROLL
  } from "../../actions";


  const initialState = {
    loading: true,
    enroll_message: null,
    errors:null
  }

  export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ENROLL_SUCCESS:
            return{
                ...state,
                loading:false,
                enroll_message:'Enrollment Success!'
            }

        case ENROLL_FAIL:
            return{
                ...state,
                loading:false,
                errors:payload
            }

        case RESET_ENROLL:
            return{
                loading: true,
                enroll_message: null,
                errors:null
            }

      default:
        return state;
    }
  } 