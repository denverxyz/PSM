import React,{useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image, Alert
} from 'react-native';
import { Rating } from 'react-native-ratings';
import {Card,Button} from 'react-native-elements'
import { TextInput} from 'react-native-paper';
import { connect } from "react-redux";
import Header from '../../../components/Header'
import PaymentHeader from '../../../components/HomeScreen/PaymentHeader'
import BackButton from '../../../components/BackButton'
import {isEmpty} from '../../../utils/index';
import {enrollCourse , enrollReset} from '../actions/paymentActions';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';


const PaymentScreen = ({navigation,user,enrollCourse,enrollReset,enroll_success,enroll_error}) => {

    const [course,setCourse] =useState(navigation.getParam('course'))
    const [formData, setFormData] = useState({
        card_number:"",
        first_name: ((!isEmpty(user))?user.first_name:""),
        last_name: ((!isEmpty(user))?user.last_name:""),
        email: ((!isEmpty(user))?user.email:""),
        phone: ((!isEmpty(user))?user.phone:""),
        address_number:!isEmpty(user)?user.address_number:"",
        address_street:!isEmpty(user)?user.address_street:"",
        address_city:!isEmpty(user)?user.address_city:"",
        address_postal_code:!isEmpty(user)?user.address_postal_code:"",
        address_state:!isEmpty(user)?user.address_state:""
        });

        const { 
            card_number,
            first_name,
            last_name,
            email,
            phone, 
            address_street,
            address_city,
            address_postal_code,
          } = formData;

    const onChange = (inputName,value) =>{
        setFormData({ ...formData, [inputName]: value });
    
      }
    useEffect(
        () => {
            if(!isEmpty(enroll_success)){

                //Alert.alert(enroll_message)
                Alert.alert(
                    '',
                    enroll_success, 
                    [
                        {text: 'OK', onPress: () => {enrollReset();navigation.goBack(null);}},
                    ],
                    {cancelable: false},
                  );
    
            }else if(!isEmpty(enroll_error)){
                Alert.alert(
                    '',
                    enroll_error,
                    [
                      {text: 'OK', onPress: () => {enrollReset();navigation.goBack(null);}},
                    ],
                    {cancelable: false},
                  );
    
            }
        }
    )
    const enroll =()=>{
        enrollCourse(course.id)
    }

    return(
        <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
        <Card >

            <View style={styles.containerCard}>
    
                <Image
                    size="medium"
                    source={{uri:course.image}}
                    style={{width: 120, height: 70}}
                />
                <View style={styles.container2}>
                    <Text style={styles.textTitle} numberOfLines={1}>{course.course_name}</Text>
                    <Text style={styles.textAuthor} numberOfLines={1}>{`${course.instructor_first_name} ${course.instructor_last_name}`}</Text>
                                
                    <View style={styles.container3}>
                    <Rating
                        imageSize={20}
                        type='custom'
                        readonly
                        style={styles.rating}
                        startingValue={course.rating}
                    /><Text>{`(${course.rating})`}</Text>
                    </View>


                    <Text style={styles.textPrice} numberOfLines={1}>{`RM ${course.price}`}</Text>
                </View>

            </View>     
        </Card>
        <Card
        containerStyle={{marginBottom:20}}
        title="Billing Information"
        >
            <TextInput
                style={styles.textinput}
                label='Credit/Debit Card'
                mode ="outlined"
                theme={themetextinput}
                value={card_number}
                onChangeText={value => onChange('card_number',value)}
                keyboardType={'numeric'} 
                maxLength={16}
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
            <Button
                titleStyle={styles.blueButtonTitle}
                buttonStyle={styles.blueButton}
                onPress={ enroll}
                title={'Confirm & Pay'}
                type="solid" />
        </Card>

          
         </ScrollView>
      </View>
    )
}


PaymentScreen.navigationOptions = screenProps =>  ({
    headerBackground:   ()=> <Header/>,
    headerTitleStyle: {
        fontWeight: '100',
      },
    headerTintColor: '#fff',
    headerTitle: () => <PaymentHeader/>,
    headerLeft: () => BackButton(screenProps),
    headerStyle: {
      height: 70
    }
});

const mapStateToProps = state => ({
    user: state.auth.user,
    enroll_error : state.payment.errors,
    enroll_success: state.payment.enroll_message
});

const mapDispatchToProps = {
    enrollCourse,
    enrollReset
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PaymentScreen);

const themetextinput = {
    roundness: 5,
  
    colors: {
      background: '#FDFEFE',
      placeholder: 'black', 
      text: 'black',
      primary: '#1E90FF'}
  }; 

  const styles = StyleSheet.create({

    wrapContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'    },
    containerCard:{
        flex: 1, 
        alignItems: "center",
        flexDirection: 'row',
        padding : 20
    },  
    
    textinput:{
        height: 50,
        fontSize: 13,
        marginBottom: 8,
  },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    contentContainer: {
      paddingTop: 50,
    },
    container2:{
        flex: 1,
        marginLeft:20
    },
    container3:{
        alignItems: "center",                                       
        flexDirection: 'row',

    },
    rating:{
        alignItems: "flex-start",
        left: 0,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 10

    },
    textTitle:{
        fontSize: 15,
        fontWeight: '500'
    },
    textAuthor:{
        fontSize: 14,
        fontWeight: '300'
    },
    textPrice:{
        fontSize: 15,
        fontWeight: '500'
    },
    blueButton:{
        backgroundColor:'#1E90FF',
        height: 45,
        justifyContent:"center",
        marginTop:5,
        borderRadius: 5       
    
      },
    
      blueButtonTitle:{
        fontSize: 16,
      },
    
  });