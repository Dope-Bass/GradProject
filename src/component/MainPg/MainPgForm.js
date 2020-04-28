import React, {Component} from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import {thMenuOutline} from 'react-icons-kit/typicons/thMenuOutline'
import {homeOutline} from 'react-icons-kit/typicons/homeOutline'
import {mail} from 'react-icons-kit/typicons/mail'
import {userOutline} from 'react-icons-kit/typicons/userOutline'
import {logout} from 'react-icons-kit/ikons/logout'
import {bar_graph} from 'react-icons-kit/ikons/bar_graph'
import Icon from 'react-icons-kit'
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'


import * as actions from '../store/actions/auth';

import { connect } from 'react-redux';


const ReactHint = ReactHintFactory(React)

class MainPgForm extends Component {

    render() {
        return(
          <div>
            <Navigation className='navigation'>
                <ReactHint autoPosition events delay={{show: 100, hide: 10}} />
                <ReactHint persist
                    attribute="data-custom"
                    className="custom-hint"/>
                <NavLink to='/projects' className='projects-btn' data-rh="Проекты">
                    <Icon size = {80} icon={thMenuOutline} />
                </NavLink>
                <NavLink to='/personal_pg' className='personal-btn' data-rh="Личный кабинет">
                    <Icon size = {80} icon={homeOutline} />
                </NavLink>
                <NavLink to='/mail' className='mail-btn' data-rh="Почта">
                    <Icon size = {80} icon={mail} />
                </NavLink>
                <NavLink to='/colleagues' className='colleagues-btn' data-rh="Коллеги">
                    <Icon size = {80} icon={userOutline} />
                </NavLink>
                <NavLink to='/' className='logout-btn' data-rh='Выход' onClick={this.props.logout}>
                    <Icon size = {50} icon={logout} />
                </NavLink>
                <NavLink to='/graph' className='graph-btn' data-rh="Статистика">
                    <Icon size = {80} icon={bar_graph} />
                </NavLink>
            </Navigation>
          </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(actions.logout())
    }
  }

export default connect(null, mapDispatchToProps)(MainPgForm);


const Navigation = styled.div`

    .custom-hint {
        background: green
        font-size: 3rem
    }

    .projects-btn {
        right: 70rem;
        top: 20rem;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 1.25rem;
        border: 3px solid black;
        font-size: 1rem;
        background: #fff;
        position: absolute;
        translate: transform(-50%, -50%);
        cursor: pointer;
        transition: background 0.2s ease-in;
        ${'' /* box-shadow:
            12px 12px 12px -11px
            rgba(0,0,0,1); */}
        &:hover{
          background: #d3d3d3;
        }
    }

    .graph-btn {
        right: 58.5rem;
        top: 30rem;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 1.25rem;
        border: 3px solid black;
        font-size: 1rem;
        background: #fff;
        position: absolute;
        translate: transform(-50%, -50%);
        cursor: pointer;
        transition: background 0.2s ease-in;
        ${'' /* box-shadow:
            12px 12px 12px -11px
            rgba(0,0,0,1); */}
        &:hover{
          background: #d3d3d3;
        }
    }

    .colleagues-btn {
        right: 47rem;
        top: 20rem;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 1.25rem;
        border: 3px solid black;
        font-size: 1rem;
        background: #fff;
        position: absolute;
        translate: transform(-50%, -50%);
        cursor: pointer;
        transition: background 0.2s ease-in;
        ${'' /* box-shadow:
            12px 12px 12px -11px
            rgba(0,0,0,1); */}
        &:hover{
          background: #d3d3d3;
        }
    }

    .personal-btn {
        right: 63rem;
        top: 13rem;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 1.25rem;
        border: 3px solid black;
        font-size: 1rem;
        background: #fff;
        position: absolute;
        translate: transform(-50%, -50%);
        cursor: pointer;
        transition: background 0.2s ease-in;
        ${'' /* box-shadow:
            12px 12px 12px -11px
            rgba(0,0,0,1); */}
        &:hover{
          background: #d3d3d3;
        }
    }

    .mail-btn {
        right: 54rem;
        top: 13rem;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 1.25rem;
        border: 3px solid black;
        font-size: 1rem;
        background: #fff;
        position: absolute;
        translate: transform(-50%, -50%);
        cursor: pointer;
        transition: background 0.2s ease-in;
        ${'' /* box-shadow:
            12px 12px 12px -11px
            rgba(0,0,0,1); */}
        &:hover{
          background: #d3d3d3;
        }
    }

    .logout-btn {
        right: 4rem;
        top: 2rem;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 1.25rem;
        border: 3px solid black;
        font-size: 1rem;
        background: #fff;
        position: absolute;
        translate: transform(-50%, -50%);
        cursor: pointer;
        transition: background 0.2s ease-in;
        ${'' /* box-shadow:
            12px 12px 12px -11px
            rgba(0,0,0,1); */}
        &:hover{
          background: #d3d3d3;
        }
    }
    }
    
`