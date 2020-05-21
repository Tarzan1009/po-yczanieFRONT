import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';

class Assignment extends Component {

    state = {
        debts: [],
    };

    async getMonetary() {
        const monetary = await axios.get(`users/${this.props.id}/monetary`);
        monetary.data.concat( (await axios.get(`users/${this.props.id}/item`).data));
        for(let i = 0; i < monetary.data.length; i++){
            let debtor = await axios.get(`users/${monetary.data[i].debtor}`);
            monetary.data[i].debtor_name = debtor.data.username;
            let creditor = await axios.get(`users/${monetary.data[i].creditor}`);
            monetary.data[i].creditor_name = creditor.data.username;
        }
        this.setState({debts: monetary.data.filter(function check(item){return item.isActive===true}),
            loading: false});
        //console.log(this.state);
    };

    componentDidMount() {
        console.log(this.props.id);
        this.getMonetary();
    }

    accept() {
        let debts = this.state.debts;
        for(let i = 0; i < debts.length; i++){
            if(debts[i].debtor === this.props.id && (!debts[i].amount>0)){
                console.log('1');
                let resp = axios.patch(`item/${debts[i].id}`,
                    {
                        debtor: global.userID
                    });
                console.log(resp.data);
            } else if(debts[i].creditor === this.props.id && (!debts[i].amount>0)){
                console.log('2');
                let resp = axios.patch(`item/${debts[i].id}`,
                    {
                        creditor: global.userID
                    });
                console.log(resp.data);
            } else if(debts[i].debtor === this.props.id && debts[i].amount>0){
                console.log('3');
                let resp = axios.patch(`monetary/${debts[i].id}`,
                    {
                        debtor: global.userID
                    });
                console.log(resp.data);
            } else if(debts[i].creditor === this.props.id && debts[i].amount>0){
                console.log('4');
                let resp = axios.patch(`monetary/${debts[i].id}`,
                    {
                        creditor: global.userID
                    });
                console.log(resp.data);
            }
        }
        let resp = axios.patch(`users/${this.props.id}`,
            {
                friends: []
            });
        this.deny()
    }

    deny() {
        let resp = axios.patch(`proposition/${this.props.notID}`,
            {
                isActive: false
            });
        Actions.home();
    }

    render() {
        const Debts = this.state.debts;

        const monClicked = (item) => {
            console.log(item);
        };

        return (

            <View style={styles.buttonContainerStyle}>
                <View style={styles.titleStyle}>
                <Text style={{fontSize:30, color: 'white'}}>Debts of {this.props.assignName}:</Text>
                </View>
                <View style={{flex:1, paddingTop:0}}>
                <FlatList
                    data={Debts}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => monClicked(item)}>
                            <View style={
                                (item.debtor === this.props.id) ? styles.itemin : styles.itemout
                            }>
                                {(item.debtor === this.props.id && !(item.amount > 0)) &&
                                <View>
                                    <Text style={styles.itemText}>{item.date} Borrowed {item.name}</Text>
                                    <Text style={styles.itemText}>from {item.debtor_name}</Text>
                                </View>}

                                {(item.creditor === this.props.id && !(item.amount > 0)) &&
                                <View>
                                    <Text style={styles.itemText}>{item.date} Lent {item.name}</Text>
                                    <Text style={styles.itemText}>to {item.debtor_name}</Text>
                                </View>}

                                {(item.debtor === this.props.id && item.amount > 0) &&
                                <View>
                                    <Text style={styles.itemText}>{item.date} Borrowed {item.amount} PLN</Text>
                                    <Text style={styles.itemText}>from {item.creditor_name}</Text>
                                </View>}

                                {(item.creditor === this.props.id && item.amount > 0) &&
                                <View>
                                    <Text style={styles.itemText}>{item.date} Lent {item.amount} PLN</Text>
                                    <Text style={styles.itemText}>to {item.debtor_name}</Text>
                                </View>}
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                </View>
                <TouchableOpacity
                    style={styles.accept}
                    onPress={this.accept.bind(this)}
                >
                    <Text style={{fontSize: 30}}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deny}
                    onPress={this.deny.bind(this)}
                >
                    <Text style={{fontSize: 30}}>-</Text>
                </TouchableOpacity>

            </View>

        );

    }
}


const styles = StyleSheet.create({
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
        bottom: 20,
        left: 20,
        alignSelf: 'flex-end'
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
        bottom: 20,
        right: 20,
        alignSelf: 'flex-end'
    },
    titleStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        height: 70,
        backgroundColor: '#282C35'
    },
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
        height:80,
        backgroundColor: 'red'
    },
    itemin: {
        flex: 1,
        padding: 10,
        height:80,
        backgroundColor: 'green'
    },
    itemText: {
        color: '#fff',
        fontSize: 24
    }
});

export default Assignment;