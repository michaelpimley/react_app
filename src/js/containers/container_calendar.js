import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCalendar } from '../actions/index';
import Calendar from '../components/calendar/component_calendar';

/*
This is for the calendars. It makes all of the calendar calls then determines what information you are
to receive based on route selected. This allows for cory to check deliver/install without reloading.
The color/names are found in a field in insight. This allows for names to be added/updated
without needing to talk to development.
*/

class CalendarPage extends Component {
  constructor(props){
    super(props);
    const startingCalendar = this.props.routeParams.area;
    this.state={events: {}, urlPath: startingCalendar};
  }
  componentWillMount(){
    this.props.getCalendar();
  }
  componentDidMount(){
      var self = this;
      this.interval = setInterval(function(){
        self.props.getCalendar();
      }, 900000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentWillReceiveProps(newProps){
    switch(newProps.routeParams.area){
      case 'install':
        if(newProps.install.length > 0 && newProps.return.length > 0 || newProps.return.length == 0){
          this.setState({urlPath: 'install', events: newProps.install});
        }
        break;
      case 'delivery':
        this.setState({urlPath: 'delivery', events: newProps.delivery});
        break;
    }
  }
  renderInstall(){
    var data = this.state.events;
    const today = moment().format();
    var eventArray = [];
    var emp = this.props.employee;
    var url = this.state.urlPath;
    var ret = this.props.return;
    var victor = [];
    emp.forEach(function (result){
      if(result.feName.length < 3){
        victor.push({name: Number(result.feName), color: result.feColorCode, text: result.feColorBackGround});
      } else if (result.feName == 'null'){
        victor.push({name: null, color: result.feColorCode, text: result.feColorBackGround});
      } else {
        victor.push({name: result.feName, color: result.feColorCode, text: result.feColorBackGround});
      }
    })
    victor.forEach(function (resulta){
      if(url == 'install'){
        data.forEach(function (result){
          var date = result.InstallDate.substring(0,10);
          if(result.InstallDate){
            if(resulta.name === result.Installer){
              var sub = '';
              if(result.Subdivision == null){sub = '';} else {sub = ' - ' + result.Subdivision;}
              eventArray.push({start: date, title: result.Installer + ' - ' + result.ordOrderNo,
              description: result.Salesperson + ' - ' + result.TotalCabs, name: result.venCompanyName,
              address: result.addAddress1 + sub, id: result.installerID,
              color: resulta.color, textColor: resulta.text});
            }
          }
        })
        ret.forEach(function (result){
          var date = result.InstallReturnDate.substring(0,10);
          if(resulta.name == result.InstallerReturn){
            eventArray.push({start: date, title: result.InstallerReturn + ' - ' + result.ordOrderNo,
            description: result.Salesperson + ' - ' + result.TotalCabs, name: result.venCompanyName,
            address: result.addAddress1, color: '#ff0000'});
          }
        })
      }
      if(url == 'delivery'){
        data.forEach(function (result){
          var date = result.shipDate.substring(0,10);
          if(resulta.name == result.shpTruckNo){
            if(result.Installer != null && result.shpTruckNo != 0){
              eventArray.push({start: date, title: result.shpDescription + ' - ' + result.ordOrderNo,
              description: result.truckDriver + ' - ' + result.TotalCabs, name: result.venCompanyName,
              address: result.addAddress1, color: resulta.color, textColor: resulta.text});
            } else if(result.shpTruckNo != 0 && result.ordTypeCode == 'SVO6' || result.ordTypeCode == 'SVO3' ||
              result.ordTypeCode == 'wo delivery'){
                eventArray.push({start: date, title: result.shpDescription + ' - ' + result.ordOrderNo,
                description: result.truckDriver + ' - ' + result.TotalCabs, name: result.venCompanyName,
                address: result.addAddress1, color: resulta.color, textColor: resulta.text});
            } else if(result.shpTruckNo != 0){
              eventArray.push({start: date, title: result.shpDescription + ' - ' + result.ordOrderNo,
              description: result.truckDriver + ' - ' + result.TotalCabs, name: result.venCompanyName,
              address: result.addAddress1, borderColor: '#FF00C1', color: resulta.color, textColor: resulta.text});
            }
          }
        })
      }
    })
    return eventArray;
  }
  render() {
    return (
      <div>
        {this.state.events.length > 0 ? <Calendar data={this.renderInstall()} /> : ''}
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    install: state.install,
    delivery: state.delivery,
    return: state.return,
    employee: state.employee
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ getCalendar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
