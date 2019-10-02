import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { timeline } from './reducers/timeline';

const store = createStore(timeline, applyMiddleware(thunkMiddleware));

class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div id="root">
        <div className="main">
          <Header />
          <Timeline login={this.props.arg.match.params.login} store={store} />
        </div>
      </div>
    );
  }
}

export default App;
