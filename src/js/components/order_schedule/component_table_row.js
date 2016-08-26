import React from 'react';

export default (props) => {
  var newKey=Math.random();
  return (
    <tr key={newKey}>
      <td>{props.data.checkpointDesc}</td>
      <td>{props.data.deptDueDate.substring(0,10)}</td>
    </tr>
  )
}
