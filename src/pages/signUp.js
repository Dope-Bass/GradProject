import React, {Component} from 'react';
import logo from '../svg/379988.png';
import styled from 'styled-components';
import SignUpForm from '../component/SignUp/SignUpForm'

class SignUp extends Component {
  render() {
    return (
      <div className="main-signup-container">
        <div className='header-top'>
          <Logo src={logo} alt="logo" className="logo" />
        </div>
        <SignUpForm />
      </div>
    )
  }
}

export default SignUp;

const Logo = styled.img`
  width: 11rem;
  position: absolute;
  top: 7%;
  left: 3%;
  transform: translate(-50%, -50%);
  margin-left: 0;
`;
