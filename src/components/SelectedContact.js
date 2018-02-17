import React from 'react';

const SelectedContact = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{props.name}</h2>
      <h1>{props.address}</h1>
    </div>
  );
}

export default SelectedContact;