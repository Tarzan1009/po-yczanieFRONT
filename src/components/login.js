import React, { Component } from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import LoginOrCreateForm from './common/LoginOrCreateForm';
import { globalStyles } from '../../styles/global.js';

class Login extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <LoginOrCreateForm />
            </View>
        );
    }
}

export default Login;