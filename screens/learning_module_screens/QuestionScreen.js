import React,{useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,Text,TextInput,Alert
} from 'react-native';
import { connect } from "react-redux";
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import LearningHeaderTitle from '../../components/LearningScreen/LearningHeaderTitle';
import { isEmpty } from '../../utils';
import {Card,Button} from 'react-native-elements'
import {updateAnswer,getQuestions} from './actions/learningActions'



const QuestionScreen = ( { navigation, updateAnswer,course,loading,getQuestions} ) => {
    
    const [question,setQuestion] =useState(navigation.getParam('question'))
    const [answer,setAnswer] = useState(question.answer)
    
    const onChange = (value) =>{
      setAnswer(value);
    }

    const onSubmit = async e => {
      if(isEmpty(answer)){
        const value = 'N/A'
        setAnswer(value)
        Alert.alert(
          '',
          'Are you sure to submit the blank answer?',
          [
            {text: 'OK', onPress: async () => {
              await updateAnswer(value,question.id);
              getQuestions(course.course_id)
              navigation.goBack()
            }},
            {text: 'CANCEL', onPress: () => {  
              setAnswer('')
            }},
          ],
          {cancelable: false},
        );

      }else{
        await updateAnswer(answer,question.id);
        getQuestions(course.course_id)
        navigation.goBack()
      }

      
    };
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <Card>

          <Text style={{
            marginTop:10,
            textAlign:"center"
          }}>{question.question}</Text>
          <View style={styles.textAreaContainer} >
          <TextInput
            style={styles.textArea}
            editable={question.status === 'NEW' ?true:false}
            value={answer}
            onChangeText={value => onChange(value)}
            underlineColorAndroid="transparent"
            placeholder="Type your answer"
            placeholderTextColor="grey"
            numberOfLines={5}
            multiline={true}
          />
          </View>
          {
            question.status === 'NEW' ?
              <View>
                <Text style={{color:"grey",marginLeft:"auto",marginBottom:10}}>{`Marks : ${question.question_mark}`}</Text>
                <Button
                  titleStyle={styles.submitButtonTitle}
                  buttonStyle={styles.submitButton}
                  disabled = {loading}
                  disabledStyle={styles.submitButton}
                  disabledTitleStyle={styles.submitButtonTitle}
                  loading = {loading}
                  onPress={(e) => onSubmit(e)
                    // {
                    // updateAnswer(answer,question.id)
                    // navigation.goBack()
                    // }
                  }
                  title="Submit Answer"
                  type="solid" 
                /> 
              </View>
            : 
            <View>

            <Text style={{color:"grey",marginLeft:"auto"}}>{`Marks : ${question.user_mark}/${question.question_mark}`}</Text>
            <Text style={{color:"grey",marginTop:40, fontSize:11, textAlign:"center"}}>{`Please contact support@u-self.com for reviewing purpose`}</Text>
            </View>

          }

          </Card>

         </ScrollView>
      </View>
    );
  
  }

  QuestionScreen.navigationOptions = screenProps => ({
    headerBackground:   ()=> <Header/>,
    headerTitle: () => <LearningHeaderTitle title={`Question ${screenProps.navigation.getParam('question').question_number}`}/>,
    headerLeft: () => (screenProps.navigation.getParam('question').status !== 'NEW'?BackButton(screenProps):null),
    headerStyle: {
      height: 70
    },
    swipeEnabled: false
  });

  const mapStateToProps = state => ({
    course: state.learning.course,
    loading: state.learning.loading_update_answer
  });
  
  const mapDispatchToProps = {
    getQuestions,
    updateAnswer
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionScreen);

  const styles = StyleSheet.create({
    textArea: {
      height: 150,
      justifyContent: "flex-start"
    },
    textAreaContainer: {
      borderColor: "grey",
      borderWidth: 1,
      padding: 5,
      marginTop:10,
      marginBottom:10
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    
    contentContainer: {
      paddingTop: 50,
    },

    submitButton:{
      backgroundColor:'#3CB371',
      height: 40,
      width: '100%',
      right: 0,
      justifyContent:"center",
      borderRadius: 5       
  
    },
  
    submitButtonTitle:{
      fontSize: 14,
      fontWeight:"bold"
    },
    
  });