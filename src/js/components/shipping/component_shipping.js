import React, { Component } from 'react';
import moment from 'moment';

import Panel from './component_panel';
import Information from './component_information_table';
import Delay from './component_delay_table';

/*
component_shipping is essentially a shell for the entire project. It receives data from container_shipping
then determines where to send the information. It also controls the day selected so the information can
be filtered through. It sends two pieces of information to component_panel(which is a panel shell),
then sends an array to the component_information_table component to render through to display the truck
shipping information. Finally it sends an array to the component_delay_table component,
if there is information to be sent, that displays the delay information.
*/

class ShippingApp extends Component {
  constructor(props){
    super(props);
    this.state={selectedDay: 0};
    this.addDay = this.addDay.bind(this);
    this.subtractDay = this.subtractDay.bind(this);
  }
  addDay(e){
    if(this.state.selectedDay == 0 || this.state.selectedDay < this.props.data.length - 1){
      var index = this.state.selectedDay + 1;
      this.setState({selectedDay: index});
    } else {
      var index = 0;
      this.setState({selectedDay: index});
    }
  }
  subtractDay(e){
    var index = this.state.selectedDay - 1;
    this.setState({selectedDay: index});
  }
  renderDay(){
    var data = this.props.data;
    var index = this.state.selectedDay;
    return (
      <div>
        <center>
          <div className="row">
            <div className="col-md-2">
              {this.state.selectedDay > 0 ?
              <button type="button" className="btn btn-primary" onClick={this.subtractDay}>Go Forward</button> : ''}
            </div>
            <div className="col-md-8">
              <h2><strong>{data[index].day}</strong></h2>
            </div>
            <div className="col-md-2">
              {this.state.selectedDay != this.props.data.length - 1 ?
              <button type="button" className="btn btn-primary" onClick={this.addDay}>Go Back</button> : '' }
            </div>
            <div className="clearfix"></div>
            <br />
            <Panel title='Total Cabs' data={data[index].main[0].boxPerDay} />
            <Panel title='Total Items' data={data[index].main[0].itmPerDay}/>
            <Panel title='Total Orders' data={data[index].main[0].ordPerDay}/>
            <div className="clearfix"></div>
            <br />
            <Information data={data[index]} title='Shipping Information'/>
            <Delay data={data[index]} title='Delay Issues'/>
          </div>
        </center>
      </div>
    );
  }
  render() {
    return(
      <div className="container-fluid">
        {this.renderDay()}
      </div>
    );
  }
}

export default ShippingApp;
