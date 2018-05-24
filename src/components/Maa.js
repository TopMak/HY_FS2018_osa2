import React from 'react';
import '../App.css';


const Maa = ({maa}) => {

//Vain yksi jäljellä

return (
  <div>
    <h2>{maa.name}</h2>
    <table className="taulu">
      <tbody>
        <tr><td>Maanosa: </td><td>{maa.region}</td></tr>
        <tr><td>Pinta-ala: </td><td>{maa.area} km<sup>2</sup></td></tr>
        <tr><td>Asukasluku: </td><td>{maa.population}</td></tr>
        <tr><td>Pääkaupunki: </td><td>{maa.capital}</td></tr>
        <tr><td>Valuutta: </td><td>{maa.currencies[0].code}</td></tr>
    </tbody>
  </table>
    <img src={maa.flag} alt="no can do :(" className="flag"/>
  </div>
)

}

export default Maa
