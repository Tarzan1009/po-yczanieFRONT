import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';


class Monetary extends Component {

    state = {
        debt: {},
        debtor: {},
        creditor: {},
    };


    getDebt(debt_id) {
        let debtor_id;
        const axios = require('axios');
        axios.get(`monetary/${debt_id}`).then(resp => {
            this.setState({debt: resp.data});
        })
    }

    async componentDidMount() {
        //this.getDebt(this.props.debt_id);
        const debt = await axios.get(`monetary/${this.props.debt_id}`);
        const debtor = await axios.get(`users/${debt.data.debtor}`);
        const creditor = await axios.get(`users/${debt.data.creditor}`);
        this.setState({debt: debt.data, debtor: debtor.data, creditor: creditor.data})
    }


    render() {
        const debt = this.state.debt;
        const debtor = this.state.debtor;
        const creditor = this.state.creditor;
        const {buttonContainerStyle} = styles;
        const {btnTxtStyle} = styles;


        return (

            <View style={styles.txtcontainer}>
                <Text style={{fontSize: 60, color: 'white'}}>
                    {debt.amount}zł
                </Text>
                <Text style={{fontSize: 25, color: 'white'}}>
                    {debt.date}
                </Text>
                <Text style={styles.titleText}>
                    {creditor.username} -> {debtor.username}
                </Text>

            </View>

        );
    }
}


const styles = StyleSheet.create({
    buttonContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    btnTxtStyle: {
        fontWeight: 'bold'
    },
    titleText: {
        color: 'white',
        fontSize: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtcontainer: {
        justifyContent: 'center',
        padding: 20,
        paddingVertical: 10,
        alignItems: 'center',
        textAlign: 'center',
    },

});

export default Monetary;