import {
    WRITE_BADGE_SUCCESS,
    WRITE_BADGE_FAIL,
    LOADING_MYBADGES,
    READ_BADGES_SUCCESS,
    READ_BADGES_FAIL,
    RESET_BADGES
  } from "../../actions";


  const initialState = {
    loading: false,
    badges: null,
    errors:null
  }

  export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case WRITE_BADGE_SUCCESS:
            return{
                ...state,
                loading:false
            }
        case WRITE_BADGE_FAIL:
            return{
                ...state,
                loading:false,
                errors:payload
            }
        case READ_BADGES_SUCCESS:
            return{
                ...state,
                loading:false,
                badges:payload
            }
        case READ_BADGES_FAIL:
            return{
                ...state,
                loading:false,
            }
        case LOADING_MYBADGES:
            return{
                ...state,
                loading:true
            }
        case RESET_BADGES:
            return{
                loading: false,
                badges: null,
                errors:null
            }
        default:
            return state;
    }
  } 