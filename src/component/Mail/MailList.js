import React, { Component } from 'react';
// import ReactList from 'react-list';
// import Item from 'react'
// import { NavLink } from 'react-router-dom';
// import { Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Message from './Message_Inner_side'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import Icon from 'react-icons-kit'
import {trash} from 'react-icons-kit/typicons/trash'
import {pencil} from 'react-icons-kit/typicons/pencil'
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'

import axios from 'axios'

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const ReactHint = ReactHintFactory(React)

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class MailList extends Component {

    constructor() {
        super();
        this.state = {
            messages: [],

            displaying: '',

            current: {
                previous: ''
            },

            new_message: {
                receiver: "",
                title: "",
                text: ""
            }
        }
        this.users = ['Danya'];
        this.number = this.state.messages.length;
        this.open = false;
    }

    handleClickOpen = () => {
        this.setState(() => {
            this.open = true;
            return 1;
        })
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/messages/')
            .then(res => {
                this.setState({
                    messages: res.data
                })
                this.setState(() => {
                    this.number = this.state.messages.length;
                    return 1;
                })
            })
    }

    handleDataChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let new_message = { ...this.state.new_message };

        switch (name) {
            case "title":
                new_message.title = value;
                if (new_message.title === "") {
                    new_message.title = "Без Названия";
                }
                break;
            case "receiver":
                new_message.receiver = value;
                break;
            case "text":
                new_message.text = value;
                if (new_message.text === "") {
                    new_message.text = "Без Текста";
                }
                break;
            default:
                break;
          }
      
        this.setState({ new_message }, () => console.log(this.state));
    }

    // ЭТА ХУЙНЯ НЕ РАБОТАЕТ, НО ПУСТЬ ЛЕЖИТ, КАК-НИБУДЬ НАДО БУДЕТ ПОПРАВИТЬ
    handleClose = () => {
        this.setState(() => {
            this.open = false;            
            return 1;
        })
        // this.setState(state => {
        //     let message = state;
        //     message.new_message.topic = '';
        //     message.new_message.text = '';
        //     return message;
        // })
    }
    //-----------------------------------------------------------------------//

    handleSubmitButton = () => {
        axios.post('http://127.0.0.1:8000/api/messages/', {    
            sender: 'Danya',
            receiver: this.state.new_message.receiver,
            title: this.state.new_message.title,
            date: '2020-04-14',
            text: this.state.new_message.text
        })
            .then(res => console.log(res))
            .catch(error => (console.log(error)));
        this.handleClose();
    }

    show = id => {
        axios.get(`http://127.0.0.1:8000/api/messages/${id}`)
            .then(res => {
                this.setState({
                    displaying: res.data
                })
            })
        const index = this.state.messages.map(message => message.id).indexOf(id);
        this.setState(state => {
            let messages = state;
            if (messages.current.previous !== '') {
                messages.messages[messages.current.previous].clicked = false;
            };
            messages.messages[index].clicked = true;
            messages.current.previous = index;
            return messages;
        });
    };

    delete = id => {
        axios.delete(`http://127.0.0.1:8000/api/messages/${id}`);
        const index = this.state.messages.map(message => message.id).indexOf(id);
        this.setState(state => {
            let messages = state;
            messages.current.previous = '';
            delete messages.messages[index];
            messages.displaying = '';
            this.number -= 1;
            return messages;
        })
    }

    length = messages => {
        this.number = messages.length;
        return;
    }

    write_msg = () => {
        this.handleClickOpen();
        return 1;
    }

    render() {
        const { messages } = this.state;

        return(
            <SplitPane split="vertical" defaultSize={1000} primary="second">
                <List>
                    <ReactHint autoPosition events delay={{show: 100, hide: 10}} />
                    <ReactHint persist
                            attribute="data-custom"
                            className="custom-hint"/>
                    <div className='list'>
                        <Dialog
                            open={this.open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">{"Отправка сообщения"}</DialogTitle>
                            <DialogContent>
                                <TextField 
                                className="receiver" 
                                fullWidth="true" 
                                label="Адресат" 
                                name="receiver"
                                onChange={this.handleDataChange}
                                select 
                                >
                                    {this.users.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <br />
                                <TextField 
                                className="title"
                                fullWidth="true"
                                name="title"
                                onChange={this.handleDataChange}
                                label="Тема" 
                                />
                                <br />
                                <TextField 
                                className="message"
                                fullWidth="true"
                                label="Содержание"
                                name="text"
                                onChange={this.handleDataChange}
                                multiline
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleClose()} color="primary">
                                    Close
                                </Button>
                                <Button onClick={() => this.handleSubmitButton()} color="primary">
                                    Send
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <div className='header'>
                            <h1 className='quantity'> Количество сообщений: {this.number}</h1>
                            <div className='write-msg' onClick={() => this.write_msg()}><Icon size={40} icon={pencil} /></div>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        {messages.map( message => (
                            <div className='rows'>
                                <div className='message'>
                                    <Message show = {() => this.show(message.id)} message={message} key={messages.id} clicked={messages} />
                                </div>
                                <div className='delete-msg-btn' onClick={() => this.delete(message.id)}><Icon size={40} icon={trash} /></div>
                            </div>
                        ))}
                    </div>
                </List>
                <View>
                    <div className='info-container'>
                        <h1 className='title'>{this.state.displaying.title}</h1>
                        {
                            this.state.displaying.title === '#share' ? 
                            <div>
                                <h3 className='title'>Запрос на присоединение к проекту от {this.state.displaying.sender}</h3> 
                                <Button className='admit-btn' variant='contained' color='primary'>Admit</Button>
                            </div> : ''
                        }
                    </div>
                </View>
            </SplitPane>
        )
    }

}

export default MailList;


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

    .quantity {
        margin-left: 2rem;
    }

    .rows {
        display: grid;
        grid-template-columns: repeat(12, 2fr);
        text-align: center;
    }

    .message {
        grid-column-start: 1;
        grid-column-end: 11;
        grid-row-start: 1;
        grid-row-start: 1;
    }

    .delete-msg-btn {
        height: 3rem;
        width: 3rem;
        margin-top: 1.4rem;
        margin-left: 2rem;
        border: 3px solid black;
        border-radius: 1rem;
        &:hover{
            border: 4px solid red;
        }
    }

    .quantity {
        grid-column-start: 1;
        grid-column-end: 11;
        grid-row-start: 1;
        grid-row-start: 1;
    }

    .write-msg {
        grid-column-start: 11;
        grid-column-end: 12;
        grid-row-start: 1;
        grid-row-start: 1;
        height: 3rem;
        width: 3rem;
        margin-top: 1.4rem;
        margin-left: 2rem;
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

    .admit-btn {
        background: #2ecc71;
        margin-left: 21rem;
        margin-top: 5rem;
    }

    .title {
        text-align: center;
    }
`    