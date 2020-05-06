import React, {Component} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';


class Home extends Component {

    state = {
        sum: 0,
        sumout: 0,
        sumin: 0,
        countout: 0,
        countin: 0,
        user: {}
    };

    handleRequest() {
        // This request will only succeed if the Authorization header
        // contains the API token
        axios
            .get('auth/logout/')
            .then(response => {
                Actions.auth()
            })
            .catch(error => console.log(error))
            .then(response => {
                //axios.defaults.headers.common.Authorization = null
                Actions.auth()
            });

    }

    componentDidMount() {
        this.getSum();
    }

    getSum() {
        const axios = require('axios');
        axios.get(`users/${global.userID}/sum`).then(resp => {
            this.setState({sum: resp.data});
            console.log(resp.data)
        }).then(
            axios.get(`users/${global.userID}/monetary_credits/sum`).then(resp => {
                this.setState({sumout: resp.data});
            }).then(
                axios.get(`users/${global.userID}/monetary_debts/sum`).then(resp => {
                    this.setState({sumin: resp.data});
                }).then(
                    axios.get(`users/${global.userID}/item_debts/count`).then(resp => {
                        this.setState({countin: resp.data});
                    }).then(
                        axios.get(`users/${global.userID}/item_credits/count`).then(resp => {
                            this.setState({countout: resp.data});
                        }).then(
                            axios.get(`users/${global.userID}`).then(resp => {
                                this.setState({user: resp.data});
                            })
                        )
                    )
                )
            )
        );
    }

    render() {
        const {buttonContainerStyle} = styles;
        const {btnTxtStyle} = styles;
        const {sum, sumout, sumin, countout, countin, user} = this.state;


        return (
            <View style={buttonContainerStyle}>
                <Text style={styles.titleText}>
                    User = {user.username}
                </Text>
                <Text style={styles.titleText}>
                    Suma = {sum.sum}
                </Text>
                <Text style={styles.titleText}>
                    Suma out = {sumout.amount__sum}
                </Text>
                <Text style={styles.titleText}>
                    Suma in = {sumin.amount__sum}
                </Text>
                <Text style={styles.titleText}>
                    Przedmioty in = {countin.count}
                </Text>
                <Text style={styles.titleText}>
                    Przedmioty out = {countout.count}
                </Text>
                <Button color='#ffffff0d' title="Logout" titleStyle={btnTxtStyle}
                        onPress={this.handleRequest.bind(this)}/>
                <Button color='#ffffff0d' title="friends" titleStyle={btnTxtStyle}
                        onPress={Actions.friends()}/>
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
    titleText: {
        fontWeight: 'bold',
        color: 'white',
    }
});

export default Home;