import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from "axios";


class Start extends Component {
    check() {
        if(!axios.defaults.headers.common.Authorization){
            Actions.auth();
        } else {
            Actions.home();
        }
    }

    componentDidMount() {
        console.log('start');
        console.log(!axios.defaults.headers.common.Authorization);
        setTimeout(this.check, 500);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                padding: 20,
                paddingVertical: 10,
                alignItems: 'center',
                textAlign: 'center',
            }}>
                <Text style={{fontSize: 20}}>Loading...</Text>
            </View>
        );
    }
}

export default Start;