import React, { Component } from 'react';
import Router from './src/Router';
import axios from 'axios';
import StatusBar from 'react-native'


export default class App extends Component {
  render() {
    return (
        <Router />
    );
  }
  UNSAFE_componentWillMount() {
    axios.defaults.baseURL = 'http://tarzan1009.pythonanywhere.com/api/';
    axios.defaults.timeout = 3000;
    //axios.defaults.headers.common = {'Authorization': `Token 65fd744de6dce368903724b1dc386efc82b48379`};
    //global.userID = 1;
  }
}
