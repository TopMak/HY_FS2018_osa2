import React from 'react';
import '../app.css';

const UusiYhteys = ({state, newName, newNumber, lisaatieto}) => {
  return (
    <form className="form" onSubmit={lisaatieto}>
      <label className="labels">Nimi</label>
        <input
        value={state.newName}
        onChange={newName}
        placeholder='Lisaa nimi...'
        />
      <label className="labels">Numero</label>
        <input
        value={state.newNumber}
        onChange={newNumber}
        placeholder='Lisaa numero...'
        />
        <p></p>
      <button type="submit">lisää</button>
    </form>
  )
}

export default UusiYhteys
