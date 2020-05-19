import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {FlatList, ActivityIndicator} from 'react-native';


class Item extends Component {

    state = {
        debt: {},
        debtor: {},
        creditor: {},
    };


    async componentDidMount() {
        const debt = await axios.get(`item/${this.props.debt_id}`);
        const debtor = await axios.get(`users/${debt.data.debtor}`);
        const creditor = await axios.get(`users/${debt.data.creditor}`);
        this.setState({debt: debt.data, debtor: debtor.data, creditor: creditor.data});
    }


    render() {
        const debt = this.state.debt;
        const debtor = this.state.debtor;
        const creditor = this.state.creditor;
        const image = this.state.image;
        const {buttonContainerStyle} = styles;
        const {btnTxtStyle} = styles;
        console.log(debt.image);

        return (

            <View style={styles.container}>
                <Image source={{uri: debt.image}}
                       style={{width: 300, height: 300}} />
                <Text style={{fontSize: 50, color: 'white'}}>
                    {debt.name}
                </Text>
                <Text style={{fontSize: 25, color: 'white'}}>
                    {debt.date}
                </Text>
                {debt.deadline &&
                <Text style={{fontSize: 25, color: 'white'}}>
                    {debt.deadline}
                </Text>}
                <Text style={{fontSize: 20, color: 'white'}}>
                    {debt.info}
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
        justifyContent: 'center',
        padding: 20,
        paddingVertical: 10,
        alignItems: 'center',
        textAlign: 'center',
    },

});

export default Item;