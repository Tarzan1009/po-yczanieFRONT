import React from 'react';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Friends from './components/Friends';
import Friend from './components/Friend';
import MonetaryList from "./components/MonetaryList";
import CreateMonetary from "./components/CreateMonetary";
import ItemList from "./components/ItemList";
import CreateItem from "./components/CreateItem";
import { StyleSheet, StatusBar } from 'react-native';
import AddFriend from "./components/AddFriend";
import Notifications from "./components/Notifications";
import Assignments from "./components/Assignments";
import Assignment from "./components/Assignment";
import Assign from "./components/Assign";
import Start from "./components/Start";


const RouterComponent = () => {
    return (

        <Router>
            <Stack hideNavBar key="root">
                <Stack
                    key="start"
                    type="reset"
                    titleStyle={style.titleStyle}
                >
                    <Scene
                        title="Start"
                        key="start"
                        component={Start}
                        initial
                    />
                </Stack>
                <Stack
                    key="main"
                    type="reset"
                    titleStyle={style.titleStyle}
                >
                    <Scene
                        title="Home"
                        key="home"
                        component={Home}
                        initial
                    />
                    <Scene
                        title="Home"
                        key="home"
                        component={Home}
                        initial
                    />
                    <Scene
                        title="Friends"
                        key="friends"
                        component={Friends}
                    />
                    <Scene
                        title="Friend"
                        key="friend"
                        component={Friend}
                    />
                    <Scene
                        title="Monetary"
                        key="MonetaryList"
                        component={MonetaryList}
                    />
                    <Scene
                        title="Item"
                        key="ItemList"
                        component={ItemList}
                    />
                    <Scene
                        title="Create Debt"
                        key="CreateMonetary"
                        component={CreateMonetary}
                    />
                    <Scene
                        title="Create Item"
                        key="CreateItem"
                        component={CreateItem}
                    />
                    <Scene
                        title="Add friend"
                        key="AddFriend"
                        component={AddFriend}
                    />
                    <Scene
                        title="Notifications"
                        key="Notifications"
                        component={Notifications}
                    />
                    <Scene
                        title="Notifications"
                        key="Assignments"
                        component={Assignments}
                    />
                    <Scene
                        title="Assignment"
                        key="Assignment"
                        component={Assignment}
                    />
                    <Scene
                        title="Assign"
                        key="Assign"
                        component={Assign}
                    />
                </Stack>
                <Stack
                    key="auth"
                    type="reset"
                    titleStyle={style.titleStyle}
                >
                    <Scene
                        title="Sign In"
                        key="login"
                        component={Login}
                        initial
                    />
                    <Scene
                        title="Register"
                        key="register"
                        component={Register}
                    />
                </Stack>
            </Stack>
        </Router>
    );
};

const style = StyleSheet.create({

    titleStyle: {
        flexDirection: 'row',
        width: 200
    }
});


export default RouterComponent;