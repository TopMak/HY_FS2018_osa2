import React from 'react';
import Yhteystieto from './Yhteystieto'
import '../app.css';

const Luettelo = ({persons, suodatin, poista}) => {
  return (
    <table className="taulu">
      <tbody>
        {persons
          .filter(henkilo => henkilo.name.toLowerCase().includes(suodatin))
          //.map(henkilo => <tr key={henkilo.name}><td>{henkilo.name}</td><td>{henkilo.number}</td></tr>)
          .map(henkilo => <Yhteystieto key={henkilo.id} name={henkilo.name} number={henkilo.number} poista={poista(henkilo.id)}/>)
        }
      </tbody>
    </table>
  )
}

export default Luettelo
