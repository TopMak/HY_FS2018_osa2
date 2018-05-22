import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
import Yhteensa from './Yhteensa'


const Kurssi = ({kurssi}) => {

  return (
    <div>
    <Otsikko kurssi={kurssi.nimi} />
    <Sisalto osat={kurssi.osat}  />
    <Yhteensa osat={kurssi.osat} />
    </div>
  )
}



export default Kurssi
