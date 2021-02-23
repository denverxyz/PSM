import React from 'react';
import { StyleSheet,View,Text,Image,TouchableOpacity } from 'react-native';
import { Card,Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

export default function BadgeCard({navigation,badges}) {

    // const navigateAction = (course) => NavigationActions.navigate({
    //     routeName: 'Learning',
    //     params: {
    //         course: course
    //     },
    //     action: NavigationActions.navigate({ routeName: 'MyCourse',params: {
    //         course: course
    //     }, }),
    // });

    const badgesCardList = badges.map((badge,index) => (
        <Card containerStyle={styles.card} key={index} >
        <TouchableOpacity 
            onPress={() => {
                navigation.navigate('BadgeDetails', {
                badge: badge})}
                }
            //  onPress={() => {
            //     navigation.dispatch(navigateAction(course))}
            //     }
        >
        <View style={styles.badge}>                
                <Image
                    size="medium"
                    source={{uri:badge.badge_url}}
                    style={{width: 110, 
                        height: 110,   
                        marginLeft: 'auto',
                        marginRight: "auto"}}
                />


                    <Text style={styles.badgename} numberOfLines={1}>{badge.badge_name}</Text>
        </View>

        </TouchableOpacity>
        </Card>
    ))


    return (<View style={styles.container}>
                         <WrapContainer>      

                {badgesCardList}

                </WrapContainer>

            </View>
    );
}

const WrapContainer = (props) => (
    <View style={[styles.wrapContainer,props.style]}>
        {props.children}
    </View>
);


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        // marginRight: 'auto',
        // marginLeft:'auto',
        flex: 1,
        alignItems: 'center'

    },

    wrapContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 20
    },
    badgename:{
        marginTop:10,
        marginBottom:10,
        textAlign: "center"
    },
    badge:{
        marginLeft: 'auto',
        marginRight: "auto"
    },

    // containerMain:{
    //     flex: 1, 
    //     padding : 20,
    //     flexWrap: 'wrap',
    //     justifyContent: 'flex-start'

    // // },
    // container:{
    //     alignItems: "center"
    // },
    card:{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,  
        elevation: 3,
        padding: 10,
        // borderRadius: 10,
        marginBottom:10,
        width: 130,
        height: 'auto'
    }


})