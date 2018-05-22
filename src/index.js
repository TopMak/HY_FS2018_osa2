import React from 'react'
import ReactDOM from 'react-dom'

 const Otsikko = (props) => {
   return (
      <h1>{props.kurssi}</h1>
   )
 }

const Osa = (props) =>{
  return(
    <div>
    <p>{props.sis} {props.teht}</p>
    </div>
   )
 }

const Sisalto = (props) => {
  return (
    <div>
    <Osa sis={props.osat[0].nimi} teht={props.osat[0].tehtavia} />
    <Osa sis={props.osat[1].nimi} teht={props.osat[1].tehtavia} />
    <Osa sis={props.osat[2].nimi} teht={props.osat[2].tehtavia} />
    </div>
  )
}

const Yhteensa = (props) => {
   return (
    <p>yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} tehtävää</p>
   )
 }

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
   }

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat}  />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
 }

ReactDOM.render(
  <App />,
   document.getElementById('root')
 )
