import React, {Component} from 'react';
import {View, ScrollView, Button, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';


class Friends extends Component {

    state = {
        loading: true,
        friends: [],
        layout: false,
        add: false,
    };


    getFriends() {
        const axios = require('axios');
        axios.get(`users/${global.userID}/friends`).then(resp => {
            this.setState({loading: false, friends: resp.data});
            return resp.data;
        });
    }


    async componentDidMount() {
        // const temp = this.getFriends();
        let friendsWithSum = [];
        const friendslist = await axios.get(`users/${global.userID}/friends`);

        async function myFun(item, index, array) {
            const resp = await axios.get(`users/${global.userID}/sum/${item.id}`);
            item.sum = resp.data.sum;
            return item;
        }

        //friendslist.data.map(await myFun);
        //console.log(friendslist.data);
        this.setState({loading: false, friends: friendslist.data})
    };

    showOverlay() {
        this.setState({layout: true})
    }

    closeOverlay() {
        this.setState({layout: false})
    }

    addTab() {
        this.setState({add: true});
        console.log('addtab')
    }

    searchTab() {
        this.setState({add: false})
    }

    userClicked = (item) => {
        Actions.friend({user_id: item.id})
    };

    render() {
        const {loading, friends} = this.state;
        // console.log(friends);
        const {buttonContainerStyle} = styles;
        const {btnTxtStyle} = styles;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>

                    <FlatList
                        data={friends}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => this.userClicked(item)}>
                                <View style={styles.item}>
                                    <Text style={styles.itemText}>{item.username} {item.sum}zł</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    {this.state.layout === true &&
                    (<View style={styles.floatView}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,1)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 50,
                                height: 50,
                                backgroundColor: '#fff',
                                borderRadius: 25,
                                position: 'absolute',
                                top: 20,
                                right: 20,
                                alignSelf: 'flex-end'
                            }}
                            onPress={this.closeOverlay.bind(this)}
                        >
                            <Text style={{fontSize: 30}}>X</Text>
                        </TouchableOpacity>

                        <View style={styles.tabs}>
                            <View style={styles.tab}>
                                <TouchableOpacity disabled={true} style={{backgroundColor: 'gray', padding: 5}}>
                                    <Text style={{fontSize: 20}}>Search</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.tab}>
                                <TouchableOpacity style={{backgroundColor: 'white', padding: 5}} onpress={this.state.add = true}>
                                    <Text style={{fontSize: 20}}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)
                    }
                </View>

                {this.state.layout === false &&
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: '#fff',
                        borderRadius: 25,
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        alignSelf: 'flex-end'
                    }}
                    onPress={this.showOverlay.bind(this)}
                >
                    <Text style={{fontSize: 30}}>+</Text>
                </TouchableOpacity>}
            </View>


        );
    }
}


const styles = StyleSheet.create({
    buttonContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    tabs: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 80,
    },
    tab: {
        width: '50%',
        height: 40,
        justifyContent: 'center',
    },
    floatView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    btnTxtStyle: {
        fontWeight: 'bold',
        color: 'black',

    },
    titleText: {
        color: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
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