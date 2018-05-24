import React from 'react';
import '../app.css';

const Yhteystieto = ({name, number, poista}) => {
  return (
    <tr><td>{name}</td><td>{number}</td><td><button onClick={poista} className="button">Poista</button> </td></tr>
  )
}

export default Yhteystieto
