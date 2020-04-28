import React, {Component} from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import ReactHintFactory from 'react-hint';
import { Avatar } from '@material-ui/core';

import axios from 'axios'

import 'react-calendar/dist/Calendar.css';

import 'react-hint/css/index.css'

const ReactHint = ReactHintFactory(React)

class InfoContainer extends Component {

    constructor() {
        super();
        this.state = {
            projects: [],
        }
        this.number = '';
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(res => {
                this.setState({
                    projects: res.data
                })
                this.setState(() => {
                    this.number = this.state.projects.length;
                    return 1;
                })
            })
    }

    onClick = e => {
        console.log(e)
    }

    render() {

        return(
            <Page>
                {/* <Calendar className='calendar' 
                    onClickDay={this.onClick}
                /> */}
                <NavLink className='calendar' to='/calendar'>
                        Calendar
                </NavLink>
                <InfoBox>
                    <ReactHint autoPosition events delay={{show: 100, hide: 10}} />
                    <ReactHint persist
                        attribute="data-custom"
                        className="custom-hint"/>
                    <Avatar className='avatar' />
                    <div className='info'>
                        <p className='data'>Name</p>
                        <p className='data'>Surname</p>
                        <p className='data'>Organization</p>
                        <NavLink to='/projects' 
                        data-rh={this.number} 
                        className='link'>My Projects</NavLink>
                    </div>
                    <div className='description'>
                        <p>Description</p>
                    </div>
                </InfoBox>
            </Page>
        )
    }
}

export default InfoContainer;

const Page = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 2fr);

    .calendar {
        grid-column-start: 2;
        grid-column-end: 5;
        grid-row-start: 1;
        grid-row-end: 1;
        margin-top: 10rem;
        border: 3px solid black;
        border-radius: 1rem;
        height: 20rem;
    }

`

const InfoBox = styled.div`
    grid-column-start: 6;
    grid-column-end: 12;
    grid-row-start: 1;
    grid-row-end: 1;
    margin-top: 10rem;
    height: 20rem;
    width: 60rem;
    border: 3px solid black;
    border-radius: 1rem;
    background: #fff;

    .avatar {
        margin-top: 5rem;
        margin-left: 5rem;
        height: 10rem;
        width: 10rem;
    }

    .info {
        margin-left: 20rem;
        margin-top: -12rem; 

    }

    .data {
        left: 1rem;
        height: 3rem;
        width: 10rem;
        text-align: center;
        border: 3px solid black;
        border-radius: 1rem;
    }

    .link {
        text-decoration: underline;
    }

    .description {
        margin-left: 35rem;
        margin-top: -16rem;
        height: 18rem;
        width: 20rem;
        text-align: center;
        border: 3px solid black;
        border-radius: 1rem;
    }

`