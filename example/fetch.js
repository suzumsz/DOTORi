import React, {Component} from 'react'
import {StyleSheet, Button, Text, View} from 'react-native'

export default class App extends Component {
    constructor(){
        super();
        this.state = {text:''};
    }
    render() {
        return(
            <View style={styles.container}>
                <Button onPress={this._postData} title="post data"/>
                <Text style={styles.welcome}>{this.state.text}</Text>
            </View>
        );
    }

    _postData = async () => {
        let formData = new FormData();
        formData.append('email', 'admin@admin.com');
        formData.append('password', 'admin1234');

        fetch('http://192.168.1.2:9999/api/auth/login', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: 'admin@admin.com',
                password: 'admin1234'
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          this.setState({
            text:responseJson.jwt
          })
        })
        .catch((error) => {
          console.log(error)
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});