import React,{useState} from 'react';
import { StyleSheet,Text,View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { connect } from "react-redux";
import {logOut} from '../../screens/auth_screens/actions/authActions'




const ProfileHeader = ({logOut, user}) => {

    const onclick = () =>{
        logOut()
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`${user.first_name} ${user.last_name}`}</Text>
            <Button
                titleStyle={styles.redButtonTitle}
                buttonStyle={styles.redButton}
                onPress = {onclick}
                title="SIGN OUT"
                type="solid" />
        </View>


    );
}
const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = {
    logOut
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfileHeader);
  


const styles = StyleSheet.create({
    title:{
        color:"white",
        fontWeight:"200",
        padding: 5,
        fontSize: 18
    },
    container: {
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    redButton:{
        backgroundColor:'#B22222A6',
        height: 30,
        width: 120,
        right: 0,
        justifyContent:"center",
        borderRadius: 5       
  
      },
  
      redButtonTitle:{
        fontSize: 10,
        fontWeight:"200"
      },
})
