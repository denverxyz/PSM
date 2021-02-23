import axios from "axios";
import {
    READ_COURSES_SUCCESS,
    READ_COURSES_FAIL,
    LOADING_COURSES
  } from "../../actions";
import { COURSE_SEARCH} from "../../../config/Config";
import {isEmpty} from "../../../utils/index"


export const getCourses = (title) => async dispatch => {

    dispatch({type: LOADING_COURSES})
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
      };


    await axios.get(COURSE_SEARCH(!isEmpty(title)? title:''),null,config).then(response =>{


        dispatch({
    
          type: READ_COURSES_SUCCESS,
          payload: response.data
    
        });

    
    
    }).catch(error=>{

        console.log(error)
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

            type: READ_COURSES_FAIL,
            payload: error.response.data.message

        });
    });
    
};