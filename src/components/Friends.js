import React, {Component} from 'react';
import {View, ScrollView, Button, StyleSheet, Text, TouchableOpacity, TextInput, Image} from 'react-native';
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


    async getFriends() {
        // const temp = this.getFriends();
        const friends = await axios.get(`users/${global.userID}/friends`);
        for(let i = 0; i < friends.data.length; i++){
            let sum = await axios.get(`users/${global.userID}/monetary/sum/${friends.data[i].id}`);
            friends.data[i].sum = sum.data.sum;
        }
        this.setState({friends: friends.data, loading: false});
        console.log(friends.data);
    };

    componentDidMount() {
        this.getFriends();
    }

    showOverlay() {
        this.setState({layout: true})
    }

    closeOverlay() {
        this.setState({layout: false})
    }

    without() {
        Actions.AddFriend({account: 0});
    }

    with() {
        Actions.AddFriend({account: 1});
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
                                    <Text style={styles.itemText}>{item.username}</Text><Text style={styles.itemSum}> {item.sum}PLN</Text>
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
                            <Image source={require('../../assets/close.png')}
                                   style={{height: 35, width: 35}}/>
                        </TouchableOpacity>

                        <View style={styles.buttonContainerStyle}>
                            <Button color='black' title="With account"
                                    onPress={this.with.bind(this)}/>
                            <View><Text/></View>
                            <Button color='black' title="Without account"
                                    onPress={this.without.bind(this)}/>
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
                    <Image source={require('../../assets/add.png')}
                           style={{height: 35, width: 35}}/>
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

export default Friends;