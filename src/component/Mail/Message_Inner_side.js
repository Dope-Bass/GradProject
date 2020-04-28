import React from 'react';
// import {NavLink} from 'react-router-dom';
import styled from 'styled-components'

const Message = ({message, ...props}) =>  {
        
    return (
        <Element>
            <div className='message'>
                <p className={message.clicked === true ? 'row-clicked' : 'row'} onClick={props.show}>{message.title}</p>
            </div>
        </Element>
    )
}

export default Message;


const Element = styled.div`

.row {
    margin-left: 1rem;
    height: 60px;
    &:hover{
        border-radius: 1%;
        background: #d3d3d3;
    }
    text-align: center;
    border: 3px solid black;
    border-radius: 1rem;
    cursor: pointer;
}

.row-clicked {
    margin-left: 1rem;
    height: 60px;
    text-align: center;
    border-radius: 1%;
    background: #d3d3d3;
}

.icon {
    margin-left: 95%;
    margin-bottom: 1rem
}


`