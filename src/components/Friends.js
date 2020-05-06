import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';


class Friends extends Component {

    state = {
        loading: true,
        friends: [],
        friendsUser: [],
    };


    getFriends() {
        const axios = require('axios');
        axios.get(`users/${global.userID}/friends`).then(resp => {
            this.setState({loading: false, friends: resp.data});
            return resp.data;
        });
    }

    myFun(input) {
        const arr = [];
        for (const element of input) {
            const user = this.getFriend(element.user);
        }
        return arr;
    }

    getFriend(user_id) {
        const axios = require('axios');
        let data = {};
        return axios.get(`user_list/${user_id}`).then(resp => {
            return resp.data;
        });
    }

    componentDidMount() {
        const temp = this.getFriends();
        //this.state.friends.forEach(this.myFun())
    }




    render() {
        const  { loading, friends, f } = this.state;
        const {buttonContainerStyle} = styles;
        const {btnTxtStyle} = styles;
        const { data } = this.myFun(friends);

        const userclicked = (item) => {
            Actions.friend({user_id: item.id})
        };
        return (
            <View>
                <FlatList
                    data={friends}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => userclicked(item)}>
                            <View style={styles.item}>
                                <Text style={styles.itemText}>{item.username}</Text>
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

export default Friends;