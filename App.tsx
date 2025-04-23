import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import Navigation from './src/navigation/Navigation';
// import UserContextProvider from './src/context/userContext/user.cotext';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      {/* <UserContextProvider> */}
        <Navigation />
      {/* </UserContextProvider> */}
    </Provider>
  );
}

export default App;
