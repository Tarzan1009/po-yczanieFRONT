import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';
import Item from "./Item";
import Monetary from "./Monetary.js";


class Notifications extends Component {

    state = {
        monetary: [],
        item: [],
        friends: [],
        propositions: [],
        overlay: false,
    };

    componentDidMount() {
        if (this.props.monetary === true) {
            console.log("m");
            this.getMonetary(this.props.notif);
        } else if (this.props.item === true) {
            console.log("i");
            this.getItem(this.props.notif);
        } else if (this.props.friend === true) {
            console.log("f");
            this.getFriends(this.props.notif);
        }
    }


    async getMonetary(notif) {
        let monetary = [];
        for (let i = 0; i < notif.length; i++) {
            let monetaryThis = await axios.get(`monetary/${notif[i].monetary}`);
            monetary[i] = monetaryThis.data;
            monetary[i].notID = notif[i].id;
        }
        for (let i = 0; i < monetary.length; i++) {
            let debtor = await axios.get(`users/${monetary[i].debtor}`);
            monetary[i].debtor_name = debtor.data.username;
            let creditor = await axios.get(`users/${monetary[i].creditor}`);
            monetary[i].creditor_name = creditor.data.username;
        }
        this.setState({monetary: monetary, loading: false});
        console.log("m2");
    }

    async getItem(notif) {
        let item = [];
        for (let i = 0; i < notif.length; i++) {
            let itemThis = await axios.get(`item/${notif[i].item}`);
            item[i] = itemThis.data;
            item[i].notID = notif[i].id;
        }
        for (let i = 0; i < item.length; i++) {
            let debtor = await axios.get(`users/${item[i].debtor}`);
            item[i].debtor_name = debtor.data.username;
            let creditor = await axios.get(`users/${item[i].creditor}`);
            item[i].creditor_name = creditor.data.username;
        }
        this.setState({item: item, loading: false});
        console.log("i2");
    }

