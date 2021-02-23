import React,{useEffect} from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import BadgeHeader from '../../../components/BadgeScreen/BadgeHeader'
import Header from '../../../components/Header'
import {isEmpty} from '../../../utils/index'
import { connect } from "react-redux";
import {getBadges} from "../../main_screens/actions/badgeAction";
import BadgeCard from "../../../components/BadgeScreen/BadgeCard";

const BadgeScreen = ({isAuthenticated,loading,navigation,getBadges,badges}) => {


  const getMyBadges = () =>{
    getBadges()
  }

  return( 

    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getMyBadges} />}
    
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {(!isEmpty(badges))?<BadgeCard navigation={navigation} badges={badges}/>:<Text style={styles.noBadge}>You don't have any badges</Text>}
      </ScrollView>
      </View>
  ) 

}

BadgeScreen.navigationOptions = {
  headerBackground:   ()=><Header/>,
  headerTitle: () => <BadgeHeader/>,
  headerStyle: {
    height: 70
  }};

  
const mapStateToProps = state => ({
  loading: state.badge.loading,
  badges: state.badge.badges
});

const mapDispatchToProps = {
getBadges
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BadgeScreen);


const styles = StyleSheet.create({
  noBadge:{
    marginTop:50,
    textAlign:"center"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  contentContainer: {
    paddingTop: 50,
  },
  
});
