import React from 'react';
import { StyleSheet,Text,View } from 'react-native';





const BadgeHeader = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{'My Badges'}</Text>
        </View>


    );
}


export default BadgeHeader;
  


const styles = StyleSheet.create({
    title:{
        color:"white",
        fontWeight:"200",
        padding: 5,
        fontSize: 18
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }

})
