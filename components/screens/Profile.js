import React, {useState, useEffect, Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import Svg, {Ellipse} from 'react-native-svg';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import normalize from 'react-native-normalize';
import Footer from '../component/Footer';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

function Profile(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState(route.params.data);
  const [token, setToken] = useState(route.params.token);
  const [password, setPassword] = useState(route.params.password);
  const [name, setName] = useState(data.name);
  const [grade, setGrade] = useState(data.grade);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [chphone, setChphone] = useState('');
  const [keyboardstate, setKeyboardstate] = useState('absolute');
  const [editState, setEditState] = useState(false);

  const getAlldata = (token) => {
    //console.log('start getAlldata--------------------');
    fetch('http://61.97.185.79/api/auth/profile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jwt: token,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setName(responseJson.data.name);
        setGrade(responseJson.data.grade);
        setEmail(responseJson.data.email);
        setPhone(responseJson.data.phone);
        //console.log('all data get....');
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log('end getAlldata--------------------');
  }

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
      getAlldata(token);
      console.log("Profile Addlistner....");
    });

    return () => {
      listenNavigation();
      
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGrayStack}>
        <View style={styles.backgroundGray}>
          <View style={styles.ellipse1Stack}>
            <Svg viewBox="0 0 116.22 116.22" style={styles.ellipse1}>
              <Ellipse
                strokeWidth={1}
                fill="rgba(255,255,255,1)"
                cx={58}
                cy={58}
                rx={58}
                ry={58}></Ellipse>
            </Svg>
            <ImageBackground
              source={require('../assets/images/c6c6c6.png')}
              resizeMode="contain"
              style={styles.dotoriLogoGray}></ImageBackground>
          </View>
          <Text style={styles.김수정2}>{name}</Text>
          <Text style={styles.사용자1}>{grade}</Text>
          <Text style={styles.loremIpsum1}>{email}</Text>
        </View>
        <View style={styles.backgroundRoundWhite}>
        
          <Text style={styles.profileinfoFixed}>회원정보</Text>
          <View style={styles.line1}></View>
          
          <ScrollView style={styles.ScrollView}>
          <View style={styles.buildingIconRowRow}>
            <View style={styles.buildingIconRow}>
              <FontAwesomeIcon
                name="building-o"
                style={styles.buildingIcon}></FontAwesomeIcon>
              <Text style={styles.회사명1}>회사명</Text>
              <Text style={styles.수정주식회사2}>수정주식회사</Text>
            </View>
          </View>
          <View style={styles.line2}></View>
          <View style={styles.positionIconRowRow}>
            <View style={styles.positionIconRow}>
              <FontAwesomeIcon
                name="user-o"
                style={styles.positionIcon}></FontAwesomeIcon>
              <Text style={styles.직책1}>직책</Text>
              <Text style={styles.과장1}>과장</Text>
            </View>
          </View>
          <View style={styles.line3}></View>
          <View style={styles.callIconRowRow}>
            <View style={styles.callIconRow}>
              <FeatherIcon name="phone" style={styles.callIcon}></FeatherIcon>
              <Text style={styles.전화번호2}>전화번호</Text>
            
              <View style={styles.전화번호1Row}>
                {editState ? (
                  <TextInput
                    style={styles.전화번호1}
                    secureTextEntry={false}
                    onChangeText={(text) => {
                      setChphone(text);
                      //console.log('text = ' + text);
                      //console.log('phone = ' + chphone);
                    }}></TextInput>
                ) : (
                  <Text style={styles.전화번호1}>{phone}</Text>
                )}
                <MaterialCommunityIconsIcon
                  name="pencil"
                  style={styles.editIcon}
                  onPress={() => setEditState(true)}></MaterialCommunityIconsIcon>
              </View>
            </View>
            {/* <View style={styles.buildingIconRowFiller}></View>*/}
          </View>   
          <View style={styles.line4}></View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.backIcon1RowRow}>
        <View style={styles.backIcon1Row}>
          <FeatherIcon
            name="arrow-left"
            style={styles.backIcon1}
            onPress={() => navigation.goBack()}></FeatherIcon>
          <Text style={styles.profileText1}>프로필</Text>
          <FeatherIcon
          name="check"
          style={styles.confirmIcon}
          onPress={() => profileEdit(chphone)}></FeatherIcon>
        </View>
      </View >
      <Footer style={{
        width: '100%',
        position: keyboardstate,
        bottom: 0,
      }} screen='Profile'
        token={route.params.token}
        data={route.params.data}
        password={route.params.password}/>
    </View>
  );

  function profileEdit(p) {
    if(p != null){
      fetch('http://61.97.185.79/api/auth/profile/edit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jwt: token,
          phone: p,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          Alert.alert('핸드폰 번호가 변경되었습니다.\n -> ' + responseJson.data.phone);
          setPhone(responseJson.data.phone);
          setEditState(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert("알림","변경할 전화번호를 입력해 주세요");
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(245,245,245,1)",
    alignItems: 'center',
  },
  backgroundGray: {
    top: normalize(76),
    width: '100%',
    height: '40%',
    backgroundColor: 'rgba(245,245,245,1)',
    position: 'absolute',
    alignContent: 'center',
  },
  ellipse1: {
    width: normalize(116),
    height: normalize(116),
    position: 'absolute',
  },
  dotoriLogoGray: {
    top: normalize(8),
    width: normalize(99),
    height: normalize(99),
  },
  ellipse1Stack: {
    width: '100%',
    height: normalize(116),
    marginTop: normalize(21),
    textAlign: 'center',
    alignItems: 'center',
  },
  김수정2: {
    color: 'rgba(255,132,42,1)',
    fontSize: normalize(23),
    fontFamily: 'nanum-gothic-700',
    marginTop: normalize(15),
    textAlign: 'center',
    width: '100%',
  },
  사용자1: {
    color: 'rgba(152,152,152,1)',
    fontSize: normalize(12),
    fontFamily: 'nanum-gothic-regular',
    marginTop: normalize(11),
    textAlign: 'center',
  },
  loremIpsum1: {
    color: 'rgba(152,152,152,1)',
    fontSize: normalize(12),
    fontFamily: 'nanum-gothic-regular',
    marginTop: normalize(7),
    textAlign: 'center',
  },
  backgroundRoundWhite: {
    width: '100%',
    height: '50%',
    backgroundColor: 'rgba(255,255,255,1)',
    position: 'absolute',
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(0),
    bottom:0, 
    alignItems:'center',
  },
  profileinfoFixed: {
    color: 'rgba(255,132,42,1)',
    fontSize: normalize(14),
    fontFamily: 'nanum-gothic-regular',
    letterSpacing: normalize(2),
    marginTop: normalize(28),
    width:'85%',
    height:normalize(32),
  },
  line1: {
    width: '100%',
    height: normalize(3),
    backgroundColor: 'rgba(239,239,239,1)',
  },
  buildingIcon: {
    color: 'rgba(255,132,42,1)',
    fontSize: normalize(19),
    height: normalize(19),
    width: normalize(15),
  },
  회사명1: {
    color: 'rgba(130,130,130,1)',
    fontSize: normalize(14),
    fontFamily: 'nanum-gothic-regular',
    marginLeft: normalize(21),
    marginTop: normalize(2),
  },
  buildingIconRow: {
    height: normalize(52),
    width:'100%',
    flexDirection: 'row',
    alignItems:'center',
  },
  수정주식회사2: {
    color: 'rgba(130,130,130,1)',
    fontSize: normalize(14),
    fontFamily: 'nanum-gothic-regular',
    position:'absolute', right:0,
  },
  buildingIconRowRow: {
    height: normalize(52),
    flexDirection: 'row',
    width: '100%',
    alignItems:'center',
  },
  line2: {
    width: '100%',
    height: normalize(3),
    backgroundColor: 'rgba(239,239,239,1)',
  },
  positionIcon: {
    color: 'rgba(255,132,42,1)',
    fontSize: normalize(19),
    height: normalize(19),
    width: normalize(17),
  },
  직책1: {
    color: 'rgba(130,130,130,1)',
    fontSize: normalize(14),
    fontFamily: 'nanum-gothic-regular',
    marginLeft: normalize(19),
    marginTop: normalize(3),
  },
  positionIconRow: {
    height: normalize(52),
    width:'100%',
    flexDirection: 'row',
    alignItems:'center',
  },
  과장1: {
    color: 'rgba(130,130,130,1)',
    fontSize: normalize(14),
    fontFamily: 'nanum-gothic-regular',
    position:'absolute', right:0
  },
  positionIconRowRow: {
    height: normalize(52),
    flexDirection: 'row',
    width: '100%',
  },
  line3: {
    width: '100%',
    height: normalize(3),
    backgroundColor: 'rgba(239,239,239,1)',
  },
  callIcon: {
    color: 'rgba(255,132,42,1)',
    fontSize: normalize(19),
    height: normalize(19),
    width: normalize(19),
  },
  전화번호2: {
    color: 'rgba(130,130,130,1)',
    fontSize: normalize(14),
    fontFamily: 'nanum-gothic-regular',
    marginLeft: normalize(16),
    marginTop: normalize(3),
  },
  callIconRow: {
    height: normalize(52),
    width:'100%',
    flexDirection: 'row',
    alignItems:'center',
  },
  전화번호1: {
    color: 'rgba(130,130,130,1)',
    fontSize: normalize(14),
    fontFamily: 'nanum-gothic-regular',
    paddingLeft:normalize(15),
    paddingRight:normalize(25),
  },
  editIcon: {
    color: 'rgba(152,152,152,1)',
    fontSize: normalize(18),
    height: normalize(18),
    width: normalize(18),
    position:'absolute',
    right:0,
    justifyContent:'center',
  },
  전화번호1Row: {
    width:'40%',
    justifyContent:'center',
    borderRadius: normalize(35),
    height: normalize(35),
    position:'absolute', right:0,
    backgroundColor: '#f5f5f5', 
  },
  callIconRowRow: {
    height: normalize(52),
    flexDirection: 'row',
    width: '100%',
    alignItems:'center',
  },
  line4: {
    width: '100%',
    height: normalize(3),
    backgroundColor: 'rgba(239,239,239,1)',
  },
  backgroundGrayStack: {
    width: '100%',
    height: '100%',
  },
  backIcon1: {
    color: 'rgba(255,255,255,1)',
    fontSize: normalize(25),
    width: normalize(27),
    height: normalize(25)
  },
  profileText1: {
    color: 'rgba(255,255,255,1)',
    fontSize: normalize(15),
    fontFamily: 'nanum-gothic-regular',
    marginTop: normalize(5),
    alignItems: 'center',
  },
  backIcon1Row: {
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
  },
  backIcon1RowRow: {
    height: normalize(76),
    flexDirection: 'row',
    alignItems:'flex-end',
    justifyContent:'center',
    width: '100%',
    backgroundColor:'rgba(255,132,42,1)',
    position:'absolute',top:0
  },
    ScrollView: {
    width:'85%',
  },
});

export default Profile;
