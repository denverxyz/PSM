import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-elements';
import {
    StyleSheet
  } from 'react-native';
export default function BackButton(screenProps) {
  return (
    <Button 
    onPress={ () => { screenProps.navigation.goBack() } }
    buttonStyle={styles.button}
    icon={ <Icon style={styles.searchIcon} color='#fff' name="chevron-left" size={20}/>}>
    </Button>
  );
}
const styles = StyleSheet.create({
    searchIcon: {
        backgroundColor: 'transparent',
        padding:2
    },
    button: {
        width:50,
        height:40,
        backgroundColor: 'transparent',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        borderTopLeftRadius:0,
        borderBottomLeftRadius:0,
    },
})
