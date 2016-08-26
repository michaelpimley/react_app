import React from 'react';

export default (props) => {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-block">
          <strong>
            <p className="card-text card-underline">{props.title}</p>
            <p className="card-text">{props.data}</p>
          </strong>
        </div>
      </div>
    </div>
  );
}
