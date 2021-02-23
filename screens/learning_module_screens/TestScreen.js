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
import QuestionCard from '../../components/LearningScreen/QuestionCard';
import { isEmpty } from '../../utils';
import {getQuestions} from './actions/learningActions';



const TestScreen = ( { loading, navigation,getQuestions,course, questions} ) => {
  
  useEffect(()=>{
    getQuestions(course.course_id)
    // console.log(modules_questions[0])
  },[])

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={()=>{getQuestions(course.course_id)}} />}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          {!isEmpty(questions)?<QuestionCard navigation={navigation} questions={questions}/>:
          <Text style={{
            marginTop:50,
            textAlign:"center"
          }}>No Questions Available</Text>}

         </ScrollView>
      </View>
    );
  
  }
  TestScreen.navigationOptions = screenProps => ({
    headerBackground:   ()=> <Header/>,
    headerTitle: () => <LearningHeaderTitle title='Test Questions'/>,
    headerLeft: () => BackButtonLearning(screenProps),
    headerStyle: {
      height: 70
    }
    
  });
  const mapStateToProps = state => ({
    loading: state.learning.loading_questions,
    questions: state.learning.questions,
    course: state.learning.course
  });
  
  const mapDispatchToProps = {
    getQuestions
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TestScreen);

  const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    
    contentContainer: {
      paddingTop: 50,
    },
    
  });