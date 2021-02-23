import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    LOADING_USER,
    GET_USER,
    USER_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
  } from "../../actions";
import { AsyncStorage } from 'react-native';


  const initialState = {
    token: AsyncStorage.getItem("uselfToken"),
    isAuthenticated: false,
    loading: true,
    loading_user:false,
    user: null,
    login_error:null,
    signup_error:null,
    errors: null
  }

  export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_USER:

        return {

          ...state,
          loading: false,
          errors: null,
          user: payload

        };
      
      case REGISTER_SUCCESS:

        return {

          ...state,
          signup_error: null,   

        };

      case REGISTER_FAIL:

        return {

          ...state,
          signup_error: payload

        };

      case LOGIN_SUCCESS:

        AsyncStorage.setItem("uselfToken", payload.token);
      
        return {

          ...state,
          isAuthenticated: true,
          login_error: null,
          loading: false

        };
  
      case LOGIN_FAIL:

        return {

          ...state,
          isAuthenticated: false,
          login_error: payload

        };

      case LOADING_USER:
        return{
          ...state,
          loading_user: true
        }
      case UPDATE_USER_SUCCESS:
        return{
          ...state,
          loading_user:false
        }

      case UPDATE_USER_FAIL:
        return{
          ...state,
          loading_user:false
        }
      case USER_ERROR:
        return {

          ...state,
          errors: payload

        };
      
      case LOGOUT:
        
        AsyncStorage.removeItem("uselfToken")

        return {

          ...state,
          isAuthenticated: false,
          loading: true,
          login_error:null,
          signup_error:null,
          errors: null

        };

      default:
        return state;
    }
  } 