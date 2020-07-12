/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {
    Alert,
    DeviceEventEmitter,
    NativeEventEmitter,
    Platform,
    PermissionsAndroid,
  } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundJob from 'react-native-background-job';
import Kontakt, {KontaktModule, configure} from 'react-native-kontaktio';

const {connect, init, startDiscovery, startScanning} = Kontakt;
const kontaktEmitter = new NativeEventEmitter(KontaktModule);
const isAndroid = Platform.OS === 'android';


const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This example app needs to access your location in order to use bluetooth beacons.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        // permission denied
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
};

const beaconSetup = async () => {
    console.log('beaconSetup In.........');
    if (isAndroid) {
        // Android
        const granted = await requestLocationPermission();
        if (granted) {
        await connect();
        await startScanning();
        } else {
        Alert.alert(
            'Permission error',
            'Location permission not granted. Cannot scan for beacons',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
        );
        }
    } else {
        // iOS
        await init();
        await startDiscovery();
    }

    // Add beacon listener
    if (isAndroid) {
        kontaktEmitter.addListener('beaconsDidUpdate', ({beacons, region}) => {
        console.log('index.js----------------\n\n');
        });
    } else {
        kontaktEmitter.addListener('didDiscoverDevices', ({beacons}) => {
        console.log('didDiscoverDevices', beacons);
        });
    }
};


const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('token')
        console.log("index.js -> getData = " + jsonValue);
    fetch('http://61.97.185.79/api/attend/check', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jwt: jsonValue,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("attend result = " + JSON.stringify(responseJson));
      })
      .catch((error) => {
        console.log(error);
      });
    } catch(e) {
        console.log("index.js AsyncStorage error : "+e)
    }
}




const backgroundJob = {
    jobKey: "myJob",
    job: () => console.log("Running in background -> myJob")
};

const backgroundBeaconScanJob = {
    jobKey: "beaconScanJob",
    job: () => console.log("Running in background -> beaconScanJob")
};

BackgroundJob.register(backgroundJob);
BackgroundJob.register(backgroundBeaconScanJob);

var backgroundSchedule = {
 jobKey: "myJob",
 period: 10,
 allowExecutionInForeground: true,
}
 
BackgroundJob.schedule(backgroundSchedule)
.then(() => {
    console.log("Success -> myJob")
    console.log("Start")
    beaconSetup();
    kontaktEmitter.addListener('beaconsDidUpdate', ({beacons, region}) => {
    console.log('<-background----------------------------------');
    beacons.map((beacons) => {
        if(beacons.uuid == "e2c56db5-dffb-48d2-b060-d0f5a71096e3"){
            console.log('등록하신 Beacon이 근처에 있습니다......');
            console.log('근태처리가 가능합니다..................');
            console.log('uuid : '+beacons.uuid);
            console.log('name : '+beacons.name);
            console.log('rssi : '+beacons.rssi);
            getData();
        }
        if(beacons.uuid == "fda50693-a4e2-4fb1-afcf-c6eb07647825"){
          console.log('등록하신 Beacon이 근처에 있습니다......');
          console.log('근태처리가 가능합니다..................');
          console.log('uuid : '+beacons.uuid);
          console.log('name : '+beacons.name);
          console.log('rssi : '+beacons.rssi);
          getData();
      }
    });
    /*
    if(beacons.uuid == "e2c56db5-dffb-48d2-b060-d0f5a71096e3"){
        console.log(beacons);
    } else {
        console.log('등록하신 Beacon이 근처에 없습니다......');
        console.log(beacons.uuid);
    }
    */
    console.log('---------------------------------background->');
    console.log('region :', region.uuid);
});
    console.log("End")
})
.catch(err => console.err(err));

AppRegistry.registerComponent(appName, () => App);
