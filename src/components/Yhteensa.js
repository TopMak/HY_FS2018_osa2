import React from 'react'


//Hyödynnetään Array.reduce() funktiota tässä! (halutaan valueiden summa)
const Yhteensa = ({osat}) => {

  //Yksi tapa
  // let yhteensa = osat.reduce(function(summa, osa) {
  //   console.log("hello", summa, osa.tehtavia);
  //   return summa + osa.tehtavia
  // },0)

  //ES6 tapa
  let yhteensa = osat.reduce((summa, osa) => summa + osa.tehtavia, 0)

  return (
    <p>Yhteensä: {yhteensa} </p>


  )
}


export default Yhteensa
