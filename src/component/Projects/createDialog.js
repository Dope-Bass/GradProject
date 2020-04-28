// import React, { Component } from 'react';
// // import ReactList from 'react-list';
// // import Item from 'react'
// // import { NavLink } from 'react-router-dom';
// // import { Link } from '@material-ui/core';
// import Project from './List_Inner_side'
// import MaterialUIPickers from './datePicker'
// import styled from 'styled-components'
// import SplitPane from 'react-split-pane'
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Slide from '@material-ui/core/Slide';
// import Button from '@material-ui/core/Button';

// import axios from 'axios';

// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';

// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';


// class createDialog extends Component {
//     constructor() {
//         super();
//         this.state = {

//             new_proj: {
//                 project_name: 'Без Названия',
//                 startDate: '',
//                 endDate: '',
//                 checkDate: '',
//                 design: false,
//                 functional: false,
//                 discussion: false,
//                 idea: false,
//                 bug: false,
//                 not_formal: false,
//                 description: '',
//                 founder: ''
//             }
//         }
//         this.open = false;
//     }

//     handleDataChange = e => {
//         e.preventDefault();
//         const { name, value } = e.target;
//         let new_proj = { ...this.state.new_proj };

//         switch (name) {
//             case "project_name":
//                 new_proj.project_name = value;
//                 if (new_proj.project_name === "") {
//                     new_proj.project_name = "Без Названия";
//                 }
//                 break;
//             case "design":
//                 new_proj.front = e.target.checked;
//                 break;
//             case "functional":
//                 new_proj.back = e.target.checked;
//                 break;
//             case "discussion":
//                 new_proj.discussion = e.target.checked;
//                 break;
//             case "idea":
//                 new_proj.idea = e.target.checked;
//                 break;
//             case "bug":
//                 new_proj.bug = e.target.checked;
//                 break;
//             case "not_formal":
//                 new_proj.not_formal = e.target.checked;
//                 break;
//             case "description":
//                 new_proj.description = value;
//                 break;
//             default:
//                 break;
//           }

//         this.setState({ new_proj, [name]: value }, () => console.log(this.state));
//         this.props.callbackFunc(new_proj);
//     }

//     render() {
//         return(
//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <TextField 
//                         className="project-name"
//                         label="Название проекта" 
//                         name="project_name"
//                         onChange={this.handleDataChange}
//                     />
//                 </Grid>
//                 <Grid item xs={6} sm={2}>
//                     <MaterialUIPickers name={"Дата начала проекта"} />
//                 </Grid>
//                 <Grid item xs={6} sm={2}>
//                     <MaterialUIPickers name={"Дата сдачи проекта"} />
//                 </Grid>
//                 <Grid item xs={6} sm={2}>
//                     <MaterialUIPickers name={"Дата презентации проекта"} />
//                 </Grid>
//                 <Grid>
//                     <FormGroup row>
//                         <br />
//                         <Grid container spacing={10}>
//                             <Grid item xs={12} sm={2}>
//                                 <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                     checked={this.state.new_proj.front}
//                                     onChange={this.handleDataChange}
//                                     name="front"
//                                     color="primary"
//                                     />
//                                 }
//                                 label="Дизайн"
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={2}>
//                                 <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                     checked={this.state.new_proj.back}
//                                     onChange={this.handleDataChange}
//                                     name="back"
//                                     color="primary"
//                                     />
//                                 }
//                                 label="Функционал"
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={2}>
//                                 <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                     checked={this.state.new_proj.discussion}
//                                     onChange={this.handleDataChange}
//                                     name="discussion"
//                                     color="primary"
//                                     />
//                                 }
//                                 label="Обсуждение"
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={2}>
//                                 <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                     checked={this.state.new_proj.idea}
//                                     onChange={this.handleDataChange}
//                                     name="idea"
//                                     color="primary"
//                                     />
//                                 }
//                                 label="Идея"
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={2}>
//                                 <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                     checked={this.state.new_proj.bug}
//                                     onChange={this.handleDataChange}
//                                     name="bug"
//                                     color="primary"
//                                     />
//                                 }
//                                 label="Ошибка"
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={2}>
//                                 <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                     checked={this.state.new_proj.not_formal}
//                                     onChange={this.handleDataChange}
//                                     name="not_formal"
//                                     color="primary"
//                                     />
//                                 }
//                                 label="Неформальное"
//                                 />
//                             </Grid>
//                         </Grid>
//                     </FormGroup>
//                     <Grid>
//                         <br />
//                         <TextField 
//                             className="description"
//                             fullWidth="true"
//                             label="Описание"
//                             name="description"
//                             onChange={this.handleDataChange}
//                             multiline
//                         />
//                     </Grid>
//                 </Grid>
//             </Grid>
//         )
//     }
// }

// export default createDialog;