import React, { Component } from 'react';
import 'date-fns';

// My project dependencies
import Project from './List_Inner_side'

//Dialog imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Actions
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from 'react-icons-kit'
import MenuItem from '@material-ui/core/MenuItem';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

//Views
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {close} from 'react-icons-kit/ikons/close'

//Back dependencies
import axios from 'axios';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class ProjectList extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],

            current: {
                previous: ''
            },

            displaying: '',

            comments: [],
             
            new_proj: {
                title: '',
                founder: '',
                startDate: new Date(),
                endDate: new Date(),
                checkDate: new Date(),
                design: false,
                functional: false,
                discussion: false,
                idea: false,
                bug: false,
                not_formal: false,
                description: ''
            },

            participants: [],

            projectReceiver: ''
        }
        this.number = this.state.projects.length;
        this.users = ['Danya']
        this.open_create = false;
        this.open_share = false;
        this.comment = '';
        this.flag = '';
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(res => {
                this.setState({
                    projects: res.data
                })
                this.setState(() => {
                    this.number = this.state.projects.length;
                    return 1;
                })
            })
        axios.get('http://127.0.0.1:8000/api/comments/')
        .then(res => {
            this.setState({
                comments: res.data
            })
        })
        axios.get('http://127.0.0.1:8000/api/participants/')
        .then(res => {
            this.setState({
                participants: res.data
            })
        })
    }

    handleCreateOpen = () => {
        this.setState(() => {
            this.open_create = true;
            return 1;
        })
    }

    handleCreateClose = () => {
        this.setState(() => {
            this.open_create = false;
            return 1;
        })
    }

    handleShareOpen = () => {
        this.setState(() => {
            this.open_share = true;
            return 1;
        })
    }

    handleShareClose = () => {
        this.setState(() => {
            this.open_share = false;
            return 1;
        })
    }
    // '2020-04-14'
    handleSubmitButton = (event) => {
        axios.post('http://127.0.0.1:8000/api/projects/', {
            title: this.state.new_proj.title,
            founder: 'Danya',
            design: this.state.new_proj.design,
            start_date: `${this.state.new_proj.startDate.getFullYear()}-${this.state.new_proj.startDate.getMonth()}-${this.state.new_proj.startDate.getDate()}`,
            end_date: `${this.state.new_proj.endDate.getFullYear()}-${this.state.new_proj.endDate.getMonth()}-${this.state.new_proj.endDate.getDate()}`,
            check_date: `${this.state.new_proj.checkDate.getFullYear()}-${this.state.new_proj.checkDate.getMonth()}-${this.state.new_proj.checkDate.getDate()}`,
            functional: this.state.new_proj.functional,
            discussion: this.state.new_proj.discussion,
            idea: this.state.new_proj.idea,
            bug: this.state.new_proj.bug,
            not_formal: this.state.new_proj.not_formal,
            description: this.state.new_proj.description
        })
            .then(res => console.log(res))
            .catch(error => (console.log(error)));
        axios.post('http://127.0.0.1:8000/api/messages/', {
            sender: 'Service',
            receiver: 'Danya',
            title: 'You have just created a project',
            date: '2020-04-14',
            text: `This is the title of your created projects, go check it out ${this.state.new_proj.title}`
        })
        this.handleCreateClose();
    }

    handleDataChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let new_proj = { ...this.state.new_proj };

        switch (name) {
            case "title":
                new_proj.title = value;
                break;
            case "design":
                new_proj.design = e.target.checked;
                break;
            case "functional":
                new_proj.functional = e.target.checked;
                break;
            case "discussion":
                new_proj.discussion = e.target.checked;
                break;
            case "idea":
                new_proj.idea = e.target.checked;
                break;
            case "bug":
                new_proj.bug = e.target.checked;
                break;
            case "not_formal":
                new_proj.not_formal = e.target.checked;
                break;
            case "description":
                new_proj.description = value;
                break;
            case "comment":
                this.setState(() => {
                    this.comment = value;
                })
                break;
            case "projectReceiver":
                this.setState(state => {
                    state.projectReceiver = value;
                })
                break;
            // case "Дата начала проекта":
            //     new_proj.start_date = value;
            //     console.log(this.state.new_proj.startDate);
            //     break;
            // case "Дата презентации проекта":
            //     new_proj.checkDate = value;
            //     break;
            // case "Дата сдачи проекта":
            //     new_proj.endDate = value;
            //     break;
            default:
                break;
          }
      
        this.setState({ new_proj });
    }

    startChange = date => {
        let new_proj = { ...this.state.new_proj };

        new_proj.startDate = date;
        console.log(new_proj);
        this.setState({ new_proj });
    }

    endChange = date => {
        let new_proj = { ...this.state.new_proj };

        new_proj.endDate = date;
        console.log(new_proj);
        this.setState({ new_proj });
    }

    checkChange = date => {
        let new_proj = { ...this.state.new_proj };

        new_proj.checkDate = date;
        console.log(new_proj);
        this.setState({ new_proj });
    }

    create = () => {
        this.handleCreateOpen();
        return 1;
    }

    share = () => {
        if (this.state.displaying === '') {
            return;
        }
        this.handleShareOpen();
        return 0;
    }

    shareProject = () => {
        axios.post('http://127.0.0.1:8000/api/messages/', {    
            sender: this.users[0],
            receiver: this.state.projectReceiver,
            title: '#share',
            date: '2020-04-14',
            text: this.state.displaying.id
        })
            .then(res => console.log(res))
            .catch(error => (console.log(error)));
        this.handleShareClose();
    }

    show = id => {
        axios.get(`http://127.0.0.1:8000/api/projects/${id}`)
            .then(res => {
                this.setState({
                    displaying: res.data
                })
            })
        const index = this.state.projects.map(project => project.id).indexOf(id);
        this.setState(state => {
            let projects = state;
            if (projects.current.previous !== '') {
                projects.projects[projects.current.previous].clicked = false;
            };
            projects.projects[index].clicked = true;
            projects.current.previous = index;
            return projects;
        });
    };

    delete = id => {
        if (this.state.displaying === '') {
            return;
        }
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`);
        const index = this.state.projects.map(project => project.id).indexOf(id);
        this.setState(state => {
            let projects = state;
            projects.current.previous = '';
            delete projects.projects[index];
            projects.displaying = '';
            this.number -= 1;
            return projects;
        })
    }

    leaveComment = id => {
        axios.post('http://127.0.0.1:8000/api/comments/', {
            project: id,
            founder: 'user',
            date: '2020-04-14',
            text: this.comment
        })
            .then(res => console.log(res))
            .catch(error => (console.log(error)));
    }

    changeStage = (stage, id) => {
        const index = this.state.projects.map(project => project.id).indexOf(id);
        axios.put(`http://127.0.0.1:8000/api/projects/${id}/`, {
            title: this.state.displaying.title,
            founder: 'me',
            design: this.state.displaying.design,
            start_date: this.state.new_proj.startDate,
            end_date: this.state.new_proj.endDate,
            check_date: '2020-04-14',
            functional: this.state.displaying.functional,
            discussion: this.state.displaying.discussion,
            idea: this.state.displaying.idea,
            bug: this.state.displaying.bug,
            not_formal: this.state.displaying.not_formal,
            description: this.state.displaying.description,
            stage: stage
        })
        this.setState(state => {
            let projects = state;
            projects.projects[index].stage = stage;
            projects.displaying.stage = stage;
            return projects;
        })
        this.show(id);
    }

    deleteComment = id => {
        axios.delete(`http://127.0.0.1:8000/api/comments/${id}`);
        const index = this.state.comments.map(comment => comment.id).indexOf(id);
        this.setState(state => {
            let comments = state;
            delete comments.comments[index];
            return comments;
        })
    }

    render() {
        const { projects } = this.state;
        const { comments } = this.state;

        return(
            <SplitPane split="vertical" defaultSize={1000} primary="second">
                <List>
                    <Dialog
                            open={this.open_create}
                            TransitionComponent={Transition}
                            keepMounted
                            fullScreen
                            onClose={this.handleCreateClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                        <DialogTitle id="alert-dialog-slide-title" className="dialog-title">
                            <DialogActions className="action-btns">
                                <Button className="dialog-action-btn" onClick={this.handleCreateClose} color="primary">
                                    Close
                                </Button>
                                <Button className="dialog-action-btn" htmlType="submit" onClick={this.handleSubmitButton} color="primary">
                                    Create
                                </Button>
                            </DialogActions>
                            <h2 className="dialog-title">Создание проекта</h2>
                        </DialogTitle>
                        <DialogContent className="dialog-content">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField 
                                        className="project-name"
                                        label="Название проекта" 
                                        name="title"
                                        onChange={this.handleDataChange}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        {/* <MaterialUIPickers name="Дата начала проекта" onChange={this.handleDataChange}/> */}
                                        <KeyboardDatePicker
                                            // disableToolbar
                                            // variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Дата начала проекта"
                                            value={new Date()}
                                            onChange={this.startChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        {/* <MaterialUIPickers name={"Дата сдачи проекта"} /> */}
                                        <KeyboardDatePicker
                                            // disableToolbar
                                            // variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Дата конца проекта"
                                            value={new Date()}
                                            onChange={this.endChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        {/* <MaterialUIPickers name={"Дата презентации проекта"} /> */}
                                        <KeyboardDatePicker
                                            // disableToolbar
                                            // variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Дата проверки"
                                            value={new Date()}
                                            onChange={this.checkChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid>
                                    <FormGroup row>
                                        <br />
                                        <Grid container spacing={10}>
                                            <Grid item xs={12} sm={2}>
                                                <FormControlLabel
                                                control={
                                                    <Checkbox
                                                    checked={this.state.new_proj.front}
                                                    onChange={this.handleDataChange}
                                                    name="design"
                                                    color="primary"
                                                    />
                                                }
                                                label="Дизайн"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <FormControlLabel
                                                control={
                                                    <Checkbox
                                                    checked={this.state.new_proj.back}
                                                    onChange={this.handleDataChange}
                                                    name="functional"
                                                    color="primary"
                                                    />
                                                }
                                                label="Функционал"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <FormControlLabel
                                                control={
                                                    <Checkbox
                                                    checked={this.state.new_proj.discussion}
                                                    onChange={this.handleDataChange}
                                                    name="discussion"
                                                    color="primary"
                                                    />
                                                }
                                                label="Обсуждение"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <FormControlLabel
                                                control={
                                                    <Checkbox
                                                    checked={this.state.new_proj.idea}
                                                    onChange={this.handleDataChange}
                                                    name="idea"
                                                    color="primary"
                                                    />
                                                }
                                                label="Идея"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <FormControlLabel
                                                control={
                                                    <Checkbox
                                                    checked={this.state.new_proj.bug}
                                                    onChange={this.handleDataChange}
                                                    name="bug"
                                                    color="primary"
                                                    />
                                                }
                                                label="Ошибка"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <FormControlLabel
                                                control={
                                                    <Checkbox
                                                    checked={this.state.new_proj.not_formal}
                                                    onChange={this.handleDataChange}
                                                    name="not_formal"
                                                    color="primary"
                                                    />
                                                }
                                                label="Неформальное"
                                                />
                                            </Grid>
                                        </Grid>
                                    </FormGroup>
                                    <Grid>
                                        <br />
                                        <TextField 
                                            className="description"
                                            fullWidth="true"
                                            label="Описание"
                                            name="description"
                                            onChange={this.handleDataChange}
                                            multiline
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                    <div className='list'>
                        <h1 className='quantity'> Количество текущих проектов: {this.number}</h1>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        {projects.map( project => (
                            <Project show = {() => this.show(project.id)} project={project} key={projects.id} clicked = {projects} ></Project>
                        ))}
                    </div>
                    <Buttons> 
                        <div className={this.state.displaying === '' ? 'delete-btn-disabled' : 'delete-btn-active'} onClick={() => this.delete(this.state.displaying.id)}>
                            Delete
                        </div>
                        <div className='create-btn' onClick={() => this.create()}>
                            Create
                        </div>
                    </Buttons>
                </List>
                <View>
                    <div className='info-container'>
                        <h1 className='title'>{this.state.displaying.title}</h1>
                        {   this.state.displaying === '' ? '' :
                            <div className='subHeader'>
                                <h2 className='start'>Начало</h2>
                                <h2 className='check'>Проверка</h2>
                                <h2 className='finish'>Сдача</h2>
                            </div>
                        }
                        <div className='dateHeader'>
                            <Button color='primary' className='start'>{this.state.displaying.start_date}</Button>
                            <Button color='primary' className='check'>{this.state.displaying.check_date}</Button>
                            <Button color='primary' className='finish'>{this.state.displaying.end_date}</Button>
                        </div>
                        <br />
                        { this.state.displaying === '' ? '' :
                            <div>
                                <div className='projDefiners'>
                                    <div className='buttons'>
                                        <Button variant='contained' color={this.state.displaying.design === true ? 'primary' : ''}>Дизайн</Button>
                                        <br />
                                        <br />
                                        <Button variant='contained' color={this.state.displaying.functional === true ? 'primary' : ''}>Функционал</Button>
                                        <br />
                                        <br />
                                        <Button variant='contained' color={this.state.displaying.bug === true ? 'primary' : ''}>Ошибка</Button>
                                        <br />
                                        <br />
                                        <Button variant='contained' color={this.state.displaying.idea === true ? 'primary' : ''}>Идея</Button>
                                        <br />
                                        <br />
                                        <Button variant='contained' color={this.state.displaying.not_formal === true ? 'primary' : ''}>Неформальное</Button>
                                        <br />
                                        <br />
                                        <Button variant='contained' color={this.state.displaying.discussion === true ? 'primary' : ''}>Обсуждение</Button>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <h1 className='title'>{'Стадия разработки проекта'}</h1>
                                <br />
                                <br />
                                <div className='stages'>
                                    <Button className={this.state.displaying.stage === 0 ? 'pre-alphaCurrent' : 'pre-alpha'} onClick={() => this.changeStage(0, this.state.displaying.id)} variant='contained'>Pre-Alpha</Button>
                                    <Button className={this.state.displaying.stage === 1 ? 'alphaCurrent' : 'alpha'} onClick={() => this.changeStage(1, this.state.displaying.id)} variant='contained'>Alpha</Button>
                                    <Button className={this.state.displaying.stage === 2 ? 'betaCurrent' : 'beta'} onClick={() => this.changeStage(2, this.state.displaying.id)} variant='contained'>Beta</Button>
                                    <Button className={this.state.displaying.stage === 3 ? 'releaseCurrent' : 'release'} onClick={() => this.changeStage(3, this.state.displaying.id)} variant='contained'>Release</Button>
                                </div>
                                <br />
                                <h1 className='title'>{'Описание'}</h1>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                        <Typography>{this.state.displaying.title}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            {this.state.displaying.description}
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <br />
                                <h1 className='title'>{'Участники'}</h1>
                                <br />
                                {comments.map( comment => ( comment.project === this.state.displaying.id ?
                                        <div className='rows'>
                                            <div className='comContainer'>
                                                {/* <Message show = {() => this.show(comment.id)} message={comment} key={comments.id} clicked={comments} /> */}
                                                <div className='comHeader'>
                                                    <h3 className='comFounder'> {comment.founder} : </h3>
                                                    <Icon className='comDelete' onClick={() => this.deleteComment(comment.id)} size={30} icon={close} />
                                                </div>
                                                <p className='comText'>{comment.text}</p>
                                            </div>
                                            {/* <div className='delete-msg-btn' onClick={() => this.delete(message.id)}><Icon size={40} icon={trash} /></div> */}
                                        </div> : ''
                                        
                                ))}
                                <br />
                                <br />
                                <TextField 
                                    className="comment"
                                    fullWidth="true"
                                    name="comment"
                                    onChange={this.handleDataChange}
                                    label="Оставить комментарий" 
                                    variant="outlined"
                                />
                                <br />
                                <br />
                                <Button className='comment-btn' variant='contained' onClick={() => this.leaveComment(this.state.displaying.id, this.state.displaying.title)}>
                                    Добавить
                                </Button>
                                <br />
                                <br />
                            </div>
                        }
                    </div>
                    <div className={this.state.displaying === '' ? 'share-btn-disabled' : 'share-btn-active'} onClick={() => this.share()}> 
                        Share
                    </div>
                    <Dialog
                            open={this.open_share}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.handleShareClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">{"Поделиться проектом"}</DialogTitle>
                            <DialogContent>
                                <TextField 
                                className="receiver" 
                                fullWidth="true" 
                                label="Адресат" 
                                name="projectReceiver"
                                onChange={this.handleDataChange}
                                select 
                                >
                                    {this.users.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleShareClose()} color="primary">
                                    Close
                                </Button>
                                <Button onClick={() => this.shareProject()} color="primary">
                                    Share
                                </Button>
                            </DialogActions>
                    </Dialog>
                </View>
            </SplitPane>
        )
    }

}

export default ProjectList;

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

    .end-date-title {
        font-family: "serif";
    }

    .quantity {
        text-align: center;
    }

    .dialog-title {
        display: grid;
        grid-template-columns: repeat(12, 2fr);
        border: 1px solid black;
    }

    .action-btns {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-start: 1;
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

    .comment-btn {
        margin-left: 82%;
    }

    .buttons {
        margin-left: 10px;
    }

    .stages {
        margin-left: 30px;
        display: grid;
        grid-template-columns: repeat(12, 2fr);
    }

    .pre-alpha {
        grid-column-start: 1;
        grid-column-end: 3;
    }

    .alpha {
        grid-column-start: 4;
        grid-column-end: 6;
    }

    .beta {
        grid-column-start: 7;
        grid-column-end: 9;
    }

    .release {
        grid-column-start: 10;
        grid-column-end: 12;
    }

    .pre-alphaCurrent {
        background: #e74c3c;
        grid-column-start: 1;
        grid-column-end: 3;
    }

    .alphaCurrent {
        background:  #f1c40f;
        grid-column-start: 4;
        grid-column-end: 6;
    }

    .betaCurrent {
        background: #2ecc71;
        grid-column-start: 7;
        grid-column-end: 9;
    }

    .releaseCurrent {
        background:  #8e44ad;
        grid-column-start: 10;
        grid-column-end: 12;
    }

    .rows {
        margin-left: 10px;
        display: grid;
        grid-template-columns: repeat(12, 2fr);
    }

    .comHeader {
        display: grid;
        grid-template-columns: repeat(12, 2fr);
    }

    .comFounder {
        margin-left: 8px;
        grid-column-start: 1;
        grid-column-end: 10;
        grid-row-start: 1;
        grid-row-start: 1;
    }

    .comDelete {
        margin-left: 8px;
        grid-column-start: 12;
        grid-column-end: 12;
        grid-row-start: 1;
        grid-row-start: 1;
        cursor: pointer;
        &:hover{
            color: red;
        }
    }

    .comContainer {
        margin-left: 5px;
        border: 1px solid black;
        border-radius: 1rem;
        grid-column-start: 1;
        grid-column-end: 11;
        grid-row-start: 1;
        grid-row-start: 1;
    }

    .comText {
        margin-left: 15px;
    }

    .subHeader {
        display: grid;
        grid-template-columns: repeat(12, 2fr);
    }

    .dateHeader {
        display: grid;
        grid-template-columns: repeat(12, 2fr);
    }

    .comment {
        margin-left: 10px;
        width: 700px;
    }

    .start {
        text-align: center;
        grid-column-start: 2;
        grid-column-end: 5;
    }

    .check {
        text-align: center;
        grid-column-start: 6;
        grid-column-end: 9;
    }

    .finish {
        text-align: center;
        grid-column-start: 10;
        grid-column-end: 12;
    }

    .title {
        text-align: center;
    }

    .share-btn-active {
        left: 54rem;
        top: 10rem;
        width: 6rem;
        text-align: center;
        height: 3rem;
        background: #00f;
        font-size: 17pt;
        color: #fff;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 0.1875rem;
        border: 3px solid black;
        position: absolute;
        translate: transform(-50%, -50%);
        cursor: pointer;
        transition: background 0.2s ease-in;
        &:hover{
            background: #d3d3d3;
        }
    }

    .share-btn-disabled {
        left: 54rem;
        top: 10rem;
        width: 6rem;
        text-align: center;
        height: 3rem;
        background: #fff;
        font-size: 17pt;
        color: #fff;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 0.1875rem;
        border: 3px solid black;
        position: absolute;
        translate: transform(-50%, -50%);
        transition: background 0.2s ease-in;
        background: #d3d3d3;
    }
`

const Buttons = styled.div`
    .delete-btn-active {
        left: 2rem;
        top: 10rem;
        width: 6rem;
        text-align: center;
        height: 3rem;
        background: #f00;
        font-size: 17pt;
        color: #fff;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 0.1875rem;
        border: 3px solid black;
        position: absolute;
        translate: transform(-50%, -50%);
        cursor: pointer;
        transition: background 0.2s ease-in;
        &:hover{
            background: #d3d3d3;
        }
    }

    .delete-btn-disabled {
        left: 2rem;
        top: 10rem;
        width: 6rem;
        text-align: center;
        height: 3rem;
        font-size: 17pt;
        color: #fff;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 0.1875rem;
        border: 3px solid black;
        position: absolute;
        translate: transform(-50%, -50%);
        transition: background 0.2s ease-in;
        background: #d3d3d3;
    }

    .create-btn {
        left: 2rem;
        top: 16rem;
        width: 6rem;
        text-align: center;
        height: 3rem;
        background: #0f0;
        font-size: 17pt;
        color: #fff;
        padding: 0.4375rem 1.0625rem;
        font-weight: 400;
        line-height: normal;
        border-radius: 0.1875rem;
        border: 3px solid black;
        position: absolute;
        translate: transform(-50%, -50%);
        cursor: pointer;
        transition: background 0.2s ease-in;
        &:hover{
            background: #d3d3d3;
        }
    }


`