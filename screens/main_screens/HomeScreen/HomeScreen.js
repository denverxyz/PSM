import React,{useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { connect } from "react-redux";
import Header from '../../../components/Header'
import SearchHeader from '../../../components/HomeScreen/SearchHeader'
import CourseCard from '../../../components/HomeScreen/CoursesCards'
import {getCourses} from '../actions/homeActions'
import {isEmpty} from '../../../utils/index'

const HomeScreen = ( { loading, isAuthenticated, navigation,getCourses, courses } ) => {

  const getAllCourses = () =>{
    getCourses()
  }
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getAllCourses} />}
        contentContainerStyle={styles.contentContainer}>
                {(!isEmpty(courses))?<CourseCard navigation={navigation} courses={courses}/>:<Text style={styles.noCourse}>Courses Not Offered</Text>}
      </ScrollView>
    </View>
  );

}
HomeScreen.navigationOptions = {
  headerBackground:   ()=> <Header/>,
  headerTitle: () => <SearchHeader/>,
  headerStyle: {
    height: 70
  }
};
const mapStateToProps = state => ({
  courses: state.home.courses,
  loading : state.home.loading,
  errors: state.home.errors,
  isAuthenticated: state.auth.isAuthenticated

});

const mapDispatchToProps = {
  getCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

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
