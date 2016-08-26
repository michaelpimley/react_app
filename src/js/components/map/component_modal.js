import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
//this.props.data[0].lat/lng
class MapModal extends Component {
  constructor(props){
    super(props);
    const data = this.props.info[0].address_components;
    const loc = this.props.info[0].geometry.location;
    var address = [];
    if(data[0].types[0] == 'route'){
      address.push({ address: data[0].long_name, city: data[1].long_name, county: data[2].long_name,
      state: data[3].short_name, country: data[4].short_name, zip: data[5].long_name, lat: loc.lat, lng: loc.lng});
    } else {
      address.push({ address: data[0].long_name + ' ' + data[1].long_name, city: data[2].long_name,
      county: data[3].long_name, state: data[4].short_name, country: data[5].short_name, zip: data[6].long_name,
      lat: loc.lat, lng: loc.lng});
    }
    this.state={
      address: '', builder: '', subdivision: '', lot: '', salesman: '', notes: '',
      addArray: address, loc: loc
    };
    this.addressChange = this.addressChange.bind(this);
    this.builderChange = this.builderChange.bind(this);
    this.subdivisionChange = this.subdivisionChange.bind(this);
    this.salesmanChange = this.salesmanChange.bind(this);
    this.notesChange = this.notesChange.bind(this);
    this.salesmanChange = this.salesmanChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  addressChange(e){
    this.setState({address: e.target.value});
  }
  builderChange(e){
    this.setState({builder: e.target.value});
  }
  subdivisionChange(e){
    this.setState({subdivision: e.target.value});
  }
  salesmanChange(e){
    console.log(e.target.value);
    this.setState({salesman: e.target.value});
  }
  notesChange(e){
    this.setState({notes: e.target.value});
  }
  submitForm(){
    const data = this.state.addArray[0];
    var temp = [];
    temp.push({address: data.address, city: data.city, county: data.county, state: data.state,
      country: data.country, zip: data.zip, lat: data.lat, lng: data.lng, salesman: this.state.salesman,
      builder: this.state.builder, subdivision: this.state.subdivision, lot: this.state.lot,
      notes: this.state.notes});
    console.log(temp);
    this.props.save;
  }
  render() {
    const data = this.state.addArray;
    return (
      <Modal show={this.props.modal} onHide={this.props.cancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <center>Marker Creation</center>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <fieldset className="form-group">
              <input type="text" className="form-control" placeholder="Address"
              defaultValue={data[0].address}/>
            </fieldset>
            <fieldset className="form-group">
              <input type="text" className="form-control" placeholder="Builder" defaultValue={this.state.address}/>
            </fieldset>
            <fieldset className="form-group">
              <input type="text" className="form-control" placeholder="Subdivision" defaultValue={this.state.address}/>
            </fieldset>
            <fieldset className="form-group">
              <input type="text" className="form-control" placeholder="Lot" defaultValue={this.state.address}/>
            </fieldset>
            <fieldset className="form-group">
              <label for="#sales-select">Salesman</label>
              <select className="form-control" id="sales-select" onChange={this.salesmanChange}>
                {this.props.sales.map(sales => {
                  return (
                    <option key={sales}>{sales}</option>
                  )
                })}
              </select>
            </fieldset>
            <fieldset className="form-group">
              <textarea className="form-control" placeholder="Notes" rows='3' defaultValue={this.state.address} />
            </fieldset>
          </form>
          <center>
            <button type="button" className="btn btn-primary" onClick={this.submitForm}>Save</button>
            <button type="button" className="btn btn-danger" onClick={this.props.cancel}>Cancel</button>
          </center>
        </Modal.Body>
      </Modal>
    )
  }
}

export default MapModal;
