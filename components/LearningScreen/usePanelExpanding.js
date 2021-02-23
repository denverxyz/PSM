
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet
  } from 'react-native'

  const usePanelExpanding = (props,module) => {


    let icons = {
      'up': require('../../assets/images/chevron-up.png'),
      'down': require('../../assets/images/chevron-down.png')

      }

      const [expanded, setExpanded] = useState(false);
      const [iconShow, setIconShow] = useState('up');
      const [textSwap, setTextSwap] = useState('Show more...');


      useEffect(
        () => {
          expanded ? setIconShow('up') : setIconShow('down')
          expanded ? setTextSwap('Show less') : setTextSwap('Show more ...')
        },
        [expanded]
      );

      const toggle = () =>{
        setExpanded(!expanded)
      }

      const panel = (<View>
        <View  >
            <TouchableOpacity
                onPress={toggle} >
                  <View style={{flexDirection:"row",alignItems:"center",}}>
                
                    <Text style={{marginRight:"auto",fontSize:15, fontWeight:"bold"}}>{`Module ${module.module_number}`}</Text>
                    <Image
                    source={icons[iconShow]} />
                  </View>
            </TouchableOpacity>
        </View>
        {expanded && <View>
            {props}
        </View>
      }
      </View>)
      return {
        panel,
        toggle
      }
  }
  export default usePanelExpanding