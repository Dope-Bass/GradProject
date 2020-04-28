import React, { Component } from 'react';
import Header from '../component/Header';
import TabComponent from '../component/TabComponent'

class Main extends Component{
  render() {
    return(
      <div>
        <Header />
        <TabComponent />
      </div>
    )
  }
}

export default Main;