    async getFriends(notif) {
        let friends = [];
        for (let i = 0; i < notif.length; i++) {
            let friend = await axios.get(`users/${notif[i].sender}`);
            friends[i] = friend.data;
            friends[i].notID = notif[i].id;
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
            console.log(item);
            this.setState({choice: item.id, overlay: true})
        };

        const acceptMon = (item) => {
            let resp = axios.patch(`monetary/${item.id}`,
                {
                    isActive: true
                });
            deny(item);
        };

        const acceptItem = (item) => {
            let resp = axios.patch(`item/${item.id}`,
                {
                    isActive: !item.isActive
                });
            deny(item);
        };

        const addToArr = (array, item) => {
            array.push(item);
            return array
        };

        const acceptFriend = (item) => {
            axios.get(`users/${global.userID}`).then(resp => {
                axios.patch(`users/${global.userID}`, {
                    friends: addToArr(resp.data.friends, item.id)
            })
            });
            deny(item);
        };

        const deny = (item) => {
            let resp = axios.patch(`proposition/${item.notID}`,
                {
                    isActive: false
                });
            Actions.home();
        };



        return (
            <View style={styles.buttonContainerStyle}>

                {this.props.monetary === true &&
                <FlatList
                    data={Mon}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => choiceClicked(item)}>
                            <View style={
                                (item.debtor === global.userID) ? styles.itemin : styles.itemout
                            }>
                                {(item.debtor === global.userID) ?
                                    (<View>
                                        <TouchableOpacity
                                            style={styles.accept}
                                            onPress={() => acceptMon(item)}
                                        >
                                            <Text style={{fontSize: 30}}>+</Text>
                                        </TouchableOpacity>
                                        <View style={{flex: 1, paddingHorizontal: 80}}>
                                            <Text style={styles.itemText}>{item.date} Borrowed {item.amount} PLN</Text>
                                            <Text style={styles.itemText}>from {item.creditor_name}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.deny}
                                            onPress={() => deny(item)}
                                        >
                                            <Text style={{fontSize: 30}}>-</Text>
                                        </TouchableOpacity>
                                    </View>)
                                    :
                                    (<View>
                                        <TouchableOpacity
                                            style={styles.accept}
                                            onPress={() => acceptMon(item)}
                                        >
                                            <Text style={{fontSize: 30}}>+</Text>
                                        </TouchableOpacity>
                                        <View style={{flex: 1, paddingHorizontal: 80}}>
                                            <Text style={styles.itemText}>{item.date} Lent {item.amount} PLN</Text>
                                            <Text style={styles.itemText}>to {item.debtor_name}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.deny}
                                            onPress={() => deny(item)}
                                        >
                                            <Text style={{fontSize: 30}}>-</Text>
                                        </TouchableOpacity>
                                    </View>)
                                }
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />}

                {this.props.item === true &&
                <FlatList
                    data={Item}
                    renderItem={({item}) => (
                        <TouchableOpacity /*onPress={() => choiceClicked(item)} throws errors for some reason*/>
                            <View style={
                                (item.debtor === global.userID) ? styles.itemin : styles.itemout
                            }>

                                {(item.debtor === global.userID) ?
                                    (<View>
                                        <TouchableOpacity
                                            style={styles.accept}
                                            onPress={() => acceptItem(item)}
                                        >
                                            <Text style={{fontSize: 30}}>+</Text>
                                        </TouchableOpacity>
                                        <View style={styles.image}>
                                            {item.image ?
                                                <Image source={{uri: item.image}}
                                                       style={{height: 80, width: 80}}/>
                                                :
                                                <Image source={require('../../assets/photo.png')}
                                                       style={{height: 80, width: 80}}/>
                                            }
                                        </View>
                                        <View style={{flex: 1, paddingLeft: 160, paddingRight: 80}}>
                                            <Text style={styles.itemText}>{item.isActive ? "Return " : "New "}{item.date} Borrowed {item.name}</Text>
                                            <Text style={styles.itemText}>from {item.debtor_name}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.deny}
                                            onPress={() => deny(item)}
                                        >
                                            <Text style={{fontSize: 30}}>-</Text>
                                        </TouchableOpacity>
                                    </View>)
                                    :
                                    (<View>
                                        <TouchableOpacity
                                            style={styles.accept}
                                            onPress={() => acceptItem(item)}
                                        >
                                            <Text style={{fontSize: 30}}>+</Text>
                                        </TouchableOpacity>
                                        <View style={styles.image}>
                                            {item.image ?
                                                <Image source={{uri: item.image}}
                                                       style={{height: 80, width: 80}}/>
                                                :
                                                <Image source={require('../../assets/photo.png')}
                                                       style={{height: 80, width: 80}}/>
                                            }
                                        </View>
                                        <View style={{flex: 1, paddingLeft: 160, paddingRight: 80}}>
                                            <Text style={styles.itemText}>{item.isActive ? "Return " : "New "}{item.date} Lent {item.name}</Text>
                                            <Text style={styles.itemText}>to {item.debtor_name}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.deny}
                                            onPress={() => deny(item)}
                                        >
                                            <Text style={{fontSize: 30}}>-</Text>
                                        </TouchableOpacity>
                                    </View>)}
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                }

                {this.props.friend === true &&
                <View>
                    <FlatList
                        data={Friend}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => this.userClicked(item)}>
                                <View style={styles.item}>

                                    <TouchableOpacity
                                        style={styles.accept}
                                        onPress={() => acceptFriend(item)}
                                    >
                                        <Text style={{fontSize: 30}}>+</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.itemText}>{item.username}</Text>

                                    <TouchableOpacity
                                        style={styles.deny}
                                        onPress={() => deny(item)}
                                    >
                                        <Text style={{fontSize: 30}}>-</Text>
                                    </TouchableOpacity>

                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                }


                {this.state.overlay === true &&
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

                    {this.props.item === true &&
                    <Item debt_id={this.state.choice}/>}

                    {this.props.monetary === true &&
                    <Monetary debt_id={this.state.choice}/>}

                </View>)
                }
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
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    floatView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        padding: 80,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    btnTxtStyle: {
        fontWeight: 'bold'
    },
    image: {
        position: 'absolute',
        left: 70,
        top: 0,
        alignSelf: 'flex-start'
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
        left: 10,
        top: 10,
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
        right: 10,
        top: 10,
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
    itemout: {
        flex: 1,
        padding: 10,
        height: 100,
        width: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    itemin: {
        flex: 1,
        padding: 10,
        height: 100,
        width: '100%',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
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
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#282C35'
    },
});

export default Notifications;