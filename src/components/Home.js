import React, {Component} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';


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

    friends() {
        Actions.friends();
    };

    monetary() {
        Actions.MonetaryList();
    };

    item() {
        console.log('items');
    };


    componentDidMount() {
        this.getSum();
    }

    getSum() {
        const axios = require('axios');
        axios.get(`users/${global.userID}/monetary/sum`).then(resp => {
            this.setState({sum: resp.data});
        }).then(
            axios.get(`users/${global.userID}/monetary/credits/sum`).then(resp => {
                this.setState({sumout: resp.data});
            }).then(
                axios.get(`users/${global.userID}/monetary/debts/sum`).then(resp => {
                    this.setState({sumin: resp.data});
                }).then(
                    axios.get(`users/${global.userID}/item/debts/count`).then(resp => {
                        this.setState({countin: resp.data});
                    }).then(
                        axios.get(`users/${global.userID}/item/credits/count`).then(resp => {
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
        const {ContainerStyle} = styles;
        const {btnTxtStyle} = styles;
        const {sum, sumout, sumin, countout, countin, user} = this.state;


        return (
            <View style={ContainerStyle}>
                <View style={styles.sumStyle}>
                    <Text style={styles.titleTextUser}>
                        {user.username}
                    </Text>
                    <Text style={styles.titleText}>
                        Suma: {sum.sum}
                    </Text>
                    <Text style={styles.titleText}>
                        Suma out: {sumout.amount__sum} Suma in: {sumin.amount__sum}
                    </Text>
                    <Text style={styles.titleText}>
                        Przedmioty in: {countin.count} Przedmioty out: {countout.count}
                    </Text>
                </View>
                <View style={styles.buttonContainerStyle}>
                    <Button color='black' title="friends"
                            onPress={this.friends.bind(this)}/>
                    <View><Text/></View>
                    <Button color='black' title="money"
                            onPress={this.monetary.bind(this)}/>
                    <View><Text/></View>
                    <Button color='black' title="items" disabled
                            onPress={this.item.bind(this)}/>
                    <View><Text/></View>
                    <Button color='black' title="Logout"
                            onPress={this.handleRequest.bind(this)}/>


                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    buttonContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    ContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'white',
        textAlign: 'center',
    },
    sumStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingVertical: 10,
        alignItems: 'center',
        textAlign: 'center',
    },

    titleText: {
        fontWeight: 'bold',
        color: 'black',
    },
    titleTextUser: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 40,
    },
});

export default Home;