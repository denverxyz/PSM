import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import Header from '../../../components/Header'
import { connect } from "react-redux";
import MyCoursesCards from '../../../components/CourseScreen/MyCoursesCards'
import {getMyCourses} from '../actions/courseActions'
import {isEmpty} from '../../../utils/index'
import CourseHeader from '../../../components/CourseScreen/CourseHeader';
import signout from '../../../utils/signout'
import {resetLearning} from '../../learning_module_screens/actions/learningActions'


const CourseScreen = ({loading,isAuthenticated,navigation,getMyCourses,my_courses,resetLearning}) => {

  useEffect(()=>{
    resetLearning()
      // console.log(my_courses)
  },[])

  const getMyEnrolledCourse = () =>{
    getMyCourses()
  }



return( 

    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getMyEnrolledCourse} />}
        contentContainerStyle={styles.contentContainer}>
        {/* {loading?<ActivityIndicator size="large" color="#0000ff" />:null } */}
        {(!isEmpty(my_courses))?<MyCoursesCards navigation={navigation} my_courses={my_courses}/>:<Text style={styles.noCourse}>You're not enrolled any courses</Text>}
      </ScrollView>
      </View>
  ) 

}

CourseScreen.navigationOptions = {
  headerBackground:   ()=><Header/>,
  headerTitle: () => <CourseHeader/>,
  headerStyle: {
    height: 70
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  my_courses: state.course.my_courses,
  loading : state.course.loading,
  errors: state.course.errors
});

const mapDispatchToProps = {
  getMyCourses,
  resetLearning
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseScreen);

const styles = StyleSheet.create({
  noCourse:{
    marginTop:50,
    textAlign:"center"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  contentContainer: {
    paddingTop: 50,
  },
  
});
