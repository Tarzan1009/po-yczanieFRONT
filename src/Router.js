import React from 'react';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Friends from './components/Friends';
import Friend from './components/Friend';
import { StyleSheet, StatusBar } from 'react-native';


const RouterComponent = () => {
    return (

        <Router>
            <Stack hideNavBar key="root">
                <Stack
                    key="auth"
                    type="reset"
                    navigationBarStyle={style.navBarStyle}
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
                    navigationBarStyle={style.navBarStyle}
                    titleStyle={style.titleStyle}
                    barButtonTextStyle={style.barButtonTextStyle}
                    barButtonIconStyle={style.barButtonIconStyle}
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
                </Stack>
            </Stack>
        </Router>
    );
};

const style = StyleSheet.create({
    navBarStyle: {
        // top: StatusBar.currentHeight,
        backgroundColor: '#121212',
    },
    titleStyle: {
        flexDirection: 'row',
        color: 'white',
        width: 200,
    },
    barButtonTextStyle:{
        color:'white'
    },
    barButtonIconStyle:{
        tintColor:'white'
    },
});


export default RouterComponent;