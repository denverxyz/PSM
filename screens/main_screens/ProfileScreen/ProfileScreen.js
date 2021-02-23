import React, {useState,useEffect} from 'react';
import { StyleSheet,ScrollView,View } from 'react-native';
import Header from '../../../components/Header';
import ProfileHeader from '../../../components/ProfileScreen/ProfileHeader';
import { TextInput} from 'react-native-paper';
import { connect } from "react-redux";
import { Avatar,Button } from 'react-native-elements';
import {isEmpty} from '../../../utils/index'
import signout from '../../../utils/signout'
import {updateUser} from '../../auth_screens/actions/authActions';

const ProfileScreen = ( {isAuthenticated, navigation,user, loading, updateUser} ) => {
  
  useEffect(()=>{
    if (!isAuthenticated) {
      signout(navigation)    
    }
  },[isAuthenticated])

  const [formData, setFormData] = useState({
    phone: ((!isEmpty(user.phone))?user.phone:""),
    address_number:!isEmpty(user.address_number)?user.address_number:"",
    address_street:!isEmpty(user.address_street)?user.address_street:"",
    address_city:!isEmpty(user.address_city)?user.address_city:"",
    address_postal_code:!isEmpty(user.address_postal_code)?user.address_postal_code:"",
    address_state:!isEmpty(user.address_state)?user.address_state:""
    });
  


  const { 
    phone, 
    address_number,
    address_street,
    address_city,
    address_postal_code,
    address_state
  } = formData;

  const onChange = (inputName,value) =>{
    setFormData({ ...formData, [inputName]: value });

  }

  return (
    <View style = {styles.container}>

       <ScrollView
        //style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
            <Avatar
        rounded
        size="xlarge"
        source={{
          uri:
            !isEmpty(user.avatar)?`${user.avatar}`:
            'https://www.shareicon.net/data/2016/07/05/791213_man_512x512.png',
        }}
        containerStyle={styles.avatarContainer}
        avatarStyle={styles.avatar}
      />
            <TextInput
                disabled
                style={styles.textinput}
                label='Email'
                mode ="outlined"
                theme={themetextinput}
                value={user.email}
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
                disabled
                style={styles.textinput}
                mode ="outlined"
                theme={themetextinput}
                label='Date of Birth'
                value={user.date_of_birth}               
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
            <Button
                titleStyle={styles.blackButtonTitle}
                buttonStyle={styles.blackButton}
                loading={loading}
                disabled = {loading}
                disabledStyle={styles.blackButton}
                disabledTitleStyle={styles.blackButtonTitle}
                onPress={()=>{
                  updateUser(formData)
                }}
                title="UPDATE"
                type="solid" />
      </ScrollView>

    </View>
  );
}

ProfileScreen.navigationOptions = {
  headerBackground:   ()=><Header/>,
  headerTitle: () =><ProfileHeader/>,
  headerStyle: {
    height: 70
  }
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  loading: state.auth.loading_user
});

const mapDispatchToProps = {
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);

const themetextinput = {
  roundness: 5,

  colors: {
    background: '#FDFEFE',
    placeholder: 'black', 
    text: 'black',
    primary: '#1E90FF'}
}; 
const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20    
  },

  scrollContainer: {
    paddingBottom:20,
  },
  avatarContainer : {
    marginTop: 50,
    marginBottom: 50,
    marginRight:"auto",
    marginLeft: "auto",    borderColor:"black"

  },
  avatar :{
    borderColor:"black",
    backgroundColor: "transparent"
  },
  textinput:{
    height: 50,
    fontSize: 13,
    marginBottom: 5,
  },
  blackButton:{
    backgroundColor:'#1E90FF',
    height: 45,
    justifyContent:"center",
    marginTop:5,
    borderRadius: 5       

  },

  blackButtonTitle:{
    fontSize: 16,
  },
})