import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// stacks
import HomeStack from './components/homeStack';
import AboutStack from './components/aboutStack';
import LoginStack from './components/loginStack';
import RegisterStack from './components/registerStack';

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  About: {
    screen: AboutStack,
  },
  Register: {
    screen: RegisterStack,
  },
  Login: {
    screen: LoginStack,
  },
});

export default createAppContainer(RootDrawerNavigator);