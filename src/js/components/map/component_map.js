import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox, InfoWindow } from 'react-google-maps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getAddress, createMap } from '../../actions/index';

import ComponentModal from './component_modal';

class MapComp extends Component {
  constructor(props){
    super(props);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.renderSave = this.renderSave.bind(this);
    this.renderCancel = this.renderCancel.bind(this);
    var startLat = this.props.data[0].lat;
    var startLng = this.props.data[0].lng;
    this.state={
      markers: [],
      loc: {lat: startLat, lng: startLng},
      modal: false,
      geoInfo: [],
      sales: []
    };
  }
  componentWillReceiveProps(newProps){
    var temp = [];
    var salesTemp = [];
    if(newProps.geoloc.length > 0){
      newProps.geoloc.forEach(function (resp){
        if(resp.GPSLatitude != null && resp.GPSLongitude != null){
          temp.push({City: resp.City,  County: resp.County, Address: resp.addAddress1,
          state: resp.State, ZipArea: resp.addServiceArea, ZipCode: resp.ZipCode, salesPerson: resp.salesPerson,
          position: {lat: resp.GPSLatitude, lng: resp.GPSLongitude}, showInfo: false});
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
    if(newProps.geoAddress.results){
      this.setState({ geoInfo: newProps.geoAddress.results, modal: !this.state.modal });
    }
    var tempMap = [];
    //console.log(tempMap);
    if(newProps.fullInfo){
      console.log(newProps.fullInfo);
      newProps.fullInfo.forEach(function (resp){
        if(resp.response.results.length > 0){
          //console.log(resp.response);
          var zip = parseInt(resp.query.zip);
          tempMap.push({addID: resp.query.id, address: resp.query.street, city: resp.query.city,
          state: resp.query.state, zipCode: zip, latitude: resp.response.results[0].location.lat,
          longitude: resp.response.results[0].location.lng});
        }
        //console.log(resp.query);
      })
      this.props.createMap(tempMap);
      //console.log(tempMap);
    }
  }
  renderSave(){
    this.setState({modal: !this.state.modal});
  }
  renderCancel(){
    this.setState({modal: !this.state.modal});
  }
  renderModal(data, e){
    this.setState({modal: !this.state.modal, data: data});
  }
  handleMapClick(event) {
    var temp = []
    temp.push({lat: event.latLng.lat(), lng: event.latLng.lng()});
    this.setState({ loc: temp });
    this.props.getAddress(event.latLng.lat(), event.latLng.lng());
  }
  handleMarkerClose(marker, index){
    marker.showInfo = !marker.showInfo;
    this.setState(this.state);
  }
  handleMarkerClick(marker, index, that){
    marker.showInfo = !marker.showInfo;
    this.setState(this.state);
    //console.log(this.state);
    this.setState({loc: {lat: marker.position.lat, lng: marker.position.lng}});
    //this.setState({ this.state.markers[index].showInfo : true})
  }
  renderInfoWindow(index, marker) {
    //console.log(marker);
    return (
      <InfoWindow
        key={`${index}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, marker, index)}>
        <center>
          <h5>{marker.Address}</h5>
          <p>{marker.City}, {marker.state}</p>
          <p>{marker.salesPerson}</p>
        </center>
      </InfoWindow>
    )
  }
  render() {
    //console.log(this.state);
    return (
      <div className="map_container">
        <GoogleMapLoader
          containerElement={ <div style={{height: '100%'}} /> }
          googleMapElement={
            <GoogleMap
              ref='map'
              defaultZoom={12}
              center={{lat: this.state.loc.lat, lng: this.state.loc.lng}}
              onClick={this.handleMapClick}>
              {this.state.markers.map((marker, index) => {
                var that = this;
                return (
                  <Marker
                    key={index}
                    title={marker.Address}
                    position={marker.position}
                    onClick={this.handleMarkerClick.bind(that, marker, index)}>
                  {marker.showInfo == true ? this.renderInfoWindow(index, marker) : null}
                  </Marker>
                );
              })}
            </GoogleMap>
          } />
          {this.state.modal == true ?
            <ComponentModal
              modal={this.state.modal}
              data={this.state.loc}
              save={this.renderSave}
              cancel={this.renderCancel}
              info={this.state.geoInfo}
              sales={this.state.sales} />
           : null}
        </div>
    )
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ getAddress, createMap }, dispatch);
}

function mapStateToProps(state){
  return {
    geoAddress: state.geoAddress,
    fullInfo: state.fullInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComp);
