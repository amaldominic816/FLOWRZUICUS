/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './SplashScreen'; // Make sure to create this App.tsx file.
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);