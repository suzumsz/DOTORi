import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Svg, {Ellipse} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import Moment from 'moment';
import normalize from 'react-native-normalize';
import Footer from '../component/Footer';
import { width, height, totalSize } from 'react-native-dimension';
import Timezone from 'moment-timezone';
import AsyncStorage from '@react-native-community/async-storage';
//import Time from '../component/Time';

function Dashboard(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState(JSON.parse(route.params.data));
  const [token, setToken] = useState(route.params.token);
  const [password, setPassword] = useState(route.params.password);
  const [attendanceList, setAttendanceList] = useState('');
  const [listisready, setListisready] = useState(false);
  const [authState, setAuthState] = useState(route.params.authState);
  const [date, setDate] = useState(Moment().tz('Asia/Seoul').format('YYYY/MM/DD'));

  function delay() {
    return new Promise((resolve) => setTimeout(resolve, 60000));
  }

  const checkLoginStatus = () => {
    if(authState=='false'){
      navigation.navigate('Login');
    }
  };
  
  const getAttendanceList = (token) => {
    fetch('http://61.97.185.79/api/attend/list', {
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
        //console.log('attendanceList = ' + JSON.parse(JSON.stringify(responseJson.attendanceList)));
        setAttendanceList(
          JSON.parse(JSON.stringify(responseJson.attendanceList)),
        );
        //console.log('setAttendanceList(JSON.parse(JSON.stringify(responseJson.attendanceList)))');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*
  const getData = async () => {
    try {
      setData(JSON.parse(await AsyncStorage.getItem('data')));
    } catch(e) {
      console.log("Dashboard.js -> AsyncStorage error : " + e);
    }
  }
  getData();
  */
  
  // console.log("Dashboard ------- > ",data);
  
  
  useEffect(() => {

    const listenNavigation = navigation.addListener('state', () => {
      checkLoginStatus();
      
      setData(JSON.parse(route.params.data));
      setToken(route.params.token);
      setPassword(route.params.password);

      console.log("Dashboard Addlistner....");
    });

    
    return () => {
      listenNavigation();
      getAttendanceList(token);
    }

    
  }); //

  return (
    <View style={styles.container}>
      <View style={styles.image22646226StackRow}>
        <View style={styles.image22646226Stack}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.timeNow1}>{date}</Text>
        </View>
        <View style={styles.circleStack}>
          <Svg viewBox="0 0 69.00 69.00" style={styles.circle}>
            <Ellipse
              strokeWidth={1}
              fill="rgba(255,255,255,1)"
              stroke="rgba(230, 230, 230,1)"
              cx={35}
              cy={35}
              rx={34}
              ry={34}></Ellipse>
          </Svg>
          <ImageBackground
            source={require('../assets/images/c6c6c6.png')}
            resizeMode="contain"
            style={styles.dotoriLogoGray1}>
          </ImageBackground>
        </View>
      </View> 
    
      <View style={styles.roundBackground1Stack}>  
       <View style={styles.roundBackground1}> 
        
          <Text style={styles.checkinfoFixed1}>최근 주차별 근태정보</Text>
         
          <SafeAreaView style={styles.group5}>
            <FlatList style={styles.group}
              data={attendanceList}
              renderItem={({item, index}) => (
                <Item
                  inTime={item.inTime}
                  createAt={item.createAt}
                  attend={item.attend}
                  outTime={item.outTime}
                  index={index}
                />
              )}
              keyExtractor={(item) => item.createAt}
            />
          </SafeAreaView>
        </View>
      </View>
      <View style={styles.menuicon1Row}>
        <Image
          source={require('../assets/images/DOTORI_WHITE1.png')}
          resizeMode="contain"
          style={styles.dotoriTextLogoWhite1}></Image>
        <Icon
        name="log-out"
        style={styles.logout}
        onPress={()=> {
          navigation.navigate('Login', {
            authState: 'false',
          });
          console.log("로그아웃 되었습니다");
          Alert.alert('로그아웃','로그아웃되었습니다. 다시 로그인해주세요');
        }}></Icon>
      </View>
        <Footer style={{position:'absolute', bottom:0}} 
        screen='Dashboard'
        token={token}
        data={data}
        password={password}/>
    </View>
  );
}

function Item({inTime, createAt, attend, outTime, index}) {
  Moment.locale('en');
  var dt = inTime != null ? inTime : outTime;
  var YMDinTime = Moment(dt).format('YY / MM / DD');
  var HMSinTime = Moment(dt).format('hh:mm:ss');
  if(dt == inTime){
    var attendStateIcon = require('../assets/images/1232.png');
    var attendStateCheck = require('../assets/images/check_(1).png');
  } else{
    var attendStateIcon = require('../assets/images/7892.png');
    var attendStateCheck = require('../assets/images/828282.png');
  }

  if(index == 0) {
    return (
      <View style={styles.nowRect0}>
        <View style={styles.group425}>
          <View style={styles.endLogoIconRow}>
            <Image
              source={attendStateIcon}
              resizeMode="contain"
              style={styles.endLogoIcon}></Image>
            <Text style={styles.loremIpsum6552}>{YMDinTime}</Text>
            <Text style={styles.loremIpsum3352}>{HMSinTime}</Text>
            <Image
              source={attendStateCheck}
              resizeMode="contain"
              style={styles.endCheckIcon}></Image>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.nowRect}>
        <View style={styles.group425}>
          <View style={styles.endLogoIconRow}>
            <Image
              source={attendStateIcon}
              resizeMode="contain"
              style={styles.endLogoIcon}></Image>
            <Text style={styles.loremIpsum6552}>{YMDinTime}</Text>
            <Text style={styles.loremIpsum3352}>{HMSinTime}</Text>
            <Image
              source={attendStateCheck}
              resizeMode="contain"
              style={styles.endCheckIcon}></Image>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,132,42,1)',
    alignItems: 'center',
  },
  name: {
    color: '#ffffff',
    width: normalize(150),
    fontSize: normalize(30),
    fontFamily: 'nanum-gothic-800',
    letterSpacing: normalize(2),
    marginLeft: normalize(5),
    top:normalize(13)
  },
  timeNow1: { //김관리 밑 날짜 스타일
    color: 'rgba(255,255,255,1)',
    fontSize: normalize(14),
    letterSpacing: normalize(3),
    fontFamily: 'nanum-gothic-regular',
    width:'35%',
    lineHeight:normalize(40),
    height:normalize(40),
    position:'absolute',
    bottom:normalize(0),
    textAlign:'center',
  },
  text1: { //김관리 밑 시간 스타일
    left: normalize(88),
    color: 'rgba(115,63,26,1)',
    position: 'absolute',
    fontSize: normalize(14),
    letterSpacing: normalize(3),
    fontFamily: 'nanum-gothic-regular',
    width:'38%',
    lineHeight:normalize(40),
    height:normalize(40),
    bottom:normalize(0),
    textAlign:'center',
  },
  image22646226Stack: { //김관리랑 날짜랑 같이 묶여있음
    width: '78%',
    height: normalize(83),
  },
  dotoriLogoGray1: {
    top: normalize(3),
    left: normalize(3),
    width: normalize(67),
    height: normalize(67),
    position: 'absolute',
  },
  circleStack: { //동그라미도토리부분
    width: normalize(69),
    height: normalize(69),
    marginTop: normalize(9),
  },
  image22646226StackRow: { //김관리 날짜 시간 그룹의 스타일
    width: '85%',
    paddingLeft:normalize(5),
    height: normalize(83),
    flexDirection: 'row',
    marginTop: normalize(75),
  },
  roundBackground1: { //왼쪽모서리둥근백그라운드흰색
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,1)',
    position: 'absolute',
    borderWidth: 0,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(0),
  },
  checkinfoFixed1: { // 최근 주차별 근태정보 글씨만 따로 그룹
    color: 'rgba(152,152,152,1)',
    fontSize: normalize(13),
    fontFamily: 'nanum-gothic-regular',
    marginTop: normalize(35),
    marginLeft: normalize(28),
  },
  group:{
    height:'100%',
    width:'100%'
  },
  group5: { //알림창 다같이 그룹
    width: '100%',
    height: "55%",
    marginTop: normalize(20),
  },
  nowRect0: { //알림창 다같이 그룹
    width: '85%',
    height: normalize(70),
    marginLeft: '8%',
    borderColor: 'rgba(255,132,42,1)',
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,1)',
    elevation: 3,
    borderRadius: normalize(18),
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.07,
    shadowRadius: 9,
    marginBottom: 5,
  },
  nowRect: { //알림 테두리, 그림자 잠깐 없애놓음
    width: '85%',
    height: normalize(70),
    marginLeft: '8%',
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,1)',
    elevation: 3,
    borderRadius: normalize(18),
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.07,
    shadowRadius: 9,
    marginBottom: 5,
  },
  group425: { // 알림 날짜 시간 그룹
    width: normalize(261),
    height: normalize(31),
    flexDirection: 'row',
    marginTop: normalize(19),
    justifyContent: 'center',
    marginLeft: '8%',
  },
  endLogoIcon: { //알림 도토리 그룹
    width: normalize(31),
    height: normalize(31),
    top: normalize(5),
    right: normalize(10), //안맞으면 지우기
  },
  loremIpsum6552: { //알림 날짜 그룹 글씨크기 
    color: 'rgba(0,0,0,1)',
    fontSize: normalize(15), //14->15변경(안맞으면조정)
    fontFamily: 'nanum-gothic-regular',
    marginLeft: normalize(19),
    marginTop: normalize(8),
  },
  loremIpsum3352: { //알림 시간 그룹 글씨크기 14->15변경(안맞으면 조정)
    color: 'rgba(0,0,0,1)',
    fontSize: normalize(15),
    fontFamily: 'nanum-gothic-800',
    marginLeft: normalize(29),
    marginTop: normalize(8),
  },
  endCheckIcon: { //출근체크 아이콘
    width: normalize(13),
    height: normalize(13),
    marginLeft: normalize(32),
    marginTop: normalize(9),
  },
  endLogoIconRow: { //근태정보 알ksb@naver.com림 그룹
    alignItems: 'center',
    height: normalize(31),
    flexDirection: 'row',
  },
  roundBackground1Stack: {
    width: '100%',
    height: 596,
    marginTop: 17,
  },
  menuicon1: { // 메뉴아이콘 스타일
    color: 'rgba(255,255,255,1)',
    fontSize: normalize(25),
    width: normalize(27),
    height: normalize(25),
    transform: [
      {
        rotate: '180.00deg',
      },
    ],
  },
  dotoriTextLogoWhite1: { //도토리글씨로고 가운데정렬안됨
    width: normalize(80),
    height: normalize(25),
  },
  menuicon1Row: { //메뉴바, 도토리글씨로고 그룹
    width: '85%',
    height: normalize(26),
    flexDirection: 'row',
    marginTop: -736,
    justifyContent:'center'
  },
  FooterStyle: {
    width: '100%',
    position: 'absolute', bottom: 0,
  },
  logout:{
    fontSize: normalize(20),
    height: normalize(26),
    width: normalize(19),
    position:'absolute',right:0,
    color: 'rgba(255,255,255,1)',
    lineHeight:normalize(26)
  }
});

export default Dashboard;
