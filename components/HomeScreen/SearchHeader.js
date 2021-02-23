import React,{useState} from 'react';
import { StyleSheet,TextInput,View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import {getCourses} from '../../screens/main_screens/actions/homeActions'
import { connect } from "react-redux";



const SearchHeader = ({getCourses}) => {

    const [search, setSearch] = useState('');
    const onChangeText = (text) =>{
        setSearch(text)
    }

    const onClick = () =>{
        getCourses(search)
    }

    return (
        <View style={styles.searchSection}>
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeText(text)}
                placeholder={'Search'}
                value={search}
            />
        <Button 
            onPress={onClick}
            buttonStyle={styles.button}
            icon={ <Icon style={styles.searchIcon} name="search" size={20} color="#000"/>}>
        </Button>
        </View>


    );
}

const mapStateToProps = state => ({
    courses: state.home.courses,
    loading : state.home.loading,
    errors: state.home.errors
  });
  
  const mapDispatchToProps = {
    getCourses
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchHeader);
  


const styles = StyleSheet.create({
    input:{
        height:40,   
        minWidth:'60%',
        borderColor: 'black',
        backgroundColor: 'white',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        padding:10
    },
    searchSection: {
        width: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center'
        //backgroundColor: '#fff',
    },
    searchIcon: {
        backgroundColor: 'transparent',
        padding:2
    },
    button: {
        width:50,
        height:40,
        backgroundColor: '#fff',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        borderTopLeftRadius:0,
        borderBottomLeftRadius:0,
    },
})
