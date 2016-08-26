import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MapComp from '../components/map/component_map';
import MapRender from '../components/map/component_map_render';
import ComponentModal from '../components/map/component_modal';
import ModalField from '../components/map/component_modal_field';
import { fetchGeoloc, getJobs, pushJob, getAddress } from '../actions/index';

/*
This application is for the map display of jobs in the system
the component_map will display the map component as well as map through items
to create markers for the map. The markers will display some information when clicked
and the map itself will render a modal through the component_modal component. The modal
will accept a few parameters then post it to the table.
*/

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state={
      loc: [{lat: 29.56207989834591, lng: -95.82573652267456}],
      data: null,
      address: [],
      markers: [],
      sales: null,
      geoInfo: [],
      modal: false,
      info: [],
      addArray: [],
      zoom: 12,
      modValues: [{address: '', builder: '', subdivision: '', salesman: '', notes: '', lot: ''}]
    };
  }
  componentDidMount() {
    if(this.props.geoloc.length == 0){
      this.props.fetchGeoloc();
      //this.props.getJobs();
    }
  }
  componentWillReceiveProps(newProps){
    var temp = [];
    var salesTemp = [];
    if(newProps.geoloc.length > 0){
      newProps.geoloc.forEach(function (resp){
        if(resp.GPSLatitude != null && resp.GPSLongitude != null){
          temp.push({ City: resp.City,  County: resp.County, Address: resp.addAddress1,
          state: resp.State, ZipArea: resp.addServiceArea, ZipCode: resp.ZipCode, salesPerson: resp.salesPerson,
          position: {lat: resp.GPSLatitude, lng: resp.GPSLongitude}, showInfo: false });
        }
        if(salesTemp.indexOf(resp.salesPerson) == -1){
          if(resp.salesPerson != null){
            if(salesTemp.length == 0){
              salesTemp.push(null);
              salesTemp.push(resp.salesPerson);
            } else {
              salesTemp.push(resp.salesPerson);
            }
          }
        }
      })
    }
    if(newProps.geoloc.length != this.state.markers.length){
      this.setState({ markers: temp, sales: salesTemp });
    }
    if(newProps.geoCode.length > 0){
      this.runLoc(newProps.geoCode);
    }
    if(newProps.geoAddress.results){
      var data = newProps.geoAddress.results[0].address_components;
      var loc = newProps.geoAddress.results[0].geometry.location;
      var address = [];
      if(data[0].types[0] == 'route'){
        var zip = parseInt(data[5].long_name);
        address.push({ address: data[0].long_name, city: data[1].long_name, county: data[2].long_name,
        state: data[3].short_name, country: data[4].short_name, zip: zip, lat: loc.lat, lng: loc.lng});
        var change = Object.assign({}, this.state);
        change.modValues[0].address = data[0].long_name;
        this.setState(change);
      } else {
        var zip = parseInt(data[6].long_name);
        address.push({ address: data[0].long_name + ' ' + data[1].long_name, city: data[2].long_name,
        county: data[3].long_name, state: data[4].short_name, country: data[5].short_name, zip: zip,
        lat: loc.lat, lng: loc.lng});
        var change = Object.assign({}, this.state);
        change.modValues[0].address = data[0].long_name + ' ' + data[1].long_name;
        this.setState(change);
      }
      this.setState({ addArray: address, modal: !this.state.modal });
    }
  }
  //MAP FUNCTIONS
  handleZoom(zoom){
    this.setState({ zoom: zoom });
  }
  //SEARCH BOX FUNCTION
  searchChange(lat, lng, address){
    var temp = this.state.markers;
    var counter = 0;
    temp.forEach(function (resp){
      if(resp.position.lat == lat){
        if(resp.position.lng == lng){
          counter = 1;
        }
      }
    })
    var tmpMarker = { Address: address, position: {lat: lat, lng: lng } };
    var state = this.state.loc;
    state = [{ lat: lat, lng: lng }];
    this.setState({ loc: state, zoom: 18 });
    if(counter == 0){
      temp.push(tmpMarker);
      this.setState({ markers: temp });
    }
  }
  //MAIN MODAL CONTROLS - THIS IS THE SAVE CANCEL AND RENDERING OF IT
  renderCancel(){
    this.setState({ modal: !this.state.modal });
  }
  renderModal(data, e){
    this.setState({ modal: !this.state.modal, data: data });
  }
  //BEGINING OF INTERIOR MODAL CONTROLS
  addressChange(e){
    var change = Object.assign({}, this.state);
    change.modValues[0].address = e.target.value;
    this.setState(change);
  }
  lotChange(e){
    var change = Object.assign({}, this.state);
    change.modValues[0].lot = e.target.value;
    this.setState(change);
  }
  builderChange(e){
    var change = Object.assign({}, this.state);
    change.modValues[0].builder = e.target.value;
    this.setState(change);
  }
  subdivisionChange(e){
    var change = Object.assign({}, this.state);
    change.modValues[0].subdivision = e.target.value;
    this.setState(change);
  }
  salesmanChange(e){
    var change = Object.assign({}, this.state);
    change.modValues[0].salesman = e.target.value;
    this.setState(change);
  }
  notesChange(e){
    var change = Object.assign({}, this.state);
    change.modValues[0].notes = e.target.value;
    this.setState(change);
  }
  submitForm(){
    const data = this.state.addArray[0];
    const second = this.state.modValues[0];
    console.log(data);
    console.log(second);
    var temp = [];
    temp.push({address: data.address, city: data.city, county: data.county, state: data.state,
      country: data.country, zip: data.zip, lat: data.lat, lng: data.lng, salesman: this.state.salesman,
      builder: this.state.builder, subdivision: this.state.subdivision, lot: this.state.lot,
      notes: this.state.notes});
  }
  //END OF INTERIOR MODAL
  handleMapClick(event) {
    this.setState({ loc: [{ lat: event.latLng.lat(), lng: event.latLng.lng() }] });
    this.props.getAddress(event.latLng.lat(), event.latLng.lng());
  }
  handleMarkerClick(marker, index, that){
    var temp = this.state.info;
    if(temp.indexOf(index) == -1){
      temp.push(index);
      this.setState({ info: temp, loc: [{ lat: marker.position.lat, lng: marker.position.lng }] });
    }
  }
  handleMarkerClose(marker, index){
    var temp = this.state.info;
    var ind = temp.indexOf(index);
    temp.splice(ind, 1);
    this.setState({ info: temp, loc: [{ lat: marker.position.lat, lng: marker.position.lng }] });
  }
  //DELETE RUN LOC WHEN YOU FINISH RUNNING THEM
  runLoc(array){
    var holder = array;
    var array = [];
    for(var m = 0; m < 75; m++){
      var address = holder[m].addAddress1.replace(/'/g, "\-");
      array.push({ id: holder[m].addID, street: address,
        city: holder[m].addCity, state: holder[m].addState, zip: holder[m].addZip });
    }
    //console.log(array);
    this.props.pushJob(array);
  }
  render() {
    return (
        <div className="map_container">
        {this.state.sales ?
          <MapRender
            start={this.state.loc}
            marker={this.state.markers}
            open={this.state.info}
            zoom={this.state.zoom}
            markerClick={::this.handleMarkerClick}
            markerClose={::this.handleMarkerClose}
            search={::this.searchChange}
            mapClick={::this.handleMapClick}
            handleZoom={::this.handleZoom} />
        : ''}
        {this.state.modal == true ?
          <ModalField
            modal={this.state.modal}
            sales={this.state.sales}
            submit={::this.submitForm}
            modValues={this.state.modValues[0]}
            addressChange={::this.addressChange}
            builderChange={::this.builderChange}
            subdivisionChange={::this.subdivisionChange}
            salesmanChange={::this.salesmanChange}
            notesChange={::this.notesChange}
            lotChange={::this.lotChange}
            cancel={::this.renderCancel} />
         : null}
        </div>
    )
  }
}

//<MapComp data={this.state.loc} geoloc={this.props.geoloc}/>

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchGeoloc, getJobs, pushJob, getAddress }, dispatch);
}

function mapStateToProps(state){
  return {
    geoloc: state.geoloc,
    geoCode: state.geoCode,
    geoAddress: state.geoAddress
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
