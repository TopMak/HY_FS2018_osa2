import React from 'react'
import Osa from './Osa'

//Huomaa, keytä ei tarvitse merkata osassa (vai pitäiskö? hmm)
const Sisalto = ({osat}) => {
  return (
    <div>
    {osat.map(osa => <Osa key={osa.id} sis={osa.nimi} teht={osa.tehtavia} /> )}
    </div>
  )
}


export default Sisalto
