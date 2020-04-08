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
  componentWillMount() {
    axios.defaults.baseURL = 'http://192.168.1.4:8000/api';
    axios.defaults.timeout = 1500;
  }
}
