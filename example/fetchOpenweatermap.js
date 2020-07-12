import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount() {
    return fetch('http://api.openweathermap.org/data/2.5/weather?appid=6a7bdcb79f4b57ed107119ee934c7875&q=seoul')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.weather,
        })
      })
      .catch((error) => {
        console.log(error)
      });
  }

  render() {
    if(this.state.isLoading) {
      return(
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      
      let weather = this.state.dataSource.map((val,key) => {
        return <View key={key} style={styles.item}>
                <Text>{val.main}</Text>
               </View>
      });
      return (
        <View style={styles.container}>
          <Text >오늘 서울의 날씨는</Text>
          {weather}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})