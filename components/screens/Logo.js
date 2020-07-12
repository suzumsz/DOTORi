import React, { Component } from "react";
import normalize from 'react-native-normalize';
import { StyleSheet, View, Image, ImageBackground, Text } from "react-native";

function Logo(props) {
  return (
    <View style={styles.container}>
      <View style={styles.dotoriTextLogoOrangeStack}>
        <ImageBackground
          source={require("../assets/images/DOTORI.png")}
          resizeMode="contain"
          style={styles.dotoriTextLogoOrange}
          imageStyle={styles.dotoriTextLogoOrange_imageStyle}
        >
        <Image
        source={require("../assets/images/office.png")}
        resizeMode="contain"
        style={styles.office}
      ></Image> 
        </ImageBackground>
        <View style={styles.logoBackground}></View>
        <Image
          source={require("../assets/images/456.png")}
          resizeMode="contain"
          style={styles.dotoriLogo}
        ></Image> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  dotoriTextLogoOrange: {
    top: normalize(44, 'height'),
    width: normalize(116),
    height: normalize(116),
    position: "absolute"
  },
  dotoriTextLogoOrange_imageStyle: {},
  office:{
    width: normalize(112),
    height: normalize(112),
    position: "absolute",
    top: normalize(28),
    marginLeft:'2%'
 },
  logoBackground: {
    top: normalize(0, 'height'),
    width: normalize(75),
    height: normalize(76),
    backgroundColor: "rgba(255,132,42,1)",
    position: "absolute",
    borderRadius: normalize(19)
  },
  dotoriLogo: {
    top: normalize(0, 'height'),
    width: normalize(76),
    height: normalize(76),
    position: "absolute"
  },
  dotoriTextLogoOrangeStack: {
    width: normalize(118),
    height: normalize(161),
    alignItems: "center"
  }
});

export default Logo;
