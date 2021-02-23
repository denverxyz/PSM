import axios from "axios";
import {
    WRITE_BADGE_FAIL,
    WRITE_BADGE_SUCCESS,
    READ_BADGES_SUCCESS,
    READ_BADGES_FAIL,
    LOADING_MYBADGES,
    RESET_BADGES
} from "../../actions";
import { BADGE } from "../../../config/Config";
import {systemAuth} from '../../../utils/middleware/systemAuth';
import { setAuthToken, isEmpty } from "../../../utils/index";
import { AsyncStorage } from 'react-native';
import {getMyCourses} from '../actions/courseActions'


export const writeBadge = (course_id,user_id) => async dispatch => {

    dispatch({type:LOADING_MYBADGES})
    
    systemAuth().then((response)=>{

        setAuthToken(response.token)
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const body = JSON.stringify({ 
            course_id : course_id, 
            user_id : user_id
        });

        axios.post(BADGE, body, config).then(response =>{
  
            dispatch({
              type: WRITE_BADGE_SUCCESS,
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
              type: WRITE_BADGE_FAIL,
              payload:error.response.data.message
            });
        
        })
         


    }, (err) =>{
        console.log(err)
    })
    

};

export const getBadges = () => async dispatch => {
  dispatch({type:LOADING_MYBADGES});
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

  await axios.get(BADGE).then(response =>{
    dispatch({

      type: READ_BADGES_SUCCESS,
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
      type: READ_BADGES_FAIL
    });
  });
};
  
export const resetBadges = () => async dispatch => {
  dispatch({type:RESET_BADGES})
}