import React, { Component } from 'react';

import Docs from './plugin';

class App extends Component<any> {

  componentDidMount() {
    
  }

  componentWillUnmount() {
    // this.eus.destory();
    // this.getUser();
    // UserInfo.getUser();
  }

  render() {
    return (
      <div>
        <Docs />
      </div>
    );
  }
}

export default App;
