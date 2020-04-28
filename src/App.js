import React, { Component } from 'react';
import './styles/styles.css';
import Main from './pages'
import { Switch, Route } from 'react-router-dom'
import Login from './pages/logIn'
import SignUp from './pages/signUp'
import Main_pg from './pages/main_pg'
import Projects from './pages/projects'
import PersonalPage from './pages/PersonalPage'
import ColleaguesPage from './pages/ColleaguesPage'
import MailPage from './pages/MailPage';
import Graph from './pages/graph'
import CalendarPage from './pages/calendar'

import * as actions from './component/store/actions/auth';

import { connect } from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  
  render() {
    return(
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/logIn" component={Login} />
        <Route path="/Main" component={Main_pg} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/projects" component={Projects} />
        <Route path='/personal_pg' component={PersonalPage} />
        <Route path='/colleagues' component={ColleaguesPage} />
        <Route path='/mail' component={MailPage} />
        <Route path='/graph' component={Graph} />
        <Route path='/calendar' component={CalendarPage} />
      </Switch>
    );
    }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
