import React, { Component } from 'react';
import dateFns from 'date-fns';
import getMilliseconds from 'date-fns/get_milliseconds'
import Event from './CalendarEvent/CalendarEvent';

class Calendar extends Component {
    state = { 
        currentMonth: new Date(),
        selectedDate: new Date(),
        events: []
     };

     

     renderHeader(){
         const dateFormat = 'MMMM YYYY';
         return (
             <div className='header row flex-middle'>
                <div className='col col-start'>
                    <div className='icon' onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className='col col-center'>
                    <span>
                        {dateFns.format(this.state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div className='col col-end' onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
             </div>
         )
     }
     renderDays(){
         const dateFormat = 'dddd';
         const days = [];
         let startDate = dateFns.startOfWeek(this.state.currentMonth);

         for (let i=0; i<7; i++) {
             days.push(
                 <div className='col col-center' key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                 </div>
             );
         }
         return <div className="days row">{days}</div>
     }



     renderCells = () => {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
    
        const dateFormat = "D";
        const rows = [];
    
        let days = [];
        let day = startDate;
        let formattedDate = "";
        let {events} = this.state
        while (day <= endDate) {
          for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat);
            const cloneDay = day;

            days.push(
              <div
                className={`col cell ${
                  !dateFns.isSameMonth(day, monthStart)
                    ? "disabled"
                    : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                }`}
                key={day.toString()}
                onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
              >
                <span className="number">{formattedDate}</span>
                <span className="bg">{formattedDate}</span>
                { events.length > 0 ? this.renderEvent(events, day) : null}
              </div>
            );
            day = dateFns.addDays(day, 1);
        }
        
        rows.push(
            <div className="row" key={day}>
            
              {days}
            </div>
          );
          days = [];
        }
        return <div className="body">{rows}</div>;
      }


     onDateClick = day => {
         this.setState({
             selectedDate:day
         })
         this.state.events.push(day)
     }

     renderEvent = (events, day) => {

        const theEvents = events.filter(e => e.toString() === day.toString()
        )
        if (theEvents.length > 0) {
            const d = getMilliseconds(new Date()).toString()
            return theEvents.map(e => <Event key={d} day={e} />)
        } else {
            return null
        }
     }


     nextMonth = () => {
         this.setState({
             currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
         })
     }
     prevMonth = () => {
         this.setState({currentMonth: dateFns.subMonths(this.state.currentMonth, 1)})
     }



    render() {
        return (
            <div className='calendar'>
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}

export default Calendar;