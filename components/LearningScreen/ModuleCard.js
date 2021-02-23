import { Rating } from 'react-native-ratings';
import React,{useState} from 'react';
import { StyleSheet,View,Text,Image,TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import usePanelExpanding from './usePanelExpanding';
import { MaterialIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native'



export default function ModuleCard({modules}) {


    const [play,setPlay] =useState(false)

    const handlePlayAndPause = () => {  
        setPlay(!play)
        return null
        
      }

    const expandingBioObject = (module) => usePanelExpanding(

        <View style={{flex:1}}>
            
        {/* <Video	  
            style={{ width:'100%', height: 300 }}
            shouldPlay={play}
            isMuted={false}    
            source={{uri: 'https://apostille-badge.s3-ap-southeast-1.amazonaws.com/node_js_video_intro.mp4' }}
        />             */}

        <WebView
                    style={ { width:'auto', height: Dimensions.get('window').width >500 ? 500:198, marginTop: (Platform.OS == 'ios') ? 20 : 0,} }
                    
                    javaScriptEnabled={true}
                    domStorageEnabled={false}
                    source={{uri: module.media }}
                />
        
        <Text style={{marginTop:20,textAlign:"center",fontWeight:"bold"}}>Descriptions</Text>

        <Text style={{marginTop:20}}>{module.module_description}</Text>

        {/* <View style={styles.controlBar}>

        <MaterialIcons 
            name={play ? "pause" : "play-arrow"} 
            size={45} 
            color="white" 
            onPress={handlePlayAndPause} 
        />
        </View> */}

        </View>

    ,module)


    const Modules = modules.map((module,index) => (
        <Card key={index}>
        {expandingBioObject(module).panel}
        </Card>
    ))


    return (<View style={{marginBottom:20}}>
                {Modules}
            </View>
    );
}

const styles = StyleSheet.create({

    container:{
        flex: 1, 
        alignItems: "center",
        flexDirection: 'row',
        padding : 20
    },
})