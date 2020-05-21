import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';


class Assignments extends Component {

    state = {
        friends: [],
        propositions: [],
        overlay: false,
    };

    componentDidMount() {
            console.log(this.props.notif);
            this.getFriends(this.props.notif);
    }

    async getFriends(notif) {
        let friends = [];
        for (let i = 0; i < notif.length; i++) {
            let friend = await axios.get(`users/${notif[i].sender}`);
            friends[i] = friend.data;
            friends[i].notID = notif[i].id;
            let assignment = await axios.get(`users/${notif[i].toAssign}`);
            friends[i].assignID = assignment.data.id;
            friends[i].assignName = assignment.data.username;
        }
        this.setState({friends: friends, loading: false});

    }

    userClicked = (item) => {
        Actions.friend({user_id: item.id})
    };

    accept() {
        console.log("accept");
    }

    closeOverlay() {
        this.setState({overlay: false})
    }

    render() {
        const Mon = this.state.monetary;
        const Item = this.state.item;
        const Friend = this.state.friends;

        const choiceClicked = (item) => {
            Actions.Assignment({id: item.assignID, notID: item.notID, assignName: item.assignName})
        };



        return (
            <View style={styles.buttonContainerStyle}>
                <View>
                    <FlatList
                        data={Friend}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => choiceClicked(item)}>
                                <View style={styles.item}>

                                    <Text style={styles.itemText}>{item.username} wants to assign{"\n"}you as {item.assignName}</Text>

                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    txtContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingVertical: 10,
        alignItems: 'center',
        textAlign: 'center',
    },
    buttonContainerStyle: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: 'white',
    },
    btnTxtStyle: {
        fontWeight: 'bold'
    },
    accept: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        position: 'absolute',
        top: 0,
        left: 10,
        alignSelf: 'flex-start'
    },
    deny: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        position: 'absolute',
        top: 0,
        right: 10,
        alignSelf: 'flex-end'
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
    itemText: {
        color: '#fff',
        fontSize: 20
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        height: 80,
        justifyContent: 'center',
        backgroundColor: '#282C35'
    },
});

export default Assignments;