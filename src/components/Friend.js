import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';


class Friend extends Component {

    state = {
        friend: {},
        friendMon: [],
        friendSum: {},
        //friendItemDebts: [],
        //friendItemCredits: [],


    };


    getFriend(user_id) {
        const axios = require('axios');
        axios.get(`users/${user_id}`).then(resp => {
            this.setState({friend: resp.data});
        }).then(
            axios.get(`users/${global.userID}/monetary/sum/${user_id}`).then(resp => {
                this.setState({friendSum: resp.data});
            })
        );
    }

    componentDidMount() {
        this.getFriend(this.props.user_id);
    }

    monetary(){
        Actions.MonetaryList({user_id: this.props.user_id});
    }


    render() {
        const friend = this.state.friend;
        const sum = this.state.friendSum;
        const Mon = this.state.friendMon;
        const {buttonContainerStyle} = styles;
        const {btnTxtStyle} = styles;

        return (
            <View style={buttonContainerStyle}>
                <View style={styles.txtcontainer}>
                    <Text style={{fontSize: 60}}>
                        {friend.username}
                    </Text>
                    <Text style={{fontSize: 25}}>
                        Suma: {sum.sum}
                    </Text>
                </View>
                <Button color='black' title="monetary" titleStyle={btnTxtStyle}
                        onPress={this.monetary.bind(this)}/>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    txtcontainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingVertical: 10,
        alignItems: 'center',
        textAlign: 'center',
    },
    buttonContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    btnTxtStyle: {
        fontWeight: 'bold'
    },
    titleText: {
        color: 'black',
        fontSize: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemout: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: 'red'
    },
    itemin: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: 'green'
    },
    itemText: {
        color: '#fff',
        fontSize: 24
    }
});

export default Friend;