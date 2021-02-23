import React from 'react';
import { StyleSheet,Text,View } from 'react-native';





const BadgeDetailsHeader = ({badge}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{badge.badge_name}</Text>
        </View>


    );
}


export default BadgeDetailsHeader;
  


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
