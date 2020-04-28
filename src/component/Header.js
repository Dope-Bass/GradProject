import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../svg/379988.png';
import { generateMedia } from "styled-media-query";

class Header extends Component {
  render() {
    return(
      <HeaderComponent className='header-container'>
        <div className='header-top'>
          <Logo src={logo} />
          <NavLink to='/signUp' className='signUp-btn'>Sign Up</NavLink>
          <NavLink to='/logIn' className='logIn-btn'>Log In</NavLink>
        </div>
      </HeaderComponent>
    )
  }
}

export default Header;

const customMedia = generateMedia({
  lgDesktop: '1350px',
  mdDesktop: '1150px',
  Tablet: '960px',
  smTablet: '740px'
}

)

//Logo
const Logo = styled.img`
  width: 7.5rem;
  height: 4rem;
  position: absolute;
  top: 25%;
  left: 3%;
  transform: translate(-50%, -50%);
  ${customMedia.lessThan('Tablet')`
    left: 5%;
  `}
  ${customMedia.lessThan('smTablet')`
    left: 8%;
  `}
`;


//Header Container
const HeaderComponent = styled.div`
  .signUp-btn {
    right: 0;
    margin: 1.125rem 3% 0;
    padding: 0.4375rem 1.0625rem;
    font-weight: 400;
    line-height: normal;
    border-radius: 0.1875rem;
    border: 3px solid black;
    font-size: 1rem;
    background: #fff;
    position: absolute;
    translate: transform(-50%, -50%);
    cursor: pointer;
    transition: background 0.2s ease-in;
    &:hover{
      background: #d3d3d3;
    }
  }

  .logIn-btn {
    right: 7rem;
    margin: 1.125rem 3% 0;
    padding: 0.4375rem 1.0625rem;
    font-weight: 400;
    line-height: normal;
    border-radius: 0.1875rem;
    border: 3px solid black;
    font-size: 1rem;
    background: #fff;
    position: absolute;
    translate: transform(-50%, -50%);
    cursor: pointer;
    transition: background 0.2s ease-in;
    &:hover{
      background: #d3d3d3;
    }
  }

  .header-top{
    position: relative;
    height: 10rem;
    border: 3px solid black;
    ${'' /* box-shadow: 0px 10px 50px #555; */}
    background: #fff;
  }

`;
