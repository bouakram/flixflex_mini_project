import React from 'react';
import Navigation from './src/navigation/Navigation';
import UserContextProvider from './src/context/userContext/user.cotext';

function App(): React.JSX.Element {
  return (
    // <UserContextProvider>
      <Navigation />
    // </UserContextProvider>
    );
}

export default App;
