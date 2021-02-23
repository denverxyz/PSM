import React from 'react';
import { StyleSheet,Text,View } from 'react-native';
import { Rating } from 'react-native-ratings';





const CourseDetailsHeader = ({course}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title} numberOfLines={1}>{course.course_name}</Text>
            <Text style={styles.textAuthor} numberOfLines={1}>{`By ${course.instructor_first_name} ${course.instructor_last_name}`}</Text>

        </View>


    );
}


export default CourseDetailsHeader;
  


const styles = StyleSheet.create({
    rating:{
        alignItems: "flex-start",
        left: 0,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 10

    },
    textAuthor:{
        color: 'white',
        fontSize: 14,
        fontWeight: '100'
    },
    title:{
        color:"white",
        fontWeight:"200",
        padding: 0,
        fontSize: 18
    },    
    container3:{
        alignItems: "center",                                       
        flexDirection: 'row',

    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }

})
