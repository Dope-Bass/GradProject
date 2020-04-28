import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components'

import Icon from 'react-icons-kit'
import {circle_plus} from 'react-icons-kit/ikons/circle_plus'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Message from '../Mail/Message_Inner_side'


class ContactList extends Component {

    constructor() {
        super();
        this.state = {
            Contacts: [
                {id: 1, title: 'John', surname: 'John', workplace: 'Google', position: 'developer', projects: []}, 
                {id: 2, title: 'Bill', surname: 'Bill', workplace: 'Google', position: 'developer', projects: []},
                {id: 3, title: 'Gabe', surname: 'Gabe', workplace: 'Google', position: 'developer', projects: []}, 
                {id: 4, title: 'Jim', surname: 'Jim', workplace: 'Google', position: 'developer', projects: []},
                {id: 5, title: 'Betty', surname: 'Betty', workplace: 'Google', position: 'developer', projects: []}, 
                {id: 6, title: 'Megan', surname: 'Megan', workplace: 'Google', position: 'developer', projects: []},
                {id: 7, title: 'Robert', surname: 'Robert', workplace: 'Google', position: 'developer', projects: []}, 
                {id: 8, title: 'Sam', surname: 'Sam', workplace: 'Google', position: 'developer', projects: []},
                {id: 9, title: 'Alex', surname: 'Alex', workplace: 'Google', position: 'developer', projects: []}, 
            ],
            displayedContacts: [
                {id: 1, title: 'John', surname: 'John', workplace: 'Google', position: 'developer', projects: []}, 
                {id: 2, title: 'Bill', surname: 'Bill', workplace: 'Google', position: 'developer', projects: []},
                {id: 3, title: 'Gabe', surname: 'Gabe', workplace: 'Google', position: 'developer', projects: []}, 
                {id: 4, title: 'Jim', surname: 'Jim', workplace: 'Google', position: 'developer', projects: []},
                {id: 5, title: 'Betty', surname: 'Betty', workplace: 'Google', position: 'developer', projects: []}, 
                {id: 6, title: 'Megan', surname: 'Megan', workplace: 'Google', position: 'developer', projects: []},
                {id: 7, title: 'Robert', surname: 'Robert', workplace: 'Google', position: 'developer', projects: []}, 
                {id: 8, title: 'Sam', surname: 'Sam', workplace: 'Google', position: 'developer', projects: []},
                {id: 9, title: 'Alex', surname: 'Alex', workplace: 'Google', position: 'developer', projects: []}, 
            ],
            myContacts: []
        }
        this.open = false;
    }

  searchHandler = (event) => {
    let searcjQery = event.target.value.toLowerCase()
    let displayedContacts = this.state.Contacts.filter((el) => {
          let searchValue = el.title.toLowerCase();
          return searchValue.indexOf(searcjQery) !== -1;
    })
    this.setState({
      displayedContacts: displayedContacts
    })
  }

  handleClickOpen = () => {
        this.setState(() => {
            this.open = true;
            return 1;
        })
    }

  handleClose = () => {
        this.setState(() => {
            this.open = false;            
            return 1;
        })
    }

  subscribe = id => {
    const index = this.state.Contacts.map(contacts => contacts.id).indexOf(id);
    this.setState(state => {
        let contacts = state;
        contacts.myContacts.push(contacts.Contacts[index]);
        console.log(this.state.myContacts)
        this.props.callbackFunc(index);
        return this.state.myContacts;
    })
  }

  show = id => {
      this.handleClickOpen();
      return 1;
  }

  render() {

    let contacts = this.state.displayedContacts;
    return (
        <Holder>
            <Dialog
                open={this.open}
                onClose={this.handleClose}
                keepMounted
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <br />
            <TextField 
                className="search"
                fullWidth="true"
                name="search"
                onChange={this.searchHandler}
                label="Поиск" 
                variant="outlined"
            />
            <br />
            <br />
            <ul>
                {
                contacts.map(contacts => (
                        <div>
                            <Row className='contact'>
                                <div className='smth'>
                                    <Message show = {() => this.show} message={contacts} />
                                </div>
                                {
                                    this.state.Contacts[this.state.Contacts.map(contacts => contacts.id)
                                    .indexOf(contacts.id)] === this.state.myContacts[this.state.myContacts.map(contacts => contacts.id).indexOf(contacts.id)] ? '' :
                                    <Icon className='subscribe-btn' size={40} icon={circle_plus} onClick={() => this.subscribe(contacts.id)}/>
                                }
                            </Row>
                        </div>
                    )
                )
                }          
            </ul>
        </Holder>     
    )
  }
}

export default ContactList;


const Holder = styled.div`
    text-align: center;

    .search {
        width: 550px;
        left: 10px;
        top: 10px;
    }

`


const Row = styled.div`

    display: grid;
    grid-template-columns: repeat(12, 2fr);
    text-align: center;

    .smth {
        grid-column-start: 1;
        grid-column-end: 11;
    }

    .subscribe-btn {
        grid-column-start: 11;
        grid-column-end: 12;
        margin-top: 1.4rem;
        margin-left: 2rem;
        cursor: pointer;
        &:hover{
            color: blue;
        }
    }


`