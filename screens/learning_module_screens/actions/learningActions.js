import axios from "axios";
import {
    MODULES_SUCCESS,
    MODULES_FAIL,
    QUESTIONS_SUCCESS,
    QUESTIONS_FAIL,
    COURSE_INFO,
    RESET_LEARNING,
    UPDATE_STATUS_SUCCESS,
    UPDATE_ANSWER_SUCCESS,
    LOADING_UPDATE_ANSWER,
    UPDATE_ANSWER_FAIL,
    LOADING_QUESTIONS,
    LOADING_MODULES
  } from "../../actions";
import { MODULES,UPDATE_STATUS,QUESTIONS,VALIDATE_ANSWER} from "../../../config/Config";
import {isEmpty,setAuthToken} from "../../../utils/index"
import { AsyncStorage } from 'react-native';
import {getMyCourses} from '../../main_screens/actions/courseActions'


export const getModules = (course_id) => async dispatch => {
    
    dispatch({type:LOADING_MODULES})
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

    await axios.get(MODULES(course_id)).then(response =>{

      dispatch({
  
        type: MODULES_SUCCESS,
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
  
        type: MODULES_FAIL,
        payload: error.response
  
      });
    });
    
};


export const getQuestions = (course_id) => async dispatch => {
  dispatch({type:LOADING_QUESTIONS})
  
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

  await axios.get(QUESTIONS(course_id)).then(response =>{

    dispatch({

      type: QUESTIONS_SUCCESS,
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

    dispatch({type:QUESTIONS_FAIL})

  });
  
};


export const setCourseInfo = (course) => async dispatch => {
  dispatch({

      type: COURSE_INFO,
      payload: course

    });  
}

export const resetLearning = () => async dispatch =>{
  dispatch({type:RESET_LEARNING})
}

export const updateStatus = (course_id) => async dispatch =>{
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
        course_id: course_id
      });
      
      await axios.put(UPDATE_STATUS, body, config).then(response =>{

        dispatch({
          type: UPDATE_STATUS_SUCCESS    
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
      });

    
}

export const updateAnswer = (answer,question_id) => async dispatch =>{
  
  dispatch({type:LOADING_UPDATE_ANSWER})

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
    answer: answer
  });
  
  await axios.put(VALIDATE_ANSWER(question_id), body, config).then(response =>{

    dispatch({type:LOADING_UPDATE_ANSWER})
    dispatch({
      type: UPDATE_ANSWER_SUCCESS    
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
    dispatch({type:UPDATE_ANSWER_FAIL})
  });


}

