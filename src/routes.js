import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import Login from './pages/Login';
import ViewOcurrance from './pages/ViewOcurrance'
import Ocurrances from './pages/Ocurrances'
import Register from './pages/Register'
import TrashTime from './pages/TrashTime'

const switchNav = createSwitchNavigator({
    Login,
    ViewOcurrance,
    Ocurrances,
    Register,
    TrashTime
});

const Routes = createAppContainer(
    switchNav
    
);



export default Routes;