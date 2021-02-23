import { combineReducers } from "redux";
import authReducer from './auth_screens/reducers/authReducers';
import homeReducer from './main_screens/reducers/homeReducers';
import courseReducer from "./main_screens/reducers/courseReducer";
import paymentReducer from "./main_screens/reducers/paymentReducer";
import learningReducer from "./learning_module_screens/reducers/learningReducers";
import badgeReducer from "./main_screens/reducers/badgeReducer";

export default combineReducers({
    auth:authReducer,
    home:homeReducer,
    course:courseReducer,
    payment:paymentReducer,
    learning:learningReducer,
    badge:badgeReducer

});