import { Rating } from 'react-native-ratings';
import React from 'react';
import { StyleSheet,View,Text,Image,TouchableOpacity } from 'react-native';
import { Card,Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from "react-redux";
import {writeBadge} from "../../screens/main_screens/actions/badgeAction";

function MyCoursesCards({navigation,my_courses,writeBadge,loading,user}) {

    const navigateAction = (course) => NavigationActions.navigate({
        routeName: 'Learning',
        params: {
            course: course
        },
        action: NavigationActions.navigate({ routeName: 'MyCourse',params: {
            course: course
        }, }),
      });

    const badgeRequest = (course) => {

        writeBadge(
            course.course_id,
            user.id
        )



    }

    const CourseCardLists = my_courses.map((course,index) => (
        <Card containerStyle={styles.card} key={course.course_id} >
        <TouchableOpacity 
             onPress={() => {
                navigation.dispatch(navigateAction(course))}
                }>
        <View style={styles.containerMain}>            
        <View style={styles.container}>
    
                <Image
                    size="medium"
                    source={{uri:course.image}}
                    style={{width: 120, height: 70}}
                />
                <View style={styles.container2}>

                    <Text style={styles.textTitle} numberOfLines={1}>{course.course_name}</Text>
                    <Text style={styles.textAuthor} numberOfLines={1}>{`${course.instructor_first_name} ${course.instructor_last_name}`}</Text>
                                
                    <View style={styles.container3}>
                    <Rating
                        imageSize={20}
                        type='custom'
                        readonly
                        style={styles.rating}
                        startingValue={course.rating}
                    /><Text>{`(${course.rating})`}</Text>
                    </View>


                    <Text style={styles.textPrice} numberOfLines={1}>{course.status}</Text>

                </View>

        </View>  
        {course.status === 'COMPLETE' ?
            <Button
            titleStyle={styles.badgeButtonTitle}
            buttonStyle={styles.badgeButton}
            disabled = {loading}
            disabledStyle={styles.badgeButton}
            disabledTitleStyle={styles.badgeButtonTitle}
            loading = {loading}
            onPress={()=>{badgeRequest(course)}}
            title="Get My Badge"
            type="solid" /> :null

        } 
        </View>
        </TouchableOpacity>
        </Card>
    ))


    return (<View>
                {CourseCardLists}
            </View>
    );
}

const mapStateToProps = state => ({
    loading: state.badge.loading,
    user: state.auth.user  
});
  
const mapDispatchToProps = {
    writeBadge
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCoursesCards);


const styles = StyleSheet.create({
    wrapContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'    },

    containerMain:{
        flex: 1, 
        padding : 20
    },
    container:{
        flex: 1, 
        alignItems: "center",
        flexDirection: 'row',
    },
    card:{
        flex: 1, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,  
        elevation: 3,
        padding: 0,
        borderRadius: 10,
        marginBottom:10
    },
    container2:{
        flex: 1,
        marginLeft:20
    },
    container3:{
        alignItems: "center",                                       
        flexDirection: 'row',

    },
    rating:{
        alignItems: "flex-start",
        left: 0,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 10

    },
    textTitle:{
        fontSize: 15,
        fontWeight: '500',
        
    },
    textAuthor:{
        fontSize: 14,
        fontWeight: '300'
    },
    textPrice:{
        fontSize: 15,
        fontWeight: '500'
    },
    badgeButton:{
        marginTop: 15,
        backgroundColor:'#3CB371',
        height: 40,
        width: '100%',
        right: 0,
        justifyContent:"center",
        borderRadius: 5       
    
      },
    
      badgeButtonTitle:{
        fontSize: 14,
        fontWeight:"bold"
      },


})