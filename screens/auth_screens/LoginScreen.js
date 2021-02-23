import React,{useState,useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {isEmpty} from "../../utils/index"
import { connect } from "react-redux";
import { DefaultTheme,TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import {login} from './actions/authActions';
import {getCourses} from '../main_screens/actions/homeActions'
import {getMyCourses} from '../main_screens/actions/courseActions'
import { SocialIcon } from 'react-native-elements';



const LoginScreen = ( props ) => {
    const [formData, setFormData] = useState({
      email: "",
      password: ""
      });

    const { email, password } = formData;

    const onChange = (inputName,value) =>
      setFormData({ ...formData, [inputName]: value });

    const onSubmit = async e => {
      props.login(email, password);
    };

    const handleScreen = screen => ()=>{
      props.navigation.navigate(screen)
    }

    useEffect(() => {
      if (props.isAuthenticated) {
        props.getCourses("")
        props.navigation.navigate("Main");
      }
    });

    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/images/uself.png')}
            />
            <Text style={styles.error}>{!isEmpty(props.errors)?props.errors:""}</Text>

            <TextInput
                style={styles.textinput}
                label='Email'
                mode ="outlined"
                theme={!isEmpty(props.errors)?themetextinputerror:themetextinput}
                value={email}
                onChangeText={value => onChange('email',value)}
            />
            <TextInput
                style={styles.textinput}
                mode ="outlined"
                theme={!isEmpty(props.errors)?themetextinputerror:themetextinput}
                label='Password'
                value={password}
                secureTextEntry={true}
                onChangeText={value => onChange('password',value)}           
            />

            <Button
                titleStyle={styles.blackButtonTitle}
                buttonStyle={styles.blackButton}
                onPress={e => onSubmit(e)}
                title="SIGN IN"
                type="solid" />
            
            <Button 
                titleStyle={styles.loginButtonTitle}
                buttonStyle={styles.loginButton}
                title="GETTING STARTED"
                onPress={handleScreen("SignUp")}
                type="outline" 
                // icon={
                //   <Image
                //     style={styles.logoGoogle}
                //     source={require('../../assets/images/google.svg')}
                //   />
                // } 
            />
              

        </View>

    );

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.login_error
});

const mapDispatchToProps = {
  login,
  getCourses
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);




const themetextinput = {
    roundness: 5,

    colors: {
      background: '#FDFEFE',
      placeholder: 'black', 
      text: 'black',
      primary: '#1E90FF'}
};

const themetextinputerror = {
  roundness: 5,

  colors: {
    background: '#FDFEFE',
    placeholder: 'red', 
    text: 'black',
    primary: 'red'}
};

const styles = StyleSheet.create({
    container: {
      width: "80%",
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
      justifyContent: 'center',
    //alignItems: 'center',
      backgroundColor: '#fff',
    },

    logo:{
        //marginTop: 80,
        width: 250,
        height:230,
        marginBottom: 50,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    logoGoogle:{
      marginRight: 10,
      width: 20,
      height:20
  },

    textinput:{
        height: 45,
        fontSize: 14,
        justifyContent:"center"
    },

    error:{
      height:20,
      textAlign: "center",
      color:"red"
    },

    blackButton:{
        backgroundColor:'black',
        height: 50,
        justifyContent:"center",
        marginTop:5,
        borderRadius: 5       

    },

    blackButtonTitle:{
      fontSize: 16,
    },
    loginButtonTitle:{
      fontSize: 16,
      color: '#008DFF'
    },

    loginButton:{
      height: 50,
      borderColor: '#008DFF',
      borderWidth: 1,
      justifyContent:"center",
      marginTop:5,
      borderRadius: 5
    }

  });
  