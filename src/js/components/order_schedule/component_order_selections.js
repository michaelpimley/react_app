import React from 'react';

export default (props) => {
  return (
    <div className={props.colSize} key={props.title}>
      <center>
        <b>{props.title}</b>{props.data}
      </center>
    </div>
  );
}
