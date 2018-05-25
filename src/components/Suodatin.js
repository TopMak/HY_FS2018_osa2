import React from 'react';
//import '../app.css';

const Suodatin = ({suodatin}) => {
  return (
    <div className="form">
      <label className="labels">Etsi nimellä:</label>
      <input onChange={suodatin}/>
    </div>
  )
}

export default Suodatin
