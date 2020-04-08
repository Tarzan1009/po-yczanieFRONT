import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';


class Home extends Component {

    handleRequest() {
        // This request will only succeed if the Authorization header
        // contains the API token
        axios
            .get('/auth/logout/')
            .then(response => {
                Actions.auth()
            })
            .catch(error => console.log(error))
            .then(response => {
                axios.defaults.headers.common.Authorization = null
                Actions.auth()
            });

    }

    render() {
        const {buttonContainerStyle} = styles;
        const { btnTxtStyle } = styles;
        return (
            <View style={buttonContainerStyle}>
                <Button color='#ffffff0d' title="Logout" titleStyle={btnTxtStyle} onPress={this.handleRequest.bind(this)}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    buttonContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#121212',
    },
    btnTxtStyle: {
        fontWeight: 'bold'
    },
});

export default Home;