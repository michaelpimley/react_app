import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import ModalLine from './component_modal_lines';
import ModalOption from './component_modal_option';

class ModalField extends Component {
  componentWillReceiveProps(newProps){
    //console.log(newProps.modValues);
  }
  render() {
    const data = this.props.data;
    const func = this.props;
    const def = this.props.modValues;
    return (
      <Modal show={func.modal} onHide={func.cancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <center>Marker Creation</center>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <ModalLine
              placeholder="Address"
              value={def.address}
              func={func.addressChange} />
            <ModalLine
              placeholder="Builder"
              value={def.builder}
              func={func.builderChange} />
            <ModalLine
              placeholder="Subdivision"
              value={def.subdivision}
              func={func.subdivisionChange} />
            <ModalLine
              placeholder="Lot"
              value={def.lot}
              func={func.lotChange} />
            <ModalOption
              label="sales-select"
              func={func.salesmanChange}
              data={func.sales} />
            <fieldset className="form-group">
              <textarea
                className="form-control"
                placeholder="Notes"
                rows='3'
                defaultValue={def.notes}
                onChange={func.notesChange} />
            </fieldset>
          </form>
          <center>
            <button type="button" className="btn btn-primary" onClick={func.submit}>Save</button>
            <button type="button" className="btn btn-danger" onClick={func.cancel}>Cancel</button>
          </center>
        </Modal.Body>
      </Modal>
    )
  }
}

export default ModalField;
