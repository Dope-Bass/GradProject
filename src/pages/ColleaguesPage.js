import React, {Component} from 'react';
import logo from '../svg/379988.png';
import styled from 'styled-components';
import {mail} from 'react-icons-kit/typicons/mail';
import {thMenuOutline} from 'react-icons-kit/typicons/thMenuOutline'
import {homeOutline} from 'react-icons-kit/typicons/homeOutline';
import Icon from 'react-icons-kit';
import { NavLink } from 'react-router-dom';
// import ProjectList from '../component/Projects/ProjectList';
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'
import ColleaguesList from '../component/Colleagues/ColleaguesList'

const ReactHint = ReactHintFactory(React)

class ColleaguesPage extends Component {

    render() {
        return(
            <div className='colleagues-container'>
                <div className='header-top'>
                    <Logo src={logo} alt="logo" className="logo" />
                    <Navigation className='navigation'>
                        <ReactHint autoPosition events delay={{show: 100, hide: 10}} />
                        <ReactHint persist
                            attribute="data-custom"
                            className="custom-hint"/>
                        <NavLink to='/projects' className='projects-btn' data-rh="Проекты">
                            <Icon size = {80} icon={thMenuOutline} />
                        </NavLink>
                        <NavLink to='/mail' className='mail-btn' data-rh="Почта">
                            <Icon size = {80} icon={mail} />
                        </NavLink>
                        <NavLink to='/personal_pg' className='personal-btn' data-rh="Личный кабинет">
                            <Icon size = {80} icon={homeOutline} />
                        </NavLink>
                        <a href='/Main' className='go-back'>Вернуться на главную</a>
                    </Navigation>
                </div>
                <ColleaguesList />
            </div>
        )
    }

}

export default ColleaguesPage;

const Logo = styled.img`
  width: 11rem;
  position: absolute;
  top: 7%;
  left: 3%;
  transform: translate(-50%, -50%);
  margin-left: 0;
`;

const Navigation = styled.div`

    display: grid;
    grid-template-columns: repeat(12, 2fr);
    text-align: center;

    .custom-hint {
        font-size: 3rem;
    }

    .personal-btn {
        grid-column-start: 4;
        grid-column-end: 5;
        grid-row-start: 1;
        grid-row-start: 1;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 30%;
        font-size: 1rem;
        translate: transform(-50%, -50%);
        cursor: pointer;
        transition: background 0.2s ease-in;
        &:hover{
          color: #fff;
        }
    }

    .projects-btn {
        grid-column-start: 6;
        grid-column-end: 7;
        grid-row-start: 1;
        grid-row-start: 1;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 30%;
        font-size: 1rem;
        translate: transform(-50%, -50%);
        cursor: pointer;
        transition: background 0.2s ease-in;
        &:hover{
          color: #fff;
        }
    }

    .mail-btn {
        grid-column-start: 8;
        grid-column-end: 9;
        grid-row-start: 1;
        grid-row-start: 1;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 30%;
        font-size: 1rem;
        translate: transform(-50%, -50%);
        cursor: pointer;
        transition: background 0.2s ease-in;
        &:hover{
          color: #fff;
        }
    }

    .go-back {
        margin-top: 1rem;
        height: 2rem;
        grid-column-start: 12;
        grid-column-end: 12;
        grid-row-start: 1;
        grid-row-start: 1;
        text-decoration: underline;
        &:hover{
          color: #fff;
        }
    }

`