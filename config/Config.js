export const APIURL = `http://api.u-self.com`;
//export const APIURL = `http://localhost:5000`;

// sign up and read user
export const USERS = `${APIURL}/users`;
//get token
export const AUTH = `${APIURL}/auth`;
//read and write enroll
export const ENROLL = `${APIURL}/enroll`;

//read course and course's req
export const COURSE_SEARCH = (title) => `${APIURL}/courses/${title}`;
export const COURSE_REQ = (course_id) => `${APIURL}/courses/requirements/${course_id}`;

//update status to inprogress
export const UPDATE_STATUS = `${APIURL}/enroll/status`

//read user's answer 
export const VALIDATE_ANSWER = (question_id) => `${APIURL}/user/answers/${question_id}`;
//learning from modules
export const MODULES = (course_id) => `${APIURL}/modules/${course_id}`;
export const QUESTIONS = (course_id) => `${APIURL}/questions/${course_id}`;


//read badge user
export const BADGE = `${APIURL}/badges`;



