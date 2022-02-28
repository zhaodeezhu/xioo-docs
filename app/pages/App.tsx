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
      <div style={{padding: '0px 16px'}}>
        <Docs />
      </div>
    );
  }
}

export default App;
