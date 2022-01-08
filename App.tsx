import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
//i18n
import './src/i18n';
//store
import { store } from './src/redux/store';

const App = () => {

  
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </Provider>
  );
};


export default App;
