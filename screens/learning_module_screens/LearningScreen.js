import React,{useEffect} from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,Text
} from 'react-native';
import { connect } from "react-redux";
import Header from '../../components/Header';
import BackButtonLearning from '../../components/BackButtonLearning';
import LearningHeaderTitle from '../../components/LearningScreen/LearningHeaderTitle';
import {getModules,updateStatus} from './actions/learningActions';
import ModuleCard from '../../components/LearningScreen/ModuleCard';
import { isEmpty } from '../../utils';



const LearningScreen = ( { loading,updateStatus, navigation,getModules,course,modules} ) => {
  

  useEffect(()=>{
    getModules(course.course_id)

    if(course.status === 'NEW'){
      updateStatus(course.course_id)
    }


    // console.log(modules_questions[0])
  },[])
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={()=>{getModules(course.course_id)}} />}  
          contentContainerStyle={styles.contentContainer}>
      {/* <Text>{modules_questions[0].id}</Text> */}
          {!isEmpty(modules)?<ModuleCard modules={modules}/>:
          <Text style={{
            marginTop:50,
            textAlign:"center"
          }}>No Modules Available</Text>}
         </ScrollView>
      </View>
    );
  
  }

  LearningScreen.navigationOptions = (screenProps) => ({
    headerBackground:   ()=> <Header/>,
    headerTitle: () => <LearningHeaderTitle title='Learning Modules'/>,
    // headerTitle: () => <CourseDetailsHeader course={screenProps.course}/>,
    headerLeft: () => BackButtonLearning(screenProps),
    headerStyle: {
      height: 70
    }
  });

  const mapStateToProps = state => ({
    loading: state.learning.loading_modules,
    modules: state.learning.modules,
    course: state.learning.course
  });

  
  const mapDispatchToProps = {
    getModules,
    updateStatus
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LearningScreen);


  const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    
    contentContainer: {
      paddingTop: 50,
    },
    
  });