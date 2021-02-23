import React,{useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,Image,
  Linking,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {Card,Button} from 'react-native-elements'
import { connect } from "react-redux";
import Header from '../../../components/Header'
import {isEmpty} from '../../../utils/index'
import BackButton from '../../../components/BackButton'
import { Divider } from 'react-native-paper';
import {DescriptionIcon, CompetencyIcon, IssueIcon, ResultIcon, ExpiredIcon, HashNemIcon} from '../../../components/icons/BadgeIcons'
import BadgeDetailsHeader from '../../../components/BadgeScreen/BadgeDetailsHeader'
// import DownloadBadge from '../../../components/BadgeScreen/DownloadBadge'

const BadgeDetailsScreen = ({navigation}) => {

    const [badge,setBadge] =useState(navigation.getParam('badge'))

    const handleClick = (url) => {
        Linking.openURL(url).catch(err => console.error("An error occurred", err));
    };

    return(
        <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
              <Card>
                <View style={styles.imageContainer}>
                <TouchableOpacity 
                    onPress={() => {
                        handleClick(badge.badge_url)
                       }
                            }
                    style={{
                        marginRight:'auto',
                        marginLeft:'auto'
                    }}>

                    <Image
                        size="medium"
                        source={{uri:badge.badge_url}}
                        style={{width: 130, 
                            height: 130}}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => {
                        handleClick(badge.qr_code)
                       }
                            }
                            style={{
                                marginRight:'auto',
                                marginLeft:'auto'
                            }}>

                    <Image
                        size="medium"
                        source={{uri:badge.qr_code}}
                        style={{width: 130, 
                            height: 130}}
                    />
                </TouchableOpacity>
               
                </View>


                {/* <Button
                    titleStyle={styles.downloadButtonTitle}
                    buttonStyle={styles.downloadButton}
                    // onPress={() => {
                    //   DownloadBadge(badge.badge_url)
                    //   }}
                    title="Download"
                    type="solid" /> */}
              </Card>
              <Card>
                  <View style={styles.badgedetailsContainer}>
                        <DescriptionIcon 
                            style={{
                                width: 40, 
                                height: 40,
                            }}
                        />

                        <View style={styles.badgeTextContainer}>
                            <Text style={styles.badgeTextTitle}>Badge Description</Text>

                            <View style={styles.badgeTextContainer2}>
                                <Text style={styles.badgeDetails}>
                                    {badge.badge_description} 
                                </Text>
                            </View>
                        </View>
                  </View>
              </Card>

              <Card>
                  <View style={styles.badgedetailsContainer}>
                        <CompetencyIcon/>

                        <View style={styles.badgeTextContainer}>
                            <Text style={styles.badgeTextTitle}>Competency</Text>

                            <View style={styles.badgeTextContainer2}>
                                <Text style={styles.badgeDetails}>
                                    {`Recipient competency is: ${(badge.badge_level).toLowerCase()} level`} 
                                </Text>
                            </View>
                        </View>
                  </View>
              </Card>

              <Card>
                  <View style={styles.badgedetailsContainer}>
                        <IssueIcon/>

                        <View style={styles.badgeTextContainer}>
                            <Text style={styles.badgeTextTitle}>Date Issuance</Text>

                            <View style={styles.badgeTextContainer2}>
                                <Text style={styles.badgeDetails}>
                                    {badge.badge_issue} 
                                </Text>
                            </View>
                        </View>
                  </View>
              </Card>

              <Card>
                  <View style={styles.badgedetailsContainer}>
                        <ResultIcon/>

                        <View style={styles.badgeTextContainer}>
                            <Text style={styles.badgeTextTitle}>Assessment Result</Text>

                            <View style={styles.badgeTextContainer2}>
                                <Text style={styles.badgeDetails}>
                                    {`Recipient achieved ${badge.result}%`} 
                                </Text>
                            </View>
                        </View>
                  </View>
              </Card>

              <Card>
                  <View style={styles.badgedetailsContainer}>
                        <ExpiredIcon/>

                        <View style={styles.badgeTextContainer}>
                            <Text style={styles.badgeTextTitle}>Badge Expiry Date</Text>

                            <View style={styles.badgeTextContainer2}>
                            {isEmpty(badge.badge_expired)? 
                            <Text style={styles.badgeDetails}>This badge does not have expiry date</Text>
                            :
                            <Text style={styles.badgeDetails}>{badge.badge_expired}</Text>
                            }   
                            </View>
                        </View>
                  </View>
              </Card>
              <Card containerStyle={{marginBottom:20}}>
                  <View style={styles.badgedetailsContainer}>
                        <HashNemIcon/>

                        <View style={styles.badgeTextContainer}>
                            <Text style={styles.badgeTextTitle}>Transaction Hash Blockchain</Text>

                            <View style={styles.badgeTextContainer2}>
            
                                <Text style={styles.badgeDetails}>{badge.hash}</Text>

                            </View>
                            

                        </View>
                        
                  </View>
                  <Button
                                titleStyle={styles.downloadButtonTitle}
                                buttonStyle={styles.downloadButton}
                                onPress={() => {
                                 handleClick(`http://bob.nem.ninja:8765/#/transfer/${badge.hash}`)
                                }
                                  }
                                title="Check Validity"
                                type="solid" />
              </Card>

              {/* http://bob.nem.ninja:8765/#/transfer/ */}
          
         </ScrollView>
      </View>
    )
}

BadgeDetailsScreen.navigationOptions = screenProps =>  ({
    headerBackground:   ()=> <Header/>,
    headerTitleStyle: {
        fontWeight: '100',
      },
    headerTintColor: '#fff',
    headerTitle: () => <BadgeDetailsHeader badge={screenProps.navigation.getParam('badge')}/>,
    headerLeft: () => BackButton(screenProps),
    headerStyle: {
      height: 70
    }
});

const mapStateToProps = state => ({
});

const mapDispatchToProps = {

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(BadgeDetailsScreen);

  const styles = StyleSheet.create({
    badgeTextContainer:{
        marginLeft:20,
        marginRight:20
    },
    badgeTextContainer2:{
        flexDirection:'row'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    contentContainer: {
        paddingTop: 50,
      },
      badgedetailsContainer:{
        alignItems: "center",
        margin:5,
        flex: 1,
        flexDirection: "row"
      },
      imageContainer:{
          margin:20,
          flex: 1,
          flexDirection: "row"
      },

      downloadButton:{
        backgroundColor:'#3CB371',
        height: 40,
        marginTop:20,
        width: '100%',
        right: 0,
        justifyContent:"center",
        borderRadius: 5       
    
      },
    
      downloadButtonTitle:{
        fontSize: 14,
        fontWeight:"bold"
      },
      badgeDetails:{
        padding:5, 
        flexShrink: 1,
        width:'95%', 
        flexWrap: 'wrap'
      },
      badgeTextTitle:{
        padding:5, 
        fontWeight:'bold'
      }
  });