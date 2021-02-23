import React from 'react';
import { Image } from 'react-native';

export function DescriptionIcon({style}) {
  return (
    <Image
        source={require(`../../assets/images/badge_desc.png`)}
        fadeDuration={0}
        style={style}
      />
  );
}

export function CompetencyIcon() {
    return (
      <Image
          source={require(`../../assets/images/competency.png`)}
          fadeDuration={0}
          style={{width: 40, height: 40}}
        />
    );
  }

  export function ExpiredIcon() {
    return (
      <Image
          source={require(`../../assets/images/expired.png`)}
          fadeDuration={0}
          style={{width: 40, height: 40}}
        />
    );
  }

  export function HashNemIcon() {
    return (
      <Image
          source={require(`../../assets/images/hash.png`)}
          fadeDuration={0}
          style={{width: 40, height: 40}}
        />
    );
  }

  export function IssueIcon() {
    return (
      <Image
          source={require(`../../assets/images/issue.png`)}
          fadeDuration={0}
          style={{width: 40, height: 40}}
        />
    );
  }

  export function ResultIcon() {
    return (
      <Image
          source={require(`../../assets/images/result.png`)}
          fadeDuration={0}
          style={{width: 40, height: 40}}
        />
    );
  }
  