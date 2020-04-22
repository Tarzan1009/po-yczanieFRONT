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
    axios.defaults.baseURL = 'http://192.168.1.4:8000/APIlend/';
    axios.defaults.timeout = 3000;
    axios.defaults.headers.common = {'Authorization': `Token c3721e55b603dcea44df0d7cf7f7790a44403f0b`}
  }
}
