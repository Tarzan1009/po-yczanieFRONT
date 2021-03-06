import React, {Component, useState} from 'react';
import {View, Button, StyleSheet, Picker, Text, TextInput, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';

class CreateMonetary extends Component {

    state = {
        overlay: false,
        side: 1,
    };

    goBack() {
        Actions.pop();
    }

    componentDidMount() {
        if (this.props.user_id > 0) {
            this.setState({user_id: this.props.user_id});
            axios.get(`users/${this.props.user_id}`).then(resp => {
                this.setState({friend: resp.data, friendsLoaded: true})
            })
            ;
        } else {
            axios.get(`users/${global.userID}/friends`).then(resp => {
                this.setState({friends: resp.data, friendsLoaded: true})
            })
            ;
        }
        if (this.props.side > 0) {
            //1 - current user as debtor, 2 - current user as creditor
            this.setState({side: this.props.side});
        }
        const today = new Date();
        const curDate = today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getDate();
        this.setState({date: curDate})
    }

    async createMon() {
        if (this.state.date && this.state.user_id && this.state.side && this.state.amount) {
            let resp;
            if (this.state.side === 1) {
                resp = await axios.post('monetary',
                    {
                        amount: this.state.amount,
                        date: this.state.date,
                        creditor: this.state.user_id,
                        debtor: global.userID,
                    }).then(res => {
                    this.setState({status: res.status, requestDone: true});
                    return res;
                }).then(res => {axios.post('proposition',
                    {
                        monetary: res.data.id,
                        receiver: this.state.user_id,
                        sender: global.userID,
                    })})
            } else if (this.state.side === 2) {
                resp = await axios.post('monetary',
                    {
                        amount: this.state.amount,
                        date: this.state.date,
                        creditor: global.userID,
                        debtor: this.state.user_id,
                    }).then(res => {
                    this.setState({status: res.status, requestDone: true});
                    return res;
                }).then(res => {axios.post('proposition',
                    {
                        monetary: res.data.id,
                        receiver: this.state.user_id,
                        sender: global.userID,
                    })})
            }
            this.setState({overlay: true});
        } else {
            this.setState({status: "bad input", requestDone: true, overlay: true});
        }
    }

    render() {
        const curDate = this.state.date;
        return (
            <View style={styles.ContainerStyle}>

                <View style={styles.txtcontainer}>
                    <Text style={{fontSize: 25}}>
                        Borrowing:
                    </Text>
                    <Picker
                        selectedValue={this.state.side}
                        style={{height: 50, width: 150}}
                        onValueChange={(itemValue, itemIndex) => this.setState({side: itemValue})}
                    >
                        <Picker.Item key="1" label="from" value="1"/>
                        <Picker.Item key="2" label="to" value="2"/>
                    </Picker>
                    {!this.props.user_id &&
                    <Picker
                        selectedValue={this.state.friends}
                        style={{height: 50, width: 150}}
                        onValueChange={(itemValue, itemIndex) => this.setState({user_id: itemValue})}
                    >
                        {
                            this.state.friendsLoaded &&
                            this.state.friends.map((v) => {
                                return <Picker.Item key={v.id} label={v.username} value={v.id}/>
                            })

                        }
                    </Picker>}
                    {(this.props.user_id && this.state.friendsLoaded) &&
                    <Text style={{fontSize: 25}}>{this.state.friend.username}</Text>}

                    <Text> </Text>
                    <Text style={{fontSize: 25}}>Debt:</Text>
                    <Text> </Text>
                    <Text style={{fontSize: 15}}>
                        Date:
                    </Text>
                    <DatePicker
                        style={{width: 200}}
                        date={curDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2000-01-01"
                        maxDate={curDate}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => {
                            this.setState({date: date})
                        }}
                    />
                    <Text> </Text>
                    <TextInput
                        placeholder="Amount"
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyle}
                        keyboardType={'numeric'}
                        onChangeText={(numtext) => this.setState({amount: numtext})}
                    />


                </View>
                <Button color='black' title="Add"
                        onPress={this.createMon.bind(this)}/>
                {this.state.overlay &&
                <View style={styles.floatView}>
                    {(this.state.requestDone && this.state.status === 201) &&
                    <Text style={{fontSize: 30, color: 'white', textAlign: 'center',}}>
                        Created Item Debt {"\n"}
                        Waiting for approval from 2nd party
                    </Text>}
                    <Button color='black' title="ok"
                            onPress={this.goBack.bind(this)}/>
                </View>
                }

            </View>


        )
    }

}

const styles = StyleSheet.create({
    txtcontainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingVertical: 10,
        alignItems: 'center',
        textAlign: 'center',
    },
    floatView: {
        position: 'absolute',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    ContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    TextInputStyle: {
        textAlign: 'center',
        height: 40,
        width: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#009688',
        marginBottom: 10
    },
});

export default CreateMonetary;