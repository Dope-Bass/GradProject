import React from 'react';
// import {NavLink} from 'react-router-dom';
import styled from 'styled-components'
import {flashOutline} from 'react-icons-kit/typicons/flashOutline'
import Icon from 'react-icons-kit'

const Project = ({project, ...props}) =>  {
        
    return (
        <Element>
            <div className='project'>
                <p className={project.clicked === true ? 'row-clicked' : 'row'} onClick={props.show}>
                    {project.title} 
                    {project.owner === 'me' && <Icon className='icon' size = {20} icon={flashOutline} />}
                </p>
            </div>
        </Element>
    )
}

export default Project;


const Element = styled.div`

.row {
    margin-left: 1rem;
    height: 60px;
    width: 43.5rem;
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
    width: 43.5rem;
    text-align: center;
    border-radius: 1%;
    background: #d3d3d3;
}

.icon {
    margin-left: 95%;
    margin-bottom: 1rem
}


`

