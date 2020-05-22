import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';
import Item from "./Item";

class ItemList extends Component {

    state = {
        items: [],
        layout: false,
        choice: 0,
    };


    componentDidMount() {
        if (this.props.user_id > 0) {
            this.getItemWith(this.props.user_id);
        } else {
            this.getItem();
        }
    }

    async getItem() {
        // const temp = this.getFriends();
        const item = await axios.get(`users/${global.userID}/item`);
        for (let i = 0; i < item.data.length; i++) {
            let debtor = await axios.get(`users/${item.data[i].debtor}`);
            item.data[i].debtor_name = debtor.data.username;
            let creditor = await axios.get(`users/${item.data[i].creditor}`);
            item.data[i].creditor_name = creditor.data.username;
        }
        this.setState({
            items: item.data.filter(function check(item) {
                return item.isActive === true
            }),
            loading: false
        });
        //console.log(this.state);
    };

    async getItemWith(user_id) {
        // const temp = this.getFriends();
        const item = await axios.get(`users/${global.userID}/item/${user_id}`);
        for (let i = 0; i < item.data.length; i++) {
            let debtor = await axios.get(`users/${item.data[i].debtor}`);
            item.data[i].debtor_name = debtor.data.username;
            let creditor = await axios.get(`users/${item.data[i].creditor}`);
            item.data[i].creditor_name = creditor.data.username;
        }
        this.setState({
            items: item.data.filter(function check(item) {
                return item.isActive === true
            }), loading: false
        });
        //console.log(this.state);
    };

    // getItemWith(user_id) {
    //     const axios = require('axios');
    //     axios.get(`users/${global.userID}/item/${user_id}`).then(resp => {
    //             this.setState({friendMon: resp.data});
    //         }
    //     )
    // }
    //
    // getItem() {
    //     const axios = require('axios');
    //     axios.get(`users/${global.userID}/item`).then(resp => {
    //             this.setState({friendMon: resp.data});
    //         }
    //     )
    // }

    closeOverlay() {
        this.setState({layout: false})
    }

    createNew() {
        if (this.props.user_id > 0) {
            Actions.CreateItem({user_id: this.props.user_id});
        } else {
            Actions.CreateItem();
        }
    }


    render() {
        const Mon = this.state.items;
        const {buttonContainerStyle} = styles;
        const {btnTxtStyle} = styles;

        const monClicked2 = (item) => {
            Actions.monetary({debt_id: item.id})
        };

        const monClicked = (item) => {
            this.setState({choice: item.id, layout: true})
        };

        return (

            <View style={buttonContainerStyle}>
                <FlatList
                    data={Mon}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => monClicked(item)}>
                            <View style={
                                (item.debtor === global.userID) ? styles.itemin : styles.itemout
                            }>
                                <View style={{paddingRight: 10}}>
                                    {item.image ?
                                        <Image source={{uri: item.image}}
                                               style={{height: 80, width: 80}}/>
                                        :
                                        <Image source={require('../../assets/photo.png')}
                                               style={{height: 80, width: 80}}/>
                                    }
                                </View>
                                {(item.debtor === global.userID) ?
                                    (<View>
                                        <Text style={styles.itemText}>{item.date} Borrowed {item.name}</Text>
                                        <Text style={styles.itemText}>from {item.debtor_name}</Text>
                                    </View>)
                                    :
                                    (<View>
                                        <Text style={styles.itemText}>{item.date} Lent {item.name}</Text>
                                        <Text style={styles.itemText}>to {item.debtor_name}</Text>
                                    </View>)}
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
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
                    onPress={this.createNew.bind(this)}
                >
                    <Text style={{fontSize: 30}}>+</Text>
                </TouchableOpacity>
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
                    <Item debt_id={this.state.choice}/>
                </View>)
                }

            </View>

        );
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
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        height: 80,
        backgroundColor: 'red'
    },
    itemin: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        height: 80,
        backgroundColor: 'green'
    },
    itemText: {
        color: '#fff',
        fontSize: 24
    }
});

export default ItemList;