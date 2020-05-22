import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';
import Monetary from "./Monetary";

class MonetaryList extends Component {

    state = {
        monetary: [],
        layout: false,
        choice: 0,
    };

    async getMonetary() {
        // const temp = this.getFriends();
        const monetary = await axios.get(`users/${global.userID}/monetary`);
        for(let i = 0; i < monetary.data.length; i++){
            let debtor = await axios.get(`users/${monetary.data[i].debtor}`);
            monetary.data[i].debtor_name = debtor.data.username;
            let creditor = await axios.get(`users/${monetary.data[i].creditor}`);
            monetary.data[i].creditor_name = creditor.data.username;
        }
        this.setState({monetary: monetary.data.filter(function check(item){return item.isActive===true}),
            loading: false});
        //console.log(this.state);
    };

    async getMonetaryWith(user_id) {
        // const temp = this.getFriends();
        const monetary = await axios.get(`users/${global.userID}/monetary/${user_id}`);
        monetary.data.filter(function check(item){return item.isActive});
        console.log(monetary.data);
        for(let i = 0; i < monetary.data.length; i++){
            let debtor = await axios.get(`users/${monetary.data[i].debtor}`);
            monetary.data[i].debtor_name = debtor.data.username;
            let creditor = await axios.get(`users/${monetary.data[i].creditor}`);
            monetary.data[i].creditor_name = creditor.data.username;
        }
        this.setState({monetary: monetary.data.filter(function check(item){return item.isActive===true}),
            loading: false});
        //console.log(this.state);
    };

    componentDidMount() {
        if (this.props.user_id > 0) {
            this.getMonetaryWith(this.props.user_id);
        } else {
            this.getMonetary();
        }
    }

    closeOverlay() {
        this.setState({layout: false})
    }

    createNew() {
        if (this.props.user_id > 0) {
            Actions.CreateMonetary({user_id: this.props.user_id});
        } else {
            Actions.CreateMonetary();
        }
    }


    render() {
        const Mon = this.state.monetary;
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
                                {(item.debtor === global.userID) ?
                                    (<View>
                                        <Text style={styles.itemText}>{item.date} Borrowed {item.amount} PLN</Text>
                                        <Text style={styles.itemText}>from {item.creditor_name}</Text>
                                    </View>)
                                    :
                                    (<View>
                                        <Text style={styles.itemText}>{item.date} Lent {item.amount} PLN</Text>
                                        <Text style={styles.itemText}>to {item.debtor_name}</Text>
                                    </View>)
                                }
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
                    <Image source={require('../../assets/add.png')}
                           style={{height: 35, width: 35}}/>
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
                        <Image source={require('../../assets/close.png')}
                               style={{height: 35, width: 35}}/>
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
        backgroundColor: 'red'
    },
    itemin: {
        flex: 1,
        padding: 10,
        backgroundColor: 'green'
    },
    itemText: {
        color: '#fff',
        fontSize: 24
    }
});

export default MonetaryList;