import React, { Component } from 'react';
import HeaderContainer from './componentes/Header';
import TimelineContainer from './componentes/Timeline';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="root">
        <div className="main">
          <HeaderContainer />
          <TimelineContainer login={this.props.arg.match.params.login} />
        </div>
      </div>
    );
  }
}

export default App;
