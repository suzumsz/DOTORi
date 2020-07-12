import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  FeatherIcon,
  ScrollView,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator,useNavigation, useRoute} from '@react-navigation/native';
import normalize from 'react-native-normalize';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import Footer from '../component/Footer';
import AsyncStorage from '@react-native-community/async-storage';
 
    

function Passwordedit(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const [token, setToken] = useState(route.params.token);
  const [data, setData] = useState(route.params.data);
  const [password, setPassword] = useState(route.params.password);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [keyboardstate, setKeyboardstate] = useState('absolute');

  const [textInput1, setTextInput1] = useState();
  const [textInput2, setTextInput2] = useState();
  const [textInput3, setTextInput3] = useState();
 
  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardstate('absolute');
  })
  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardstate('relative');
  })

  useEffect(() => {

    const listenNavigation = navigation.addListener('state', () => {
      
      setData(route.params.data);
      setToken(route.params.token);
      setPassword(route.params.password);
      
      console.log("PasswordEdit Addlistner....");
    });

    return () => {
      listenNavigation();
    }
  });

  
  return (
    <View style={styles.container}>
      <View style={styles.backIcon2RowRow}>
        <View style={styles.backIcon2Row}>
          <Icon
            name="arrow-left"
            style={styles.backIcon2}
          onPress={() => navigation.goBack()}></Icon>
          <Text style={styles.editPass}>비밀번호변경</Text>
          <TouchableOpacity
          onPress={() => {
            console.log('비밀번호 변경......');
            if (passwordCheck == password) {
              if (newPassword == newPasswordCheck && newPassword != '') {
                ChangePassword(newPassword);
                textInput1.clear();
                textInput2.clear();
                textInput3.clear();
              } else {
                if (newPassword != null) {
                  alert('변경할 비밀번호를 입력해주시기 바랍니다.');
                } else {
                  alert(
                    '변경할 비밀번호가 일치하지 않습니다.\n다시 입력해주시기 바랍니다.',
                  );
                }
              }
            } else {
              alert('비밀번호가 일치하지 않습니다.\n다시 입력해주시기 바랍니다.');
            }
          }}>
          <Icon
            name="check"
            style={styles.confirmIcon}
          ></Icon>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
      <View style={styles.passCircle}>
        <TextInput
          ref={(input) => {
            setTextInput1(input)
          }}
          secureTextEntry={true}
          placeholder="현재비밀번호"
          style={styles.password}
          placeholderTextColor="#828282"
          style={{fontSize:normalize(14)}} 
          onChangeText={(text) => setPasswordCheck(text)}></TextInput>
      </View>
      <View style={styles.newPassCircle}>
        <TextInput
          ref={(input) => {
            setTextInput2(input)
          }}
          secureTextEntry={true}
          placeholder="새비밀번호"
          style={styles.newPass2}
          placeholderTextColor="#828282"
          style={{fontSize:normalize(14)}}
          onChangeText={(text) => setNewPassword(text)}></TextInput>
      </View>
      <View style={styles.newPassConfirmCircle}>
        <TextInput
          ref={(input) => {
            setTextInput3(input)
          }}
          secureTextEntry={true}
          placeholder="새비밀번호확인"
          placeholderTextColor="#828282"
          style={styles.newPassConfirm2}
          style={{fontSize:normalize(14)}}
          onChangeText={(text) => setNewPasswordCheck(text)}></TextInput>
      </View>
      <View style={{width:'100%', height:'100%'}}></View>
      <Footer style={{ 
        width:'100%',
        position:keyboardstate,
        bottom: 0
      }} 
        screen='Passwordedit'
        token={route.params.token}
        data={route.params.data}
        password={route.params.password}/>
    </View>
    
    </View>
  );
  function ChangePassword(np) {
    //console.log('start getAlldata--------------------');
    fetch('http://61.97.185.79/api/auth/profile/password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jwt: token,
        password: np,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('비밀번호 변경 성공');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log('end getAlldata--------------------');
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    backgroundColor:'#ffffff'
  },
  passCircle: {
    width: '85%',
    height: normalize(56),
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: normalize(35),
    marginTop: normalize(90),
    paddingLeft: normalize(12),
    paddingRight: normalize(12),
    paddingTop: normalize(6),
  },
  newPassCircle: {
    width: '85%',
    height: normalize(56),
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: normalize(35),
    marginTop: normalize(15),
    paddingLeft: normalize(12),
    paddingRight: normalize(12),
    paddingTop: normalize(6),
  },
  newPassConfirmCircle: {
    width: '85%',
    height: normalize(56),
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: normalize(35),
    marginTop: normalize(15),
    paddingLeft: normalize(12),
    paddingRight: normalize(12),
    paddingTop: normalize(6),
  },
  backIcon2: {
    color: '#ffffff',
    fontSize: normalize(25),
    width: normalize(27),
    height: normalize(25),
  },
  editPass: {
    color: '#ffffff',
    fontSize: normalize(15),
    fontFamily: 'nanum-gothic-regular',
    marginTop: normalize(5),
  },
  backIcon2RowRow: {
    height: normalize(76),
    flexDirection: 'row',
    alignItems:'flex-end',
    justifyContent:'center',
    width: '100%',
    backgroundColor:'rgba(255,132,42,1)',
    position:'absolute',top:0,
  },
  backIcon2Row: {
    height: normalize(38),
    flexDirection: 'row',
    width:"85%",
    justifyContent:'space-between'
  },
  confirmIcon: {
    color: 'rgba(255,255,255,1)',
    fontSize: normalize(25),
    width: normalize(27),
    height: normalize(25),
    //marginLeft:normalize(100),
  },
  content:{
    //backgroundColor:'red',
    position:'absolute',bottom:0,
    width:'100%', 
    height:'100%',
    alignItems:'center'
  },
});

export default Passwordedit;
