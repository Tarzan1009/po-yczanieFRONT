import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';


class Friend extends Component {

    state = {
        friend: {},
    };


    getFriend(user_id) {
        const axios = require('axios');
        axios.get(`userList/${user_id}`).then(resp => {

            //console.log(resp.data);
            this.setState({friend: resp.data});
            return resp.data;
        });
    }

    componentDidMount() {
        this.getFriend(this.props.user_id);
        console.log(this.props.user_id);
        //this.state.friends.forEach(this.myFun())
    }


    render() {
        const {friend} = this.state;
        const {buttonContainerStyle} = styles;
        const {btnTxtStyle} = styles;

            console.log(friend);


        const userclicked = (item) => {
            Actions.friend({user_id: item.user})
        };
        return (
            <View style={buttonContainerStyle}>
                <Text style={styles.titleText}>
                    ID = {friend.id}
                </Text>
                <Text style={styles.titleText}>
                    username = {friend.username}
                </Text>

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