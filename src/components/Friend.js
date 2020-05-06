import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';


class Friend extends Component {

    state = {
        friend: {},
        friendMonDebts: [],
        friendMonCredits: [],
        friendSum: {},
        //friendItemDebts: [],
        //friendItemCredits: [],


    };


    getFriend(user_id) {
        const axios = require('axios');
        axios.get(`users/${user_id}`).then(resp => {
            this.setState({friend: resp.data});
        }).then(
            axios.get(`users/${global.userID}/sum/${user_id}`).then(resp => {
                this.setState({friendSum: resp.data});
            }).then(
                axios.get(`users/${global.userID}/monetary_debts/${user_id}`).then(resp => {
                    this.setState({friendMonDebts: resp.data});
                }).then(
                    axios.get(`users/${global.userID}/monetary_credits/${user_id}`).then(resp => {
                        this.setState({friendMonCredits: resp.data});
                    })
                )
            )
        );
    }

    componentDidMount() {
        this.getFriend(this.props.user_id);
    }


    render() {
        const friend = this.state.friend;
        const sum = this.state.friendSum;
        const MonDebts = this.state.friendMonDebts;
        const MonCredits = this.state.friendMonCredits;
        const {buttonContainerStyle} = styles;
        const {btnTxtStyle} = styles;

        const monclicked = (item) => {
            Actions.monetary({debt_id: item.id})
        };

        return (
            <View style={buttonContainerStyle}>
                <Text style={styles.titleText}>
                    Nazwa = {friend.username}
                </Text>
                <Text style={styles.titleText}>
                    Suma = {sum.sum}
                </Text>
                <FlatList
                    data={MonDebts}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => monclicked(item)}>
                            <View style={styles.item}>
                                <Text style={styles.itemText}>{item.date}    {item.amount} zł</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <FlatList
                    data={MonCredits}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => monclicked(item)}>
                            <View style={styles.item}>
                                <Text style={styles.itemText}>{item.date}    -{item.amount} zł</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

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
        color: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: '#282C35'
    },
    itemText: {
        color: '#fff',
        fontSize: 24
    }
});

export default Friend;