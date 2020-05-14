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
import { StyleSheet, StatusBar } from 'react-native';


const RouterComponent = () => {
    return (

        <Router>
            <Stack hideNavBar key="root">
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