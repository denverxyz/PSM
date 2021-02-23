import axios from "axios";
import {
    ENROLL_SUCCESS,
    ENROLL_FAIL,RESET_ENROLL
} from "../../actions"
import { ENROLL } from "../../../config/Config";
import { setAuthToken, isEmpty } from "../../../utils/index";
import { AsyncStorage } from 'react-native';
import {getMyCourses} from '../actions/courseActions'


export const enrollCourse = (course_id) => async dispatch => {
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

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
      };
    
      const body = JSON.stringify({ 
        course_id : course_id
      });

  
    await axios.post(ENROLL,body,config).then(response =>{

      dispatch({
        type: ENROLL_SUCCESS  
      });
  
      dispatch(getMyCourses())
  
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
  
        type: ENROLL_FAIL,
        payload: error.response.data.message
  
      });
    });
    
  };

  export const enrollReset = () => async dispatch => {
    dispatch({
        type: RESET_ENROLL  
      });
  }
  