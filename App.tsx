import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import ConfigureStore from './redux/configureStore';
import {Provider as ReduxProvider} from 'react-redux';
import MainNavigation from './MainNavigation';
import SpinnerView from './Views/spinnerView';

const App = () => {
  const store = ConfigureStore();
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <MainNavigation />
        <SpinnerView></SpinnerView>
      </NavigationContainer>
    </ReduxProvider>
  );
};
export default App;
