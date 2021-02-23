import axios from "axios";
import {
    USER_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_USER,
    LOGOUT,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    LOADING_USER,
    RESET_COURSES,
    RESET_MYCOURSES,
    RESET_ENROLL,
    RESET_LEARNING,
    RESET_BADGES
  } from "../../actions";
import { USERS, AUTH } from "../../../config/Config";
import { setAuthToken, isEmpty } from "../../../utils/index";
var Buffer = require('buffer/').Buffer;
import { AsyncStorage } from 'react-native';
import { getMyCourses } from "../../main_screens/actions/courseActions";
import { getBadges } from "../../main_screens/actions/badgeAction";


export const getCurrentUser = () => async dispatch => {
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

  await axios.get(USERS).then(response =>{
    dispatch({

      type: GET_USER,
      payload: response.data[0]

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

      type: USER_ERROR,
      payload: error.response.data.message

    });
  });
  
};

export const updateUser = (formData) => async dispatch =>{
  dispatch({type:LOADING_USER})
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
    phone : formData.phone,
    address_number : formData.address_number,
    address_street : formData.address_street,
    address_city : formData.address_city,
    address_postal_code : formData.address_postal_code,
    address_state : formData.address_state  
  });

  await axios.put(USERS, body, config).then(response =>{

    dispatch(getCurrentUser())

    dispatch({
      type: UPDATE_USER_SUCCESS,
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
      type: UPDATE_USER_FAIL,
      payload: error.response
    });

  })
}

export const signUp = (formData) => async dispatch => {

  const config = {
    headers: {
        "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ 
    first_name : formData.first_name,
    last_name : formData.last_name, 
    email : formData.email,
    password : formData.password,
    phone : formData.phone,
    date_of_birth : formData.date_of_birth,
    address_number : formData.address_number,
    address_street : formData.address_street,
    address_city : formData.address_city,
    address_postal_code : formData.address_postal_code,
    address_state : formData.address_state  
  });
  
  await axios.post(USERS, body, config).then(response =>{

    dispatch({
      type: REGISTER_SUCCESS,
    });
    dispatch(login(formData.email,formData.password))



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
      type: REGISTER_FAIL,
      payload: error.response.data.message
    });

  })
 
};


// Load token
export const login = (username,password) => async (dispatch) => {
  var basicAuth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

  const config = {
    headers: {

      "Content-Type": "application/json",
      "Authorization": basicAuth

    }
  };

  await axios.post(AUTH,{},config).then((response)=>{
    dispatch({

      type: LOGIN_SUCCESS,
      payload: response.data

    });
    // console.log(response.data.token);

    dispatch(getCurrentUser());
    dispatch(getMyCourses());
    dispatch(getBadges())
  }).catch((error)=> {

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
      type: LOGIN_FAIL,
      payload: error.response.data.message

    });

  })

};



export const logOut = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
  dispatch({
    type: RESET_MYCOURSES
  });
  dispatch({
    type:RESET_COURSES
  })
  dispatch({
    type: RESET_ENROLL
  })
  dispatch({
    type: RESET_LEARNING
  })
  dispatch(
    {type:RESET_BADGES}
  )
}
