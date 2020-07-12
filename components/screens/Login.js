import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import normalize from 'react-native-normalize';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';

function Login(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin1234');
  const [authState, setAuthState] = useState('false');
  const [textInputEmail, setTextInputEmail] = useState();
  const [textInputPW, setTextInputPW] = useState();



  return (
    <View style={styles.container}>
      <View style={styles.emailbackground}>
        <FeatherIcon name="mail" style={styles.emailIcon}></FeatherIcon>
        <TextInput
          ref={(input) => {
            setTextInputEmail(input)
          }}
          style={styles.emailInput}
          placeholder="이메일"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.passwordbackground}>
        <EvilIconsIcon name="lock" style={styles.passwordicon}></EvilIconsIcon>
        <TextInput
          ref={(input) => {
            setTextInputPW(input)
          }}
          placeholder="비밀번호"
          placeholderTextColor="rgba(255,255,255,1)"
          secureTextEntry={true}
          style={styles.passwordInput}
          onChangeText={(text) => setPassword(text)}></TextInput>
      </View>
      <TouchableOpacity
        style={styles.loginbackground}
        onPress={() => authCheck(email, password)}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.dotoriLogo1StackStack}>
        <View style={styles.dotoriLogo1Stack}>
          <Image
            source={require('../assets/images/456.png')}
            resizeMode="contain"
            style={styles.dotoriLogo1}></Image>
          <Image
            source={require('../assets/images/DOTORI_WHITE.png')}
            resizeMode="contain"
            style={styles.dotoriTextLogoWhite1}></Image>
        </View>
        <Image
          source={require('../assets/images/officew.png')}
          resizeMode="contain"
          style={styles.office}></Image>
      </View>
      <TouchableOpacity
        style={styles.test}
        onPress={() => Alert.alert('알림','인사팀으로 문의하세요. 010-1234-5678')}>  
          {/*Alert.alert('알림','인사팀으로 문의하세요. 010-1234-5678',
          //[{text: '확인', onPress: () => console.log('OK Pressed')}],{ cancelable: false })}> */}
        <Text style={styles.findIpText}>아이디 / 비밀번호찾기</Text>
      </TouchableOpacity>
    </View>
  );
  //

  // loginStated ? props.onPress : console.log('인증 실패')
  function authCheck(e, p) {
    const storeToken = async (value) => {
      try {
        await AsyncStorage.setItem('token', value);
        console.log("storeToken = " + await AsyncStorage.getItem('token'))
      } catch(e) {
        console.log("Login.js -> AsyncStorage error : " + e);
      }
    }

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

          storeToken(token);

          navigation.navigate('Dashboard', {
            token: token,
            data: data,
            password: password,
            authState: 'true',
          });
        } else {
          Alert.alert('로그인 오류','이메일 혹은 비밀번호가 잘못되었습니다...');
        }
        textInputEmail.clear();
        textInputPW.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,132,42,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailbackground: {
    width: '80%',
    height: normalize(56),
    backgroundColor: 'rgba(255,132,42,1)',
    borderRadius: 35,
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: '45%',
  },
  emailIcon: {
    color: 'rgba(255,255,255,1)',
    fontSize: normalize(20),
    height: normalize(20),
    width: normalize(20),
    marginLeft: 28,
    marginTop: 18,
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
    height: normalize(56),
    backgroundColor: 'rgba(255,132,42,1)',
    borderRadius: 35,
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 11,
  },
  passwordicon: {
    color: 'rgba(255,255,255,1)',
    fontSize: normalize(33),
    height: normalize(33),
    width: normalize(33),
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
    height: normalize(56),
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 35,
    marginTop: 11,
  },
  loginText: {
    color: 'rgba(255,132,42,1)',
    fontFamily: 'nanum-gothic-700',
    marginTop: normalize(20),
    textAlign: 'center',
  },
  dotoriLogo1: {
    top: normalize(0, 'height'),
    width: normalize(99),
    height: normalize(99),
    position: 'absolute',
  },
  dotoriTextLogoWhite1: {
    top: normalize(53, 'height'),
    width: normalize(118),
    height: normalize(118),
    position: 'absolute',
  },
  dotoriLogo1Stack: {
    top: 0,
    left: 0,
    width: 118,
    height: 171,
    position: 'absolute',
    alignItems: 'center',
  },
  office: {
    width: normalize(112),
    height: normalize(112),
    position: 'absolute',
    top: normalize(78),
    alignItems: 'center',
  },
  dotoriLogo1StackStack: {
    width: 118,
    height: 171,
    marginTop: -377,
    alignItems: 'center',
  },
  findIpText: {
    color: 'rgba(255,255,255,1)',
    opacity: 0.7,
    fontSize: normalize(14),
    fontFamily: 'nanum-gothic-regular',
    letterSpacing: 1,
    textAlign: 'center',
  },
  test: {
    marginTop: 232,
    height: normalize(14),
  },
});

export default Login;
