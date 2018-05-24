import React from 'react';
import '../App.css';

import Maa from './Maa'

const Maat = ({countries, suodatin}) => {

const maita = countries.filter(maa => maa.name.toLowerCase().includes(suodatin))

if(maita.length === 1){

  return (
    <table className="taulu">
      <tbody>
        {maita.map(maa => <tr key={maa.name}><td>{maa.name}</td></tr>)}
      </tbody>
    </table>
  )
} else if(maita.length <= 10){
  return (
    <table className="taulu">
      <tbody>
        {maita.map(maa => <tr key={maa.name}><td>{maa.name}</td></tr>)

          /*
          maita.map(maa => <tr key={maa.name}><td>{maa.name}</td></tr>)
            countries
            .filter(henkilo => henkilo.name.toLowerCase().includes(suodatin))
            //.map(henkilo => <tr key={henkilo.name}><td>{henkilo.name}</td><td>{henkilo.number}</td></tr>)
            .map(henkilo => <Yhteystieto key={henkilo.name} name={henkilo.name} number={henkilo.number}/>)
            */

        }
      </tbody>
    </table>
  )

} else{
  console.log(maita)
  return (
    <p> Liikaa maita ({maita.length}), muuta hakuehtoja. </p>

  )

}




}

export default Maat