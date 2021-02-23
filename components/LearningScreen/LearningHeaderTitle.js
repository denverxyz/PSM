import React from 'react';
import { StyleSheet,Text,View } from 'react-native';
import { Rating } from 'react-native-ratings';





const LearningHeaderTitle = ({title}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>


    );
}


export default LearningHeaderTitle;
  


const styles = StyleSheet.create({

    title:{
        color:"white",
        fontWeight:"200",
        padding: 0,
        fontSize: 18
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }

})
