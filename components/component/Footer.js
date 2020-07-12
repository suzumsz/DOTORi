import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text} from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {useNavigation, useRoute} from '@react-navigation/native';
import normalize from "react-native-normalize";

function Footer(props) {
  const navigation = useNavigation();
    switch(props.screen) {
        case 'Dashboard':
            return (
                <View style={[styles.container, props.style]}>
                  <TouchableOpacity style={styles.buttonWrapper1}>
                    <EntypoIcon name="home" style={styles.icon1}></EntypoIcon>
                    <Text style={styles.btn1Text}>홈</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.activeButtonWrapper}
                    onPress={() =>
                      navigation.navigate('Profile', {
                        token: props.token,
                        data: props.data,
                        password: props.password,
                      })
                  }>
                    <FontAwesomeIcon
                      name="user"
                      style={styles.activeIcon}
                    ></FontAwesomeIcon>
                    <Text style={{fontSize:normalize(13)}}>프로필</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonWrapper2}
                    onPress={() =>
                      navigation.navigate('Passwordedit', {
                        token: props.token,
                        data: props.data,
                        password: props.password,
                      })
                  }>
                    <FontAwesomeIcon name="lock" style={styles.icon2}></FontAwesomeIcon>
                    <Text style={{fontSize:normalize(13)}}>비밀번호변경</Text>
                  </TouchableOpacity>
                </View>
                );
        case 'Profile':
            return (
                <View style={[styles.container, props.style]}>
                  <TouchableOpacity style={styles.buttonWrapper1} onPress={() => navigation.navigate('Dashboard')}>
                    <EntypoIcon name="home" style={styles.activeIcon}></EntypoIcon>
                    <Text style={{fontSize:normalize(13)}}>홈</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.activeButtonWrapper}>
                      <FontAwesomeIcon
                        name="user"
                        style={styles.icon1}
                      ></FontAwesomeIcon>
                      <Text style={styles.btn1Text}>프로필</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonWrapper2}
                    onPress={() =>
                      navigation.navigate('Passwordedit', {
                        token: props.token,
                        data: props.data,
                        password: props.password,
                      })
                  }>
                    <FontAwesomeIcon name="lock" style={styles.activeIcon}></FontAwesomeIcon>
                      <Text style={{fontSize:normalize(13)}}>비밀번호변경</Text>
                  </TouchableOpacity>
                </View>
                );
        case 'Passwordedit':
            return (
                <View style={[styles.container, props.style]}>
                  <TouchableOpacity style={styles.buttonWrapper1} onPress={() => navigation.navigate('Dashboard')}>
                    <EntypoIcon name="home" style={styles.activeIcon}></EntypoIcon>
                    <Text style={{fontSize:normalize(13)}}>홈</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.activeButtonWrapper}
                    onPress={() =>
                      navigation.navigate('Profile', {
                        token: props.token,
                        data: props.data,
                        password: props.password,
                      })
                  }>
                    <FontAwesomeIcon
                      name="user"
                      style={styles.activeIcon}
                    ></FontAwesomeIcon>
                      <Text style={{fontSize:normalize(13)}}>프로필</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonWrapper2}>
                      <FontAwesomeIcon name="lock" style={styles.icon1}></FontAwesomeIcon>
                      <Text style={styles.btn1Text}>비밀번호변경</Text>
                  </TouchableOpacity>
                </View>
                );
        default:
            return null;
    }
    
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    elevation: 3,
    shadowOffset: {
      height: -2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  buttonWrapper1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: normalize(8),
    paddingBottom: normalize(11),
    minWidth: normalize(80),
    maxWidth: normalize(168),
    paddingHorizontal: normalize(12),
    
  },
  icon1: {
    backgroundColor: "transparent",
    color: "rgba(255,132,42,1)",
    fontSize: normalize(24),
   // opacity: 0.8,
    
  },
  btn1Text: {
    backgroundColor: "transparent",
    color: "rgba(255,132,42,1)",
    paddingTop: normalize(4),
    fontSize: normalize(13),
    fontFamily: 'nanum-gothic-regular',
    lineHeight: normalize(12),
    
  },
  activeButtonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: normalize(9),
    paddingBottom: normalize(10),
    minWidth: normalize(80),
    maxWidth: normalize(168),
    paddingHorizontal: normalize(12),
  },
  activeIcon: {
    backgroundColor: "transparent",
    color: "rgba(97,97,97,1)",
    fontSize: normalize(23),
    opacity: 0.8,
  },
  activeContent: {
    backgroundColor: "transparent",
    color: "rgba(158,158,158,1)",
    paddingTop: normalize(4),
    fontSize: normalize(12),
    fontFamily: 'nanum-gothic-regular',
    lineHeight: normalize(12),
  },
  buttonWrapper2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: normalize(9),
    paddingBottom: normalize(10),
    minWidth: normalize(80),
    maxWidth: normalize(168),
    paddingHorizontal: normalize(12)
  },
  icon2: {
    backgroundColor: "transparent",
    color: "#616161",
    fontSize: normalize(25),
    opacity: 0.8,
  },
  btn2Text: {
    backgroundColor: "transparent",
    color: "#9E9E9E",
    paddingTop: normalize(4),
    fontSize: normalize(12),
    fontFamily: 'nanum-gothic-regular',
    lineHeight: normalize(12),
  }
});

export default Footer;
