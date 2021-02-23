import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';


export default function Header(props) {
  return (
    <ImageBackground
        style={{ width: "100%", height: 150}}
        imageStyle={styles.imageStyle}
        source={require('../assets/images/header.png')}
    >

    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imageStyle:{
      borderBottomRightRadius:40,
      borderBottomLeftRadius:40
  }
})