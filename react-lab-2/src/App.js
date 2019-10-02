import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { timeline } from './reducers/timeline';
import { notificacao } from './reducers/notificacao';

const reducers = combineReducers({ timeline, notificacao });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div id="root">
        <div className="main">
          <Header store={store} />
          <Timeline login={this.props.arg.match.params.login} store={store} />
        </div>
      </div>
    );
  }
}

export default App;
