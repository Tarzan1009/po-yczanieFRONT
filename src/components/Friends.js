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
        axios.get('myFriends').then(resp => {
            // console.log(resp.data);
            // console.log(resp.data.length);
            this.setState({loading: false, friends: resp.data});
            //resp.forEach(this.myFun);
            return resp.data;
        });
    }

    myFun(item) {
        // console.log(item.user);
        this.getFriend(item.user);
    }

    getFriend(user_id) {
        const axios = require('axios');
        axios.get(`userList/${user_id}`).then(resp => {

            //console.log(resp.data);
            this.state.friendsUser.push(resp.data);
            return resp.data;
        });
    }

    componentDidMount() {
        this.getFriends();
        //this.state.friends.forEach(this.myFun())
    }




    render() {
        const  { loading, friends, f } = this.state;
        const {buttonContainerStyle} = styles;
        const {btnTxtStyle} = styles;

        const userclicked = (item) => {
            Actions.friend({user_id: item.user})
        };
        return (
            <View>
                <FlatList
                    data={friends}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => userclicked(item)}>
                            <View style={styles.item}>
                                <Text style={styles.itemText}>{item.user}</Text>
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