import React from 'react';
import Body from './Body';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store';
import {getAddonsList} from './store/actions/actions';
store.dispatch(getAddonsList());
function App() {
  return (
    <Provider store={store}>
      <Body />
      <Footer />
    </Provider>);
}

export default App;
