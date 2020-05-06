import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';


class Monetary extends Component {

    state = {
        debt: {},
    };


    getDebt(debt_id) {
        let debtor_id;
        const axios = require('axios');
        axios.get(`monetary/${debt_id}`).then(resp => {
            this.setState({debt: resp.data});
        })
    }

    componentDidMount() {
        this.getDebt(this.props.debt_id);

    }


    render() {
        const debt = this.state.debt;
        const {buttonContainerStyle} = styles;
        const {btnTxtStyle} = styles;
        console.log(this.state);


        return (
            <View style={buttonContainerStyle}>
                <Text style={styles.titleText}>
                    Dłużnik = {debt.debtor}
                </Text>
                <Text style={styles.titleText}>
                    Data = {debt.date}
                </Text>
                <Text style={styles.titleText}>
                    Suma = {debt.amount}
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
        backgroundColor: '#121212',
    },
    btnTxtStyle: {
        fontWeight: 'bold'
    },
    titleText: {
        color: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: '#282C35'
    },
    itemText: {
        color: '#fff',
        fontSize: 24
    }
});

export default Monetary;