/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// Handle push notifications when the app is in the background

AppRegistry.registerComponent(appName, () => App);
