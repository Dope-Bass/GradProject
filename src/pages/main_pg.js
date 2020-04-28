import React, {Component} from 'react';
import logo from '../svg/379988.png';
import styled from 'styled-components';
import MainPgForm from '../component/MainPg/MainPgForm'

class Main_pg extends Component {
    render() {
      return(
          <div className='main_page_container'>
            <div className='header'>
              <Logo src={logo} alt="logo" className="logo" />
            </div>
            <MainPgForm />
          </div>
      )
    }
}

export default Main_pg;

const Logo = styled.img`
  width: 11rem;
  position: absolute;
  top: 7%;
  left: 3%;
  transform: translate(-50%, -50%);
  margin-left: 0;
`;