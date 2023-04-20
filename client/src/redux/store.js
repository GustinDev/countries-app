import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer/reducer';

//Conectarnos al navegador
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Configurar la store para hacer peticiones a la api.
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
