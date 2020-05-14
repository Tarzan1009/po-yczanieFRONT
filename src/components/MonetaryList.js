import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';
import Monetary from "./Monetary";

class MonetaryList extends Component {

    state = {
        friendMon: [],
        layout: false,
        choice: 0,
    };


    getMonetaryWith(user_id) {
        const axios = require('axios');
            axios.get(`users/${global.userID}/monetary/${user_id}`).then(resp => {
                this.setState({friendMon: resp.data});
            }
        )
    }

    getMonetary() {
        const axios = require('axios');
        axios.get(`users/${global.userID}/monetary`).then(resp => {
                this.setState({friendMon: resp.data});
            }
        )
    }

    componentDidMount() {
        if(this.props.user_id > 0)
        {
            this.getMonetaryWith(this.props.user_id);
        }
        else
        {
            this.getMonetary();
        }
    }


    title(item) {
        if(item.debtor === global.userID)
        {
            return <Text style={styles.itemText}>{item.date} {item.amount} PLN</Text>
        }
        else
        {
            return <Text style={styles.itemText}>{item.date} -{item.amount} PLN</Text>
        }
    }

    closeOverlay() {
        this.setState({layout: false})
    }

    createNew() {
        if(this.props.user_id > 0)
        {
            Actions.CreateMonetary({user_id: this.props.user_id});
        }
        else
        {
            Actions.CreateMonetary();
        }
    }


    render() {
        const Mon = this.state.friendMon;
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
                                {(item.debtor === global.userID) ? <Text style={styles.itemText}>{item.date} Borrowed {item.amount} PLN</Text> : <Text style={styles.itemText}>{item.date} Lent {item.amount} PLN</Text>}
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
                    <Monetary debt_id={this.state.choice}/>
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
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: 'red'
    },
    itemin: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: 'green'
    },
    itemText: {
        color: '#fff',
        fontSize: 24
    }
});

export default MonetaryList;