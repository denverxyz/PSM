import React,{useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { Rating } from 'react-native-ratings';
import {Card,Button, Avatar} from 'react-native-elements'
import { connect } from "react-redux";
import Header from '../../../components/Header'
import CourseDetailsHeader from '../../../components/HomeScreen/CourseDetailsHeader'
import {isEmpty} from '../../../utils/index'
import BackButton from '../../../components/BackButton'
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native'


const CourseDetailsScreen = ({navigation,enrollReset}) => {

    const [course,setCourse] =useState(navigation.getParam('course'))

    const requirements = !isEmpty(course.requirements)?course.requirements.map((req,index) => (
      <View style={{flexDirection:"row",marginBottom:10}} key={index}>
            <Icon style={{padding:3}} color='green' name="check-circle" size={20}/>
            <Text style={{width:'70%',padding:3, color:"grey"}}>{req.description}</Text>
            <Text style={{padding:3,color:"grey"}}>{req.skill_level}</Text>
      </View>

    )):(
      <View style={{flexDirection:"row",marginBottom:10}}>
      <Text style={{width:'100%',textAlign:"center", padding:5, color:"grey"}}>No requirements needed to enroll this course!</Text>
      </View>
    )

    return(
        <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
              <Card
                title={course.course_name}
                image={{uri:course.image}}
                imageStyle={styles.image}
                imageWrapperStyle={styles.imageContainer}>
                  <View style={styles.container3}>
                  <Text style={styles.textPrice} numberOfLines={1}>{course.price == 0 ? 'FREE':`RM ${course.price}`}</Text>

                    <Rating
                        imageSize={20}
                        type='custom'
                        readonly
                        style={styles.rating}
                        startingValue={course.rating}
                    />
                    <Text style={styles.textRating}>{`(${course.rating})`}</Text>
                  </View>

                <Text style={{marginBottom: 10}}>
                  {course.description}
                </Text>
                <Button
                    titleStyle={styles.enrollButtonTitle}
                    buttonStyle={styles.enrollButton}
                    onPress={() => {
                      navigation.navigate('Payment', {
                        course: course})}
                      }
                    title="Enroll Now"
                    type="solid" />
              </Card>
              {/* <Divider style={styles.divider}/> */}
              <Card 
                title="Instructor">
                <View style={styles.authorContainer}>
                      <Avatar
                      rounded
                      size="large"
                      source={{
                        uri:
                          'https://i.ya-webdesign.com/images/avatar-png-1.png',
                      }}
                      containerStyle={styles.avatarContainer}
                      avatarStyle={styles.avatar}
                    />
                    <View style={styles.author2Container}>
                        <Text style={styles.authorTextName}>{`${course.instructor_first_name} ${course.instructor_last_name}`}</Text>
                        <Text style={styles.authorText}>{course.instructor_email}</Text>
                        <Text style={styles.authorText}>{course.instructor_phone}</Text>
                    </View>
                </View>

              </Card>

              {/* <Divider style={styles.divider}/> */}
              <Card 
                containerStyle={{marginBottom:20}}
               title="Requirements">
                {requirements}
              </Card>

          
         </ScrollView>
      </View>
    )
}

CourseDetailsScreen.navigationOptions = screenProps =>  ({
    headerBackground:   ()=> <Header/>,
    headerTitleStyle: {
        fontWeight: '100',
      },
    headerTintColor: '#fff',
    headerTitle: () => <CourseDetailsHeader course={screenProps.navigation.getParam('course')}/>,
    headerLeft: () => BackButton(screenProps),
    headerStyle: {
      height: 70
    }
});

const mapStateToProps = state => ({
});

const mapDispatchToProps = {

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CourseDetailsScreen);

  const styles = StyleSheet.create({
    noCourse:{
      marginTop:50,
      textAlign:"center"
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    image:{
      height: Dimensions.get('window').width >450 ? 450:220,
      padding:20,
    },
    imageContainer:{
      alignContent: 'center',
      width:'100%',
      padding: 10,
    },
    
    contentContainer: {
      paddingTop: 50,
    },
    container3:{
      flexDirection: 'row', justifyContent: 'flex-end', alignItems:"center"

  },
  rating:{
      marginTop: 5,
      marginBottom: 5,
      marginRight: 10

  },
  textRating:{
    color:'grey'
  },
  divider:{
    marginTop: 20,
    marginBottom: 5
  },
  enrollButton:{
    backgroundColor:'#3CB371',
    height: 40,
    width: '100%',
    right: 0,
    justifyContent:"center",
    borderRadius: 5       

  },

  enrollButtonTitle:{
    fontSize: 14,
    fontWeight:"bold"
  },

  authorContainer:{
    alignItems: "center",
    flexDirection:"row"
  },
  author2Container:{
    marginLeft: 20
  },
  authorTextName:{
    fontWeight:"bold",
    paddingBottom:2,
  },
  authorText:{
    color:"grey"
  },
  textPrice:{
    fontSize: 15,
    marginRight:'auto',
    fontWeight: '500'
}
    
  });