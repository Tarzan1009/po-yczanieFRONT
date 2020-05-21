import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import Monetary from "./Monetary";


class Home extends Component {

    state = {
        sum: 0,
        sumout: 0,
        sumin: 0,
        countout: 0,
        countin: 0,
        user: {},
        itemNot: [],
        monNot: [],
        friendNot: [],
        assignNot: [],
        overlay: false,
    };

    handleRequest() {
        // This request will only succeed if the Authorization header
        // contains the API token
        axios
            .get('auth/logout/')
            .then(response => {
                Actions.auth()
            })
            .catch(error => console.log(error))
            .then(response => {
                axios.defaults.headers.common.Authorization = null;
                global.userID = 0;
                Actions.auth()
            });

    }

    friends() {
        Actions.friends();
    };

    monetary() {
        Actions.MonetaryList();
    };

    item() {
        Actions.ItemList();
    };

    friendsNot() {
        Actions.Notifications({friend: true, notif: this.state.friendNot});
    };

    monetaryNot() {
        Actions.Notifications({monetary: true, notif: this.state.monNot});
    };

    itemNot() {
        Actions.Notifications({item: true, notif: this.state.itemNot});
    };

    assignNot() {
        Actions.Assignments({notif: this.state.assignNot});
    };

    checkNot() {
        this.getNotifications()
    }

    consoleLog() {
        console.log(this.state);
    }


    componentDidMount() {
        console.log(axios.defaults.headers.common.Authorization);
        if(axios.defaults.headers.common.Authorization === null || axios.defaults.headers.common.Authorization === undefined){
            Actions.auth();
        }
        if(!(global.userID>0)) {
            axios.get('current_user').then(res => {
                global.userID = res.data[0].id;
            })
        }
        this.getSum();
        this.getNotifications();

    }

    getNotifications() {
        axios.get(`users/${global.userID}/proposition/receiver`).then(resp => {
            this.setState({
                monNot: resp.data.filter(function checkM(item) {
                    return (item.monetary>0 && item.isActive)
                }),
                itemNot: resp.data.filter(function checkM(item) {
                    return (item.item>0 && item.isActive)
                }),
                assignNot: resp.data.filter(function checkM(item) {
                    return (item.toAssign>0 && item.isActive)
                }),
                friendNot: resp.data.filter(function checkM(item) {
                    return (!(item.item || item.monetary || item.toAssign)>0 && item.isActive)
                }),
                overlay: (resp.data.filter(function checkM(item) {
                        return (!(item.item || item.monetary || item.toAssign)>0 && item.isActive)
                    }).length>0 ||
                    resp.data.filter(function checkM(item) {
                        return (item.item>0 && item.isActive)
                    }).length>0 ||
                    resp.data.filter(function checkM(item) {
                        return (item.toAssign>0 && item.isActive)
                    }).length>0 ||
                    resp.data.filter(function checkM(item) {
                        return (item.monetary>0 && item.isActive)
                    }).length>0)
            });
        })


    }

    getSum() {
        const axios = require('axios');
        axios.get(`users/${global.userID}/monetary/sum`).then(resp => {
            this.setState({sum: resp.data});
        }).then(
            axios.get(`users/${global.userID}/monetary/credits/sum`).then(resp => {
                this.setState({sumout: resp.data});
            }).then(
                axios.get(`users/${global.userID}/monetary/debts/sum`).then(resp => {
                    this.setState({sumin: resp.data});
                }).then(
                    axios.get(`users/${global.userID}/item/debts/count`).then(resp => {
                        this.setState({countin: resp.data});
                    }).then(
                        axios.get(`users/${global.userID}/item/credits/count`).then(resp => {
                            this.setState({countout: resp.data});
                        }).then(
                            axios.get(`users/${global.userID}`).then(resp => {
                                this.setState({user: resp.data});
                            })
                        )
                    )
                )
            )
        );
    }

    refresh() {
        this.getSum();
        this.getNotifications();
    }

    closeOverlay() {
        this.setState({overlay: false})
    }


    render() {
        const {ContainerStyle} = styles;
        const {btnTxtStyle} = styles;
        const {sum, sumout, sumin, countout, countin, user} = this.state;

        return (
            <View style={ContainerStyle}>
                <View style={styles.sumStyle}>
                    <Text style={styles.titleText}>
                        Welcome back
                    </Text>
                    <Text style={styles.titleTextUser}>
                        {user.username}
                    </Text>
                    <Text style={styles.titleText}>
                        Sum: {sum.sum}
                    </Text>
                    <Text style={styles.titleText}>
                        Credits: {sumout.sum} Debts: {sumin.sum}
                    </Text>
                    <Text style={styles.titleText}>
                        Items borrowed: {countin.count}
                    </Text>
                    <Text style={styles.titleText}>
                        Items lent: {countout.count}
                    </Text>
                </View>
                <View style={styles.buttonContainerStyle}>
                    {/*<Button color='black' title="Log"*/}
                    {/*        onPress={this.consoleLog.bind(this)}/>*/}
                    {/*<View><Text/></View>*/}
                    <Button color='black' title={"Notifications ".concat(this.state.friendNot.length+this.state.monNot.length+this.state.itemNot.length+this.state.assignNot.length).concat(" new")}
                            onPress={this.checkNot.bind(this)}/>
                    <View><Text/></View>
                    <Button color='black' title="friends"
                            onPress={this.friends.bind(this)}/>
                    <View><Text/></View>
                    <Button color='black' title="money"
                            onPress={this.monetary.bind(this)}/>
                    <View><Text/></View>
                    <Button color='black' title="items"
                            onPress={this.item.bind(this)}/>
                    <View><Text/></View>
                    <Button color='black' title="Logout" disabled
                        onPress={this.handleRequest.bind(this)}
                    />


                </View>
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
                    onPress={this.refresh.bind(this)}
                >
                    <Text style={{fontSize: 30}}>R</Text>
                </TouchableOpacity>
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
                    <View style={{backgroundColor: 'white', padding: 40}}>
                        <Button color='black' title={"friends ".concat(this.state.friendNot.length).concat(" new")}
                                onPress={this.friendsNot.bind(this)}/>
                        <View><Text/></View>
                        <Button color='black' title={"money ".concat(this.state.monNot.length).concat(" new")}
                                onPress={this.monetaryNot.bind(this)}/>
                        <View><Text/></View>
                        <Button color='black' title={"items ".concat(this.state.itemNot.length).concat(" new")}
                                onPress={this.itemNot.bind(this)}/>
                        <View><Text/></View>
                        <Button color='black' title={"assignments ".concat(this.state.assignNot.length).concat(" new")}
                                onPress={this.assignNot.bind(this)}/>
                    </View>
                </View>)
                }

            </View>
        );
    }
}


const styles = StyleSheet.create({

    floatView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        padding: 80,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    buttonContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 40,
    },
    ContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',

        backgroundColor: 'white',
        textAlign: 'center',
    },
    sumStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingVertical: 10,
        alignItems: 'center',
        textAlign: 'center',
    },

    titleText: {
        fontWeight: 'bold',
        color: 'black',
    },
    titleTextUser: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 40,
    },
});

export default Home;