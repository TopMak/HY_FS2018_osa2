import React from 'react';
import '../App.css';

const Suodatin = ({arvo,suodatin}) => {
  return (
    <div className="form">
      <label className="labels">Etsi nimellä:</label>
      <input value={arvo} onChange={suodatin}/>
    </div>
  )
}

export default Suodatin
