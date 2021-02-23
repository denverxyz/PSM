import React from 'react';
import { Image } from 'react-native';

export default class BadgeIconBlack extends React.Component {
  render() {
    return (
      <Image
        source={require('../../assets/images/badge_black_icon.png')}
        fadeDuration={0}
        style={{width: 23, height: 24}}
      />
    );
  }
}