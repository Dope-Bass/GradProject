import React, { Component } from 'react';
// import ReactList from 'react-list';
// import Item from 'react'
// import { NavLink } from 'react-router-dom';
// import { Link } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Slide from '@material-ui/core/Slide';
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'

import ContactList from './Search_list'
import Message from '../Mail/Message_Inner_side'

// import TextField from '@material-ui/core/TextField';

const ReactHint = ReactHintFactory(React)

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
//   });

class ColleaguesList extends Component {

    constructor() {
        super();
        this.state = {
            colleagues: [
                {id: 1, title: 'John', owner: 'John', clicked: false}, 
                {id: 2, title: 'Bill', owner: 'Bill', clicked: false},
                {id: 3, title: 'Gabe', owner: 'Gabe', clicked: false}, 
                {id: 4, title: 'Jim', owner: 'Jim', clicked: false},
                {id: 5, title: 'Betty', owner: 'Betty', clicked: false}, 
                {id: 6, title: 'Megan', owner: 'Megan', clicked: false},
                {id: 7, title: 'Robert', owner: 'Robert', clicked: false}, 
                {id: 8, title: 'Sam', owner: 'Sam', clicked: false},
                {id: 9, title: 'Alex', owner: 'Alex', clicked: false}, 
            ],
            myContacts: [],
        }
        this.request = '';
        this.number = this.state.colleagues.length;
        this.open = false;
        this.index = '';
    }

    callbackFunc = id => {
        this.setState(state => {
            let contacts = state;
            contacts.myContacts.push(contacts.colleagues[id]);
            console.log(this.state.myContacts)
            // return this.state.myContacts;
        })
        this.setState(() => {
            this.index = id;
            return 1;
        })
    }

    handleClickOpen = () => {
        this.setState(() => {
            this.open = true;
            return 1;
        })
    }

    length = colleagues => {
        this.number = colleagues.length;
        return;
    }

    handleSearchChange = e => {
        // e.preventDefault();
        const { value } = e.target;
        this.setState(() => {
            this.request = value;
            return 1;
        })
    }

    // handleDataChange = e => {
    //     e.preventDefault();
    //     const { name, value } = e.target;
    //     let new_message = { ...this.state.new_message };

    //     switch (name) {
    //         case "title":
    //             new_message.topic = value;
    //             if (new_message.topic === "") {
    //                 new_message.topic = "Без Названия";
    //             }
    //             break;
    //         // case "receiver":
    //         //     new_message.receiver = value;
    //         //     break;
    //         case "text":
    //             new_message.text = value;
    //             if (new_message.text === "") {
    //                 new_message.text = "Без Текста";
    //             }
    //             break;
    //         default:
    //             break;
    //       }
      
    //     this.setState({ new_message, [name]: value }, () => console.log(this.state));
    // }

    // ЭТА ХУЙНЯ НЕ РАБОТАЕТ, НО ПУСТЬ ЛЕЖИТ, КАК-НИБУДЬ НАДО БУДЕТ ПОПРАВИТЬ
    // handleClose = () => {
    //     this.setState(() => {
    //         this.open = false;            
    //         return 1;
    //     })
    //     this.setState(state => {
    //         let message = state;
    //         message.new_message.topic = '';
    //         message.new_message.text = '';
    //         return message;
    //     })
    // }
    //-----------------------------------------------------------------------//

    // show = id => {
    //     const index = this.state.messages.map(message => message.id).indexOf(id);
    //     this.setState(state => {
    //         let messages = state;
    //         messages.current.id = messages.messages[index].id;
    //         messages.current.title = messages.messages[index].title;
    //         if (messages.current.previous !== '') {
    //             messages.messages[messages.current.previous].clicked = false;
    //         };
    //         messages.messages[index].clicked = true;
    //         messages.current.previous = index;
    //         return messages;
    //     });
    // };

    // delete = id => {
    //     const index = this.state.messages.map(message => message.id).indexOf(id);
    //     this.setState(state => {
    //         let messages = state;
    //         messages.current.previous = '';
    //         delete messages.messages[index];
    //         messages.current.title = '';
    //         messages.current.id = '';
    //         this.number -= 1;
    //         return messages;
    //     })
    // }


    render() {

        let contacts = this.state.myContacts;

        return(
            <SplitPane split="vertical" defaultSize={1000} primary="second">
                <List>
                    <ReactHint autoPosition events delay={{show: 100, hide: 10}} />
                    <ReactHint persist
                            attribute="data-custom"
                            className="custom-hint"/>
                    <div className='list'>
                        <ContactList callbackFunc={this.callbackFunc} />
                    </div>
                </List>
                <View>
                    <div className='info-container'>
                        <h1 className='title'>Мои Контакты</h1>
                        <br />
                        <br />
                        {this.index === '' ? '' : 
                            <ul>
                                {
                                    contacts.map(contacts => (
                                            <div>
                                                <Row className='contact'>
                                                    <div className='smth'>
                                                        <Message show = {() => this.show} message={contacts} />
                                                    </div>
                                                </Row>
                                            </div>
                                        )
                                    )
                                }          
                            </ul>
                        }
                    </div>
                </View>
            </SplitPane>
        )
    }

}

export default ColleaguesList;


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


const List = styled.div`

    .list {
        overflow: auto;
        height: 700px;
        width: 750px;
        ${'' /* box-shadow: 0px 10px 50px #555; */}
        margin-top: 10rem;
        margin-left: 10rem;
        border: 3px solid black;
        background: #fff;
    }

    .search {
        width: 550px;
        left: 10px;
        top: 10px;
    }

    .quantity {
        margin-left: 2rem;
    }


    .quantity {
        grid-column-start: 1;
        grid-column-end: 11;
        grid-row-start: 1;
        grid-row-start: 1;
    }

    .write-msg {
        grid-column-start: 10;
        grid-column-end: 11;
        grid-row-start: 1;
        grid-row-start: 1;
        height: 3rem;
        width: 3rem;
        margin-top: 1.4rem;
        margin-left: -3.5rem;
        cursor: pointer;
        border: 3px solid black;
        border-radius: 1rem;
        &:hover{
            border: 4px solid green;
        }
    }

    .header {
        display: grid;
        grid-template-columns: repeat(12, 2fr);
        text-align: center;
    }

`

const View = styled.div`
    .info-container {
        overflow: auto;
        height: 700px;
        width: 750px;
        ${'' /* box-shadow: 0px 10px 50px #555; */}
        margin-top: 10rem;
        margin-left: 5rem;
        margin-right: 10rem;
        border: 3px solid black;
        background: #fff;
    }

    .title {
        text-align: center;
    }
`    