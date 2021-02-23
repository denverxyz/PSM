import { Rating } from 'react-native-ratings';
import React from 'react';
import { StyleSheet,View,Text,Image,TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { isEmpty} from '../../utils/index'

export default function CourseCard({navigation,courses}) {

    const CourseCardLists = courses.map((course,index) => (
        <Card containerStyle={styles.card} key={index}  >
        <TouchableOpacity 
            onPress={() => {
                navigation.navigate('CourseDetails', {
                  course: course})}
                }>

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
                    <Text style={styles.textPrice} numberOfLines={1}>{course.price == 0 ? `FREE`:`RM ${course.price}`}</Text>
                </View>

            </View>     
        </TouchableOpacity>
        </Card>
        
    ))


    return (<View>
                {CourseCardLists}
            </View>
    );
}
const WrapContainer = (props) => (
    <View style={[styles.wrapContainer,props.style]}>
        {props.children}
    </View>
);

const styles = StyleSheet.create({
    wrapContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'    },

    container:{
        flex: 1, 
        alignItems: "center",
        flexDirection: 'row',
        padding : 20
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
        textAlign: 'left'
    },
    textAuthor:{
        fontSize: 14,
        fontWeight: '300'
    },
    textPrice:{
        fontSize: 15,
        fontWeight: '500'
    }


})