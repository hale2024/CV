// Redux Store-43:00m
// It holds all our states, this is the best method  to store it.
// It makes our store persisted, whenever you refresh the page, your store/states are saved in your local storage
import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
  } from "redux";
  import thunk from "redux-thunk";
  import { reducers } from "../reducers";
  
  function saveToLocalStorage(store) {
    // saving our states/store to local storage
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch(e) {
        console.log(e);
    }
  }
  
  function loadFromLocalStorage() {
    // retrieving our states/store from local storage
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
  }
//   composeEnhancers is a method to make the store available for our redux dev tools 
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistedState = loadFromLocalStorage();

  const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));
  
//   every time there is a change in our store/reducer's state, the change will be reflected in our local storage
  store.subscribe(() => saveToLocalStorage(store.getState()));
  
  export default store;