import React from 'react';
// import {NavLink} from 'react-router-dom';
import styled from 'styled-components'

const CalendarDay = ({day, month, year, ...props}) =>  {

    let today = new Date();
    let curDay = today.getDate();
    let curMonth = today.getMonth();
    let curYear = today.getFullYear();
        
    return (
        <Element>
            <div className='day'>
                <div className='square' style={new Date(curYear, curMonth, curDay).valueOf() === new Date(year, month, day).valueOf() ? {background: 'yellow'} : {background: 'white'}}>
                    {day}
                    <p>{Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(new Date(year, month, day))}</p>
                </div>
            </div>
        </Element>
    )
}

export default CalendarDay;

const Element = styled.div`

    .square {
        height: 100px;
        width: 100px;
        &:hover{
            border-radius: 1%;
            background: #d3d3d3;
        }
        text-align: center;
        border: 3px solid black;
        border-radius: 1rem;
        cursor: pointer;
        background: #fff;
    }


`