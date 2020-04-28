import React, {Component} from 'react'
import { Tab, Tabs, TabList} from 'react-tabs'
import TabOne from '../tab_nav/TabOne'
import TabTwo from '../tab_nav/TabTwo'
import TabThree from '../tab_nav/TabThree'
import '../styles/tab_nav.css';

class TabComponent extends Component {

  state = {
    tabIndex: 1
  }

  render() {
    return(
      <div>
        <Tabs className='tabs' selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({tabIndex})}>
          <TabList className='tab-nav-container'>
            <Tab className={`${this.state.tabIndex === 0 ? 'active' : null}`}><TabOne /></Tab>
            <Tab className={`${this.state.tabIndex === 1 ? 'active' : null}`}><TabTwo /></Tab>
            <Tab className={`${this.state.tabIndex === 2 ? 'active' : null}`}><TabThree /></Tab>
          </TabList>
        </Tabs>
      </div>
    )
  }
}

export default TabComponent;
