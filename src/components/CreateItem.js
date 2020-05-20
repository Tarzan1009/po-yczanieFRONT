import React, {Component, useState} from 'react';
import {View, Button, StyleSheet, Picker, Text, TextInput, PixelRatio, CheckBox, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';

class CreateItem extends Component {

    state = {
        overlay: false,
        side: 1,
        checked: false,
        info: "",
        avatarSource: null,
    };


    goBack() {
        Actions.pop();
    }

    constructor(props) {
        super(props);

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    onChangeCheck() {
        this.setState({ checked: !this.state.checked});
        console.log("test")
    }

    componentDidMount() {
        if (this.props.user_id > 0) {
            this.setState({user_id: this.props.user_id});
            axios.get(`users/${this.props.user_id}`).then(resp => {
                this.setState({user_id: resp.data.id, friend: resp.data, friendsLoaded: true})
            })
            ;
        } else {
            axios.get(`users/${global.userID}/friends`).then(resp => {
                this.setState({user_id: resp.data[0].id, friends: resp.data, friendsLoaded: true})
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

    createMon() {
        if (this.state.date && this.state.user_id && this.state.side) {
            let resp;
            let data = {
                name: this.state.name,
                date: this.state.date,
                isActive: true,
                info: this.state.info,
                creditor: global.userID,
                debtor: this.state.user_id,
            };
            if (this.state.side === 1) {
                data.creditor = this.state.user_id;
                data.debtor = global.userID;
            } else if (this.state.side === 2) {
                data.creditor = global.userID;
                data.debtor = this.state.user_id;
            }
            if (this.state.checked) {
                data.deadline = this.state.deadline;
            }
            resp = axios.post('item',
                data).then(res => {
                this.setState({status: res.status, requestDone: true});
                return res.status;
            });
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
                    <Text style={{fontSize: 25}}>Item:</Text>
                    <Text> </Text>
                    <TextInput
                        placeholder="Name"
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({name: text})}
                        style={styles.TextInputStyle}
                    />
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
                    <View style={{flexDirection: 'column', padding: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{padding: 5}}>Deadline </Text>
                            <CheckBox
                                center
                                title='Deadline'
                                iconRight
                                iconType='material'
                                checkedIcon='clear'
                                uncheckedIcon='add'
                                checkedColor='red'
                                checked={this.state.checked}
                                onChange={() => this.onChangeCheck()}
                            />
                        </View>
                        {this.state.checked === true &&
                        <DatePicker
                            style={{width: 200}}
                            date={curDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={curDate}
                            maxDate="2050-01-01"
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
                                this.setState({deadline: date})
                            }}
                        />}</View>

                    {/*<View>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <View
                                style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                                {this.state.avatarSource === null ? (
                                    <Text>Select a Photo</Text>
                                ) : (
                                    <Image style={styles.avatar} source={this.state.avatarSource} />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>*/}

                    <TextInput
                        placeholder="Info"
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({info: text})}
                        style={styles.TextInputStyleBig}
                    />


                </View>
                <Button color='black' title="Add"
                        onPress={this.createMon.bind(this)}/>
                {this.state.overlay &&
                <View style={styles.floatView}>
                    <Text style={{fontSize: 50}}>{this.state.requestDone && this.state.status}</Text>
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
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
    floatView: {
        position: 'absolute',
        height: '100%',
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
    TextInputStyleBig: {
        textAlign: 'center',
        height: 100,
        width: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#009688',
        marginBottom: 10
    },
});

export default CreateItem;