import React, { Component } from 'react';
import moment from 'moment';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';

/*
Calendar shell is created then data is passed to it. All calendar routes will have the same
basic build. All of them will be four lines based off of initializing parameters.
*/

class Calendar extends Component {
  constructor(props){
    super(props);
    const starting = this.props.data;
    this.state={data: starting};
  }
  componentWillReceiveProps(newProps){
    $('#calendar').fullCalendar('destroy');
  }
  componentDidMount(){
    this.renderCalendar()
  }
  renderCalendar(){
    $('#calendar').fullCalendar({
      hiddenDays: [0],
      header: {
        left: 'month, basicWeek, basicDay',
        center: 'title',
        right: 'today prev next'
      },
      height: 890,
      defaultView: 'basicWeek',
      events: this.props.data,
      eventRender: function(event, element) {
        element.find('.fc-title').append("<br />" + event.description);
        element.find('.fc-title').append("<br />" + event.name);
        element.find('.fc-title').append("<br />" + event.address);
      },
      eventOrder: 'id'
    });
  }
  render() {
    return (
      <div>
        {this.renderCalendar()}
        <div id='calendar'></div>
      </div>
    );
  }
}

export default (Calendar);
