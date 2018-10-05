import React, { Component, Fragment } from 'react';
import { Toggle } from 'Utilities';
import { Modal } from 'Elements';
import dateFns from 'date-fns';
import styles from './CalendarEvent.module.css';

class Event extends Component {

    state = {  }
    render() {
        const {day} = this.props;
        const formattedDay = dateFns.format(day, ("MMM Do"))
        return (
            <div>
                <p className={styles.Calendar_Event}>
                    • New Event on {formattedDay}
                </p>
            </div>
        );
    }
}

export default Event;