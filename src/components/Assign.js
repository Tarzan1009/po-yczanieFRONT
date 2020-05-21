import React, {Component} from 'react';
import {View, ScrollView, Button, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';


class Assign extends Component {

    state = {
        loading: true,
        friends: [],
        overlay: false,
        add: false,
    };


    async getFriends() {
        // const temp = this.getFriends();
        const friends = await axios.get(`users/${global.userID}/friends`);
        this.setState({friends: friends.data.filter(function check(item){return item.user}), loading: false});
        console.log(friends.data);
    };

    goBack() {
        Actions.home();
    }

    componentDidMount() {
        this.getFriends();
    }

    userClicked = (item) => {
        let resp = axios.post('proposition',{
            sender: global.userID,
            receiver: item.id,
            toAssign: this.props.id
        }).then(res => {
            this.setState({status: res.status, requestDone: true, overlay: true});
        })
    };

    render() {
        const friends = this.state.friends;
        return (
            <View style={{flex: 1}}>
                <View style={styles.titleStyle}>
                    <Text style={{fontSize:30, color: 'white'}}>Choose user to assign:</Text>
                </View>
                <View style={{flex: 1}}>

                    <FlatList
                        data={friends}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => this.userClicked(item)}>
                                <View style={styles.item}>
                                    <Text style={styles.itemText}>{item.username}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                {this.state.overlay &&
                <View style={styles.floatView}>
                    {(this.state.requestDone && this.state.status === 201) &&
                    <Text style={{fontSize: 30, color: 'white', textAlign: 'center',}}>
                        Created Assignment {"\n"}
                        Waiting for approval from 2nd party
                    </Text>}
                    <Button color='black' title="ok"
                            onPress={this.goBack.bind(this)}/>
                </View>
                }
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
    titleStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        height: 70,
        backgroundColor: '#282C35'
    },
    btnTxtStyle: {
        fontWeight: 'bold',
        color: 'black',

    },
    titleText: {
        color: 'white'
    },
    floatView: {
        position: 'absolute',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        height: 50,
        backgroundColor: '#282C35'
    },
    itemText: {
        color: '#fff',
        fontSize: 24
    },
    itemSum: {
        color: '#fff',
        fontSize: 24,
        marginLeft: 'auto'
    }

});

export default Assign;