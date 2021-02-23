import {
    MODULES_SUCCESS,
    MODULES_FAIL,
    QUESTIONS_SUCCESS,
    QUESTIONS_FAIL,
    UPDATE_ANSWER_SUCCESS,
    UPDATE_ANSWER_FAIL,
    COURSE_INFO,
    RESET_LEARNING,
    UPDATE_STATUS_SUCCESS,
    LOADING_UPDATE_ANSWER,
    LOADING_QUESTIONS,
    LOADING_MODULES
  } from "../../actions";


  const initialState = {
    loading_update_answer: false,
    loading_modules:false,
    loading_questions: false,
    modules: null,
    questions:null,
    course: null,
    errors:null
  }

  export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOADING_MODULES:
          return{
            ...state,
            loading_modules:true
          }
        case MODULES_SUCCESS:
            return{
                ...state,
                loading_modules:false,
                modules:payload
            }
        case COURSE_INFO:
          return{
            ...state,
            course:payload
        }
        case UPDATE_STATUS_SUCCESS:
          return{
            ...state,
          }
        case LOADING_UPDATE_ANSWER:
          return{
            ...state,
            loading_update_answer:true
          }
        case UPDATE_ANSWER_SUCCESS:
          return{
            ...state,
            loading_update_answer:false
          }
        case UPDATE_ANSWER_FAIL:
          return{
            ...state,
            loading_update_answer:false
          }
        case MODULES_FAIL:
            return{
                ...state,
                loading_modules:false,
                errors:payload
            }
        case LOADING_QUESTIONS:
          return{
            ...state,
            loading_questions:true
          }
        case QUESTIONS_SUCCESS:
            return{
              ...state,
              loading_questions: false,
              questions:payload
            }
        case QUESTIONS_FAIL:{
            return{
              ...state,
              loading_questions:false
            }
        }
        case RESET_LEARNING:
          return{
            loading_update_answer: false,
            loading_modules:false,
            loading_questions: false,
            modules: null,
            questions:null,
            course: null,
            errors:null
          }
      default:
        return state;
    }
  } 