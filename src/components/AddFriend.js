import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';


class AddFriend extends Component {

    state = {
        overlay: false,
        users: [],
        requestDone: false,
        friends: [],
    };

    async getFriends(){
        let curUser = await axios.get(`users/${global.userID}`);
        this.setState({friends: curUser.data.friends});

    }

    componentDidMount() {
        if(this.props.account===1){
            this.getFriends();

        }
    }

    check(item){
        if(item.id===global.userID){return false;}
        let friends = this.state.friends;
        console.log(friends);
        for(let i = 0; i < friends.length; i++){
            if(item.id===friends[i]){
                return false;
            }
        }
        return item.user
    }

    async createFriend() {
        let newUser = await axios.post('users',
            {
                username: this.state.name,
            });

        let curUser = await axios.get(`users/${global.userID}`);
        curUser.data.friends.push(newUser.data.id);
        let resp = await axios.patch(`users/${global.userID}`, curUser.data);
        this.setState({status: resp.status, overlay: true, requestDone: true});
        console.log(this.state.status);
    }

    async search(text){
        if(text) {
            let resp = await axios.get(`users/search/${text}`);
            console.log(resp.data);
            this.setState({users: resp.data.filter(this.check.bind(this))});
        }
    }

    async addFriend(id){
        console.log(id);
        let curUser = await axios.get(`users/${global.userID}`);
        curUser.data.friends.push(id);
        let resp = await axios.patch(`users/${global.userID}`, curUser.data);
        this.setState({status: resp.status, overlay: true, requestDone: true});
        console.log(this.state.status);
    }

    userClicked = (item) => {
        this.addFriend(item.id);

    };

    goBack() {
        Actions.pop();
    }


    render() {
        const users = this.state.users;

        return (
            <View style={{flex: 1}}>
                {this.props.account === 0 &&
                <View style={styles.ContainerStyle}>
                    <TextInput
                        placeholder="Name"
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({name: text})}
                        style={styles.TextInputStyle}
                    />
                    <Button color='black' title="Add"
                            onPress={this.createFriend.bind(this)}/>
                </View>
                }
                {this.props.account === 1 &&
                <View style={styles.ContainerStyle}>
                    <TextInput
                        placeholder="Search"
                        autoCorrect={false}
                        onChangeText={(text) => this.search(text)}
                        style={styles.TextInputStyle}
                    />
                    <FlatList
                        data={users}
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
                }
                {this.state.overlay &&
                <View style={styles.floatView}>
                    <Text style={{fontSize: 50}}>{this.state.requestDone && this.state.status}</Text>
                    <Button color='black' title="ok"
                            onPress={this.goBack.bind(this)}/>
                </View>
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    ContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 50,
    },
    TextInputStyle: {
        textAlign: 'center',
        height: 40,
        width: 300,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#009688',
        marginBottom: 10
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        height: 50,
        width: 300,
        backgroundColor: '#282C35'
    },
    itemText: {
        color: '#fff',
        fontSize: 24,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    floatView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
});

export default AddFriend;