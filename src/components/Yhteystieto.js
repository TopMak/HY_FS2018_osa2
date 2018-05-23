import React from 'react';
import '../app.css';

const Yhteystieto = ({name, number}) => {
  return (
    <tr><td>{name}</td><td>{number}</td></tr>
  )
}

export default Yhteystieto
