import React, {useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

function AttendList(props) {
  const {data} = props;
  console.log('AttendList Component...................................');
  console.log('AttendList Component...................................');
  console.log(data);

  return (
    <View style={styles.nowRect}>
      <View style={styles.group425}>
        <View style={styles.endLogoIconRow}>
          <Image
            source={require('../assets/images/7892.png')}
            resizeMode="contain"
            style={styles.endLogoIcon}></Image>
          <Text style={styles.loremIpsum6552}>test</Text>
          <Text style={styles.loremIpsum3352}>test</Text>
          <Image
            source={require('../assets/images/828282.png')}
            resizeMode="contain"
            style={styles.endCheckIcon}></Image>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nowRect: {
    width: 307,
    height: 70,
    backgroundColor: 'rgba(255,255,255,1)',
    elevation: 27,
    borderRadius: 18,
    borderColor: 'rgba(255,132,42,1)',
    borderWidth: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.07,
    shadowRadius: 9,
  },
  group425: {
    width: 261,
    height: 31,
    flexDirection: 'row',
    marginTop: 19,
    marginLeft: 21,
  },
  endLogoIconRow: {
    height: 31,
    flexDirection: 'row',
    flex: 1,
  },
  endLogoIcon: {
    width: 31,
    height: 31,
  },
  loremIpsum6552: {
    color: 'rgba(0,0,0,1)',
    fontSize: 14,
    fontFamily: 'nanum-gothic-regular',
    marginLeft: 19,
    marginTop: 8,
  },
  loremIpsum3352: {
    color: 'rgba(0,0,0,1)',
    fontSize: 14,
    fontFamily: 'nanum-gothic-800',
    marginLeft: 29,
    marginTop: 8,
  },
  endCheckIcon: {
    width: 13,
    height: 13,
    marginLeft: 32,
    marginTop: 9,
  },
});

export default AttendList;
