import React, { Component } from 'react'
import styled from 'styled-components'
import Icon from 'react-icons-kit'
import {arrow_right} from 'react-icons-kit/ikons/arrow_right'
import {arrow_left} from 'react-icons-kit/ikons/arrow_left'
import CalendarDay from './dayView'

class Calendar extends Component {
    constructor() {
        super()
        this.state = {

            today: new Date(),
            current: new Date()

        }    
        this.days = this.countDays(this.state.current);    
    }

    // componentDidMount = () => {
    //     this.days = this.countDays(this.state.current);
    // }

    countDays = (current) => {
        let new_date = new Date(current.getFullYear(), current.getMonth(), 1);
        let currentMonth = current.getMonth();
        let days = [];
        new_date.setDate(31);
        if (new_date.getMonth() === currentMonth) {
            let daysInMonth = 31;
            for (let i = 1; i <= daysInMonth; i++) {
                days.push(i);
            }
        } else {
            let daysInMonth = 31 - new_date.getDate();
            for (let i = 1; i <= daysInMonth; i++) {
                days.push(i);
            }
        }
        console.log(days);
        return days;
    }

    changeMonth = (next) => {

        let state = { ...this.state }

        switch (next) {
            case 0:
                if (state.current.getMonth === 0) {
                    state.current.setMonth(11);
                    state.current.setFullYear(state.current.getFullYear() - 1);
                } else {
                    state.current.setMonth(this.state.current.getMonth() - 1);
                }
                break;
            case 1:
                if (state.current.getMonth === 11) {
                    state.current.setMonth(0);
                    state.current.setFullYear(state.current.getFullYear() + 1);
                } else {
                    state.current.setMonth(state.current.getMonth() + 1);
                }
                break;
            default:
                break;
        }

        this.setState({ today: new Date(), current: state.current }, console.log(this.state));
        this.days = this.countDays(this.state.current);
    }

    render() {

        let days = this.days;

        return (
            <View>
                <div className='header'>
                    <Icon onClick={() => {this.changeMonth(0)}} className='left' name='left' size={40} icon={arrow_left} />
                    <h1 className = 'month'>
                        {Intl.DateTimeFormat('en-US', { month: 'long'}).format(this.state.current)}
                        {'        '}
                        {this.state.current.getFullYear()}
                    </h1>
                    <Icon onClick={() => {this.changeMonth(1)}} className='right' name='right' size={40} icon={arrow_right} />
                </div>
                <br />
                <br />
                <div className='body'>
                    {
                        days.map(day => (
                                <div className='smth'>
                                    <CalendarDay key={day} day={day} month={this.state.current.getMonth()} year={this.state.current.getFullYear()}/>
                                </div>
                            )
                        )
                    }  
                </div>
            </View>
        )
    }
}

export default Calendar;


const View = styled.div`

    .month {
        grid-column-start: 3;
        grid-column-end: 14;
        text-align: center;
    }

    .header {
        display: grid;
        grid-template-columns: repeat(15, 1fr);
    }

    .left {
        grid-column-start: 2;
        grid-column-end: 2;
        cursor: pointer;
        &:hover{
            color: #d3d3d3;
        }
    }

    .right {
        grid-column-start: 15;
        grid-column-end: 15;
        cursor: pointer;
        &:hover{
            color: #d3d3d3;
        }
    }

    .body {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(4, 1fr);
        height: 50rem;
        width: 90rem;
        border: 3px solid black;
        border-radius: 1rem;
        margin-left: 15rem;
    }

    .smth {
        margin-left: 40px;
        margin-top: 30px;
    }

`