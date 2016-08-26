import React, { Component } from 'react';

import { GoogleMapLoader, GoogleMap, Marker, InfoWindow, SearchBox } from 'react-google-maps';

class MapRender extends Component {
  static inputStyle = {
    "border": `1px solid transparent`,
    "borderRadius": `1px`,
    "boxShadow": `0 2px 6px rgba(0, 0, 0, 0.3)`,
    "boxSizing": `border-box`,
    "MozBoxSizing": `border-box`,
    "fontSize": `14px`,
    "height": `32px`,
    "marginTop": `10px`,
    "outline": `none`,
    "padding": `0 12px`,
    "textOverflow": `ellipses`,
    "width": `400px`,
  }
  handleZoom(){
    var zoom = this.refs.map.getZoom();
    this.props.handleZoom(zoom);
  }
  handlePlacesChanged() {
    const places = this.refs.searchbox.getPlaces();
    const address = places[0].name;
    const lat = places[0].geometry.location.lat();
    const lng = places[0].geometry.location.lng();
    this.props.search(lat, lng, address);
  }
  //WORKING ON IDEA SO WHEN YOU CLICK THE 'EDIT' LINK/BUTTON YOU ARE ABLE TO MOVE THE
  //PART TO WHEREVER YOU CLICK NEXT. THEN A MODAL DROPS DOWN AND ASKS IF YOU ARE SURE
  handleClick(e, index, marker){
    console.log(e);
    console.log(index);
    console.log(marker);
    console.log('bruh got clicked for edit');
  }
  renderInfoWindow(index, marker) {
    //console.log(marker);
    return (
      <InfoWindow
        key={`${index}_info_window`}
        onCloseclick={this.props.markerClose.bind(this, marker, index)}>
        <center>
          <h5>{marker.Address}</h5>
          <p>{marker.City} {marker.state}</p>
          <p>{marker.salesPerson}</p>
          <button className="btn btn-primary" onClick={::this.handleClick.bind(this,marker,index)}>
            Edit
          </button>
        </center>
      </InfoWindow>
    )
  }
  render () {
    const info = this.props;
    return (
      <GoogleMapLoader
        containerElement={ <div style={{height: '100%'}} /> }
        googleMapElement={
          <GoogleMap
            ref='map'
            zoom={this.props.zoom}
            onZoomChanged={::this.handleZoom}
            center={{lat: info.start[0].lat, lng: info.start[0].lng}}
            onClick={this.props.mapClick}>
            <SearchBox
              controlPosition={google.maps.ControlPosition.TOP_LEFT}
              style={MapRender.inputStyle}
              placeholder="Address"
              ref="searchbox"
              onPlacesChanged={::this.handlePlacesChanged}/>
            {info.marker.map((marker, index) => {
              var that = this;
              return (
                <Marker
                  key={index}
                  title={marker.Address}
                  position={marker.position}
                  onClick={this.props.markerClick.bind(that, marker, index)}>
                  {this.props.open.indexOf(index) > -1 ? this.renderInfoWindow(index, marker) : null}
                </Marker>
              );
            })}
          </GoogleMap>
        }
      />
    )
  }
}

export default MapRender;
