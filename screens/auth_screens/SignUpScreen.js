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
import { DefaultTheme,TextInput,Modal,Portal,Provider } from 'react-native-paper';
import { connect } from "react-redux";
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Keyboard} from 'react-native';
import {isEmpty} from '../../utils/index';
import {signUp} from './actions/authActions';
import {getCourses} from '../main_screens/actions/homeActions'



import Moment from 'moment';

const SignUpScreen = (props) => {

    const [formData, setFormData] = useState({
      email: "",
      phone: "+60",
      password: "",
      confirm_password:"",
      first_name: "",
      last_name: "",
      date_of_birth:new Date(),
      address_number:"",
      address_street:"",
      address_city:"",
      address_postal_code:"",
      address_state:""
      });
    
    const [open, setOpen] = useState(false);


    const { 
      email,
      phone, 
      password, 
      confirm_password, 
      first_name, 
      last_name,
      date_of_birth,
      address_number,
      address_street,
      address_city,
      address_postal_code,
      address_state
    } = formData;

    const handleScreen =screen=> ()=>{
        props.navigation.navigate(screen)
    }
    const onChange = (inputName,value) =>{
      setFormData({ ...formData, [inputName]: value });

    }

    const setDate = (event,date) =>{

      setFormData({ ...formData, ['date_of_birth'] : date });
      //Moment(date).format('DD/MM/YYYY')
      setOpen( Platform.OS === 'ios' ? true : false);
    }

    const openDatePicker = () =>{
      Keyboard.dismiss()
      setOpen(true);
    }

    const closeDatePicker = () =>{
      setOpen(false);
    }
    const onSubmit = async e => {
      props.signUp(formData);
    };

    useEffect(() => {
      if (props.isAuthenticated) {
        props.getCourses("")
        props.navigation.navigate("Main");
      }
    });

 

    return(
      <Provider>
      <Portal>
      <Modal 
        visible={open} 
        onDismiss={closeDatePicker}
        theme={themeModal}>
          <Text style={styles.text}>Date of Birth</Text>
          <DateTimePicker
            mode = "date"
            display="default"
            onChange={setDate}
            value={date_of_birth}
            
          />
          <Button
                titleStyle={styles.blackButtonTDOB}
                buttonStyle={styles.blackButtonDOB}
                onPress={closeDatePicker}
                title="CONFIRM"
                type="outline" />
        </Modal>        
        
        <View style={styles.container}>
        <ScrollView
                showsVerticalScrollIndicator={false}
        >


            <TextInput
                style={styles.textinput}
                label='Email'
                mode ="outlined"
                theme={themetextinput}
                value={email}
                onChangeText={value => onChange('email',value)}
            />
            <TextInput
              style={styles.textinput}
              label='Phone Number'
              mode ="outlined"
              theme={themetextinput}
              value={phone}
              onChangeText={value => onChange('phone',value)}
            />
            <TextInput
                style={styles.textinput}
                label='First Name'
                mode ="outlined"
                theme={themetextinput}
                value={first_name}
                onChangeText={value => onChange('first_name',value)}
            />
            <TextInput
                style={styles.textinput}
                label='Last Name'
                mode ="outlined"
                theme={themetextinput}
                value={last_name}
                onChangeText={value => onChange('last_name',value)}
            />
            <TextInput
                style={styles.textinput}
                mode ="outlined"
                theme={themetextinput}
                label='Password'
                value={password}
                secureTextEntry={true}                
                onChangeText={value => onChange('password',value)}
            />
            <TextInput
                style={styles.textinput}
                mode ="outlined"
                theme={themetextinput}
                label='Confirm Password'
                value={confirm_password}
                secureTextEntry={true}                
                onChangeText={value => onChange('confirm_password',value)}
            />
            <TextInput
                style={styles.textinput}
                mode ="outlined"
                theme={themetextinput}
                label='Date of Birth'
                value={Moment(date_of_birth).format('DD/MM/YYYY').toString()}
                onFocus = {openDatePicker}                
            />
            <TextInput
                style={styles.textinput}
                label='Address Number'
                mode ="outlined"
                theme={themetextinput}
                value={address_number}
                onChangeText={value => onChange('address_number',value)}
            />
            <TextInput
                style={styles.textinput}
                label='Address Street'
                mode ="outlined"
                theme={themetextinput}
                value={address_street}
                onChangeText={value => onChange('address_street',value)}
            />
            <TextInput
                style={styles.textinput}
                label='City'
                mode ="outlined"
                theme={themetextinput}
                value={address_city}
                onChangeText={value => onChange('address_city',value)}
            />
            <TextInput
                style={styles.textinput}
                label='Postal Code'
                mode ="outlined"
                theme={themetextinput}
                value={address_postal_code}
                onChangeText={value => onChange('address_postal_code',value)}
            />
            <TextInput
                style={styles.textinput}
                label='State'
                mode ="outlined"
                theme={themetextinput}
                value={address_state}
                onChangeText={value => onChange('address_state',value)}
            />
            
            <Text style={styles.error}>{!isEmpty(props.errors)?props.errors:""}</Text>

            <Button
                titleStyle={styles.blackButtonTitle}
                buttonStyle={styles.blackButton}
                onPress={e => onSubmit(e)}
                title="SIGN UP"
                type="solid" />
            <Button
                titleStyle={styles.redButtonTitle}
                buttonStyle={styles.redButton}
                onPress={handleScreen("Login")}
                title="CANCEL"
                type="solid" />
                        </ScrollView>

        </View>

</Portal>
</Provider>
    );

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.signup_error
});

const mapDispatchToProps = {
  signUp,
  getCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);



const themetextinput = {
  roundness: 5,

  colors: {
    background: '#FDFEFE',
    placeholder: 'black', 
    text: 'black',
    primary: '#1E90FF'}
};
const themeModal = {

  colors: {
    backdrop: '#D3D3D3F2',
}
};

const styles = StyleSheet.create({
    container: {
      flex:1,
      zIndex: -1,
      width: "80%",
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop:80,
      marginBottom:40,
      justifyContent: 'center',
    //alignItems: 'center',
      backgroundColor: '#fff',
    },

    logo:{
        //marginTop: 80,
        width: 150,
        height:150,
        marginBottom: 50,
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    textinput:{
        height: 50,
        fontSize: 13,
        marginBottom: 5,
    },
    error:{
      textAlign: "center",
      color:"red",
      fontSize: 13
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
    redButton:{
      backgroundColor:'red',
      height: 50,
      justifyContent:"center",
      marginTop:5,
      borderRadius: 5       

    },

    redButtonTitle:{
      fontSize: 16,
    },

    blackButtonDOB:{
      height: 50,
      width: 300,
      marginLeft:'auto',
      marginRight: 'auto',
      justifyContent:"center",
      marginTop:50,
      borderRadius: 5, 
      borderWidth:1.5,     
      borderColor: 'black' 

    },

    blackButtonTDOB:{
      fontSize: 14,
      fontWeight: '500',
      color: 'black'
    },


    text:{ 
      textAlign: 'center',
      marginBottom: 60,
      fontSize: 24,
     }

  });
  