import axios from "axios";
import {
    READ_MYCOURSES_SUCCESS,
    READ_MYCOURSES_FAIL,
    LOADING_MYCOURSE
} from "../../actions"
import { ENROLL } from "../../../config/Config";
import { setAuthToken, isEmpty } from "../../../utils/index";
import { AsyncStorage } from 'react-native';

export const getMyCourses = () => async dispatch => {

    dispatch({type:LOADING_MYCOURSE})

    //assign token as header
    await AsyncStorage.getItem('uselfToken', (error,value) => {
      if (error) { 
  
        console.log(error)
  
      }else{
  
        if (isEmpty(value)){
          console.log("no token");
        }else{
          setAuthToken(value)
          //console.log(value)
  
        }
  
      }
  
    });
  
    await axios.get(ENROLL).then(response =>{
      dispatch({
  
        type: READ_MYCOURSES_SUCCESS,
        payload: response.data
  
      });
  
  
    }).catch(error=>{
  
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
  
      dispatch({
  
        type: READ_MYCOURSES_FAIL,
        payload: error.response.data.message
  
      });
    });
    
  };
  