// src/components/common/LoginOrCreateForm.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import FlatButton from '../../shared/button';

class LoginOrCreateForm extends Component {

    handleRequest() {
        const endpoint = this.props.create ? 'register' : 'login';
        const payload = { username: this.state.username, password: this.state.password }

        if (this.props.create) {
            payload.first_name = this.state.firstName;
            payload.last_name = this.state.lastName;
        }

        axios
            .post(`/auth/${endpoint}/`, payload)
            .then(response => {
                const { token, user } = response.data;

                // We set the returned token as the default authorization header
                axios.defaults.headers.common.Authorization = `Token ${token}`;

                // Navigate to the home screen
                Actions.main();
            })
            .catch(error => console.log(error));
    }

    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: ''
    }

    onUsernameChange(text) {
        this.setState({ username: text });
    }

    onPasswordChange(text) {
        this.setState({ password: text });
    }

    onFirstNameChange(text) {
        this.setState({ firstName: text });
    }

    onLastNameChange(text) {
        this.setState({ lastName: text });
    }

    renderCreateForm() {
        const { fieldStyle, textInputStyle } = style;
        if (this.props.create) {
            return (
                <View style={fieldStyle}>
                    <TextInput
                        placeholder="First name"
                        autoCorrect={false}
                        onChangeText={this.onFirstNameChange.bind(this)}
                        style={textInputStyle}
                    />
                    <TextInput
                        placeholder="Last name"
                        autoCorrect={false}
                        onChangeText={this.onLastNameChange.bind(this)}
                        style={textInputStyle}
                    />
                </View>
            );
        }
    }

    renderButton() {
        const buttonText = this.props.create ? 'Create' : 'Login';
        const { btnTxtStyle } = style;

        return (
            <FlatButton text={buttonText} titleStyle={buttonText} onPress={this.handleRequest.bind(this)}/>
        );
    }


    renderCreateLink() {
        if (!this.props.create) {
            const { accountCreateTextStyle } = style;
            return (
                <Text style={accountCreateTextStyle}>
                </Text>
            );
        }
    }

    render() {
        const {
            formContainerStyle,
            fieldStyle,
            textInputStyle,
            buttonContainerStyle,
            accountCreateContainerStyle
        } = style;

        return (
            <View style={{ flex: 1}}>
                <View style={formContainerStyle}>
                    <View style={fieldStyle}>
                        <TextInput
                            placeholder="username"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={this.onUsernameChange.bind(this)}
                            style={textInputStyle}
                        />
                    </View>
                    <View style={fieldStyle}>
                        <TextInput
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="password"
                            onChangeText={this.onPasswordChange.bind(this)}
                            style={textInputStyle}
                        />
                    </View>
                    {this.renderCreateForm()}
                </View>
                <View style={buttonContainerStyle}>
                    {this.renderButton()}
                    <View style={accountCreateContainerStyle}>
                        {this.renderCreateLink()}
                    </View>
                </View>
            </View>
        );
    }
}


const style = StyleSheet.create({
    formContainerStyle: {
        padding: 20,
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTxtStyle: {
        fontWeight: 'bold'
    },
    textInputStyle: {
        height: 40,
        flex: 1,
        marginBottom: 30,
        borderBottomWidth: 1,
    },
    fieldStyle: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    accountCreateTextStyle: {
        color: 'black'
    },
    accountCreateContainerStyle: {
        padding: 25,
        alignItems: 'center',
    }
});


export default LoginOrCreateForm;