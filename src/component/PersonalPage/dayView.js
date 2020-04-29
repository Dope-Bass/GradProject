import React from 'react';
import styled from 'styled-components'

import {tag} from 'react-icons-kit/ikons/tag'
import Icon from 'react-icons-kit'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const START = 'Today is starting day of the project  ';
const CHECK = 'Today is checking day of the project  ';
const FINISH = 'Today is final day of the project  ';


const CalendarDay = ({projects, day, month, year, ...props}) =>  {

    const today = new Date();

    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    let events = [];

    for (let i = 0; i <= projects.length; i++) {
        if (projects[i] !== undefined) {
            const start_date = projects[i].start_date.split('-');
            const check_date = projects[i].check_date.split('-');
            const end_date = projects[i].end_date.split('-');
            if (new Date(start_date[0], start_date[1], start_date[2]).valueOf() === new Date(year, month, day).valueOf()) {
                events.push('' + START + '   ' + projects[i].title);
            }
            if (new Date(check_date[0], check_date[1], check_date[2]).valueOf() === new Date(year, month, day).valueOf()) {
                events.push('' + CHECK + '   ' + projects[i].title);
            }
            if (new Date(end_date[0], end_date[1], end_date[2]).valueOf() === new Date(year, month, day).valueOf()) {
                events.push('' + FINISH + '   ' + projects[i].title);
            }
        } else {
            continue;
        }
    }
        
    return (
        <Element>
            <div>
                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"На этот день запланированы данные мероприятия:"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {events.map((event) => (
                            <h3>
                                {event}
                            </h3>
                        ))}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        GOT IT
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
            <div className='day'>
                <div className='square' onClick={() => {}} style={new Date(today.getFullYear(), today.getMonth(), today.getDate()).valueOf() === new Date(year, month, day).valueOf() 
                    ? {background: 'yellow'} : {background: 'white'}}>
                    {day}
                    <p>{Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(new Date(year, month, day))}</p>
                    {events.length !== 0 && <Icon onClick={handleClickOpen} className='icon' size = {20} icon={tag} />}
                </div>
            </div>
        </Element>
    )
}

export default CalendarDay;

const Element = styled.div`

    .square {
        height: 100px;
        width: 100px;
        text-align: center;
        border: 3px solid black;
        border-radius: 1rem;
        background: #fff;
    }


    .icon {
        &:hover{
            color: #f00;
        }
        cursor: pointer;
    }

`