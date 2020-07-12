import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';

function Login(props) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin1234');

  return (
    <View style={styles.container}>
      <View style={styles.emailbackground}>
        <FeatherIcon name="mail" style={styles.emailIcon}></FeatherIcon>
        <TextInput
          style={styles.emailInput}
          placeholder="이메일"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.passwordbackground}>
        <EvilIconsIcon name="lock" style={styles.passwordicon}></EvilIconsIcon>
        <TextInput
          placeholder="비밀번호"
          placeholderTextColor="rgba(255,255,255,1)"
          secureTextEntry={false}
          style={styles.passwordInput}
          onChangeText={(text) => setPassword(text)}></TextInput>
      </View>
      <TouchableOpacity style={styles.loginbackground} onPress={() => authCheck(email, password)}>
        <Text
          style={styles.loginText}
          >
          로그인
        </Text>
      </TouchableOpacity>
      <View style={styles.dotoriLogo1StackStack}>
        <View style={styles.dotoriLogo1Stack}>
          <Image
            source={require('../assets/images/HH.png')}
            resizeMode="contain"
            style={styles.dotoriLogo1}></Image>
          <Image
            source={require('../assets/images/DOTORI_WHITE.png')}
            resizeMode="contain"
            style={styles.dotoriTextLogoWhite1}></Image>
        </View>
        <Text style={styles.textLogo2}>사무실근태관리앱</Text>
      </View>
      <Text style={styles.findIpText}>아이디 / 비밀번호찾기</Text>
    </View>
  );

  // loginStated ? props.onPress : console.log('인증 실패')
  function authCheck(e, p) {
    console.log('로그인 버튼 onPress....');
    fetch('http://61.97.185.79/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e,
        password: p,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('\n\n');
      console.log('------responseData Start');
      console.log('input e = ' + e);
      console.log('input p = ' + p);
      console.log('jwt : ' + JSON.stringify(responseJson.jwt));
      console.log('------responseData End');
      console.log('\n\n');
      //console.log(responseJson,jwt)
      if (responseJson.jwt != null) {
        const token = responseJson.jwt;
        var decode = jwtDecode(token);
        const data = JSON.stringify(decode);

        console.log('로그인 DATA = ' + data);
        console.log('로그인 token = ' + token);
        console.log('인증결과 : 성공');
        
        navigation.navigate('Dashboard', { token: token, data: data });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,132,42,1)',
    justifyContent: "center",
    alignItems: "center"
  },
  emailbackground: {
    width: '80%',
    height: 56,
    backgroundColor: 'rgba(255,132,42,1)',
    borderRadius: 35,
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 242,
  },
  emailIcon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    height: 20,
    width: 20,
    marginLeft: 28,
    marginTop: 18
  },
  emailInput: {
    height: '100%',
    color: 'white',
    fontFamily: 'nanum-gothic-regular',
    flex: 1,
    marginRight: 9,
    marginLeft: 15,
    marginTop: '0.5%',
  },
  passwordbackground: {
    width: '80%',
    height: 56,
    backgroundColor: 'rgba(255,132,42,1)',
    borderRadius: 35,
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 11
  },
  passwordicon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 33,
    height: 33,
    width: 33,
    marginLeft: 21,
    marginTop: 12,
  },
  passwordInput: {
    height: '100%',
    color: 'rgba(255,255,255,1)',
    fontFamily: 'nanum-gothic-regular',
    flex: 1,
    marginRight: 16,
    marginLeft: 8,
    marginTop: '0.5%',
  },
  loginbackground: {
    width: '80%',
    height: 56,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 35,
    marginTop: 11
  },
  loginText: {
    color: 'rgba(255,132,42,1)',
    fontFamily: 'nanum-gothic-700',
    marginTop: 21,
    textAlign: 'center'
  },
  dotoriLogo1: {
    top: 0,
    left: 8,
    width: 99,
    height: 99,
    position: 'absolute',
  },
  dotoriTextLogoWhite1: {
    top: 53,
    left: 0,
    width: 118,
    height: 118,
    position: 'absolute',
  },
  dotoriLogo1Stack: {
    top: 0,
    left: 0,
    width: 118,
    height: 171,
    position: 'absolute',
  },
  textLogo2: {
    top: '77%',
    left: 8,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontFamily: 'nanum-gothic-regular',
    letterSpacing: 1,
    fontSize: normalize(13)
  },
  dotoriLogo1StackStack: {
    width: 118,
    height: 171,
    marginTop: -377,
    //marginLeft: 121,
  },
  findIpText: {
    color: 'rgba(255,255,255,1)',
    opacity: 0.56,
    fontSize: normalize(14),
    fontFamily: 'nanum-gothic-regular',
    letterSpacing: 1,
    marginTop: 232,
    textAlign: 'center'
  },
});

export default Login;
