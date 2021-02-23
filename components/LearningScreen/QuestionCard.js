import React,{useState, useEffect} from 'react';
import { StyleSheet,View,Text,Image,TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from "react-redux";

function QuestionCard({navigation,questions,loading}) {

    // const [complete_q,setComplete_q] = useState(0)
    // useEffect(()=>{
    //     questions.map((question,index) => {
    //         if (question.status === 'COMPLETE'){
    //             setComplete_q(complete_q+1)
    //         }
    //     })
    //     // console.log(questions.length)
    // })


    const QuestionCardList = questions.map((question,index) => (
        <TouchableOpacity 
            onPress={() => {
            navigation.navigate('Question', {
              question: question})}
            }
            key={question.id}>

            <Card containerStyle={styles.container} >

            <View style={{alignItems:"center",}}>
                <Text style={styles.text}>{`Question ${question.question_number}`}</Text>
            </View>

            </Card>

        </TouchableOpacity>
    ))
    return (<View style={{marginBottom:20}}>
                {QuestionCardList}
            </View>
    );
}

const mapStateToProps = state => ({
    loading: state.learning.loading_update_answer
  });

  
  const mapDispatchToProps = {
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionCard);


const styles = StyleSheet.create({

    container:{
        flex: 1, 
        alignContent:"center",
        padding : 20
    },
    card:{

        padding: 0,
        height: 50,
        marginBottom:10
    },
    text:{
        textAlign:"center",
        marginRight:"auto",
        marginLeft:"auto",
        fontSize:15,
        fontWeight:'bold'

    }
})