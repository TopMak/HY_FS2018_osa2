import React from 'react';

//Omat
import Luettelo from './components/Luettelo'
import UusiYhteys from './components/UusiYhteys'
import Suodatin from './components/Suodatin'
import Notification from './components/Notification'
import numbersService from './services/numbersService'
import './index.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      suodatin: '',
      notification: {message: null, style: null}
    }
  }

  componentDidMount(){
    numbersService
      .getAllPersons()
      .then(allPersons => {
         //console.log('promise fulfilled')
         this.setState({persons: allPersons})
        })
      .catch(error => alert('Ei yhteyttä palvelimelle!'))
  }

  //https://reactjs.org/docs/forms.html
  lisaaTieto = (event) => {
    event.preventDefault()
    //Find palauttaa undefined, jos ei löydy --> huono perhaps? Some-metodi palauttaisi boolean.
    //Toisaalta find palauttaa henkilön, jota voidaan sitten hyödyntää...
    let henkilo = this.state.persons.find(nimi => this.state.newName === nimi.name)
    let eiTyhjaNimi = (this.state.newName !== "")

    if((henkilo === undefined) && eiTyhjaNimi){

    console.log("Uusi henkilö", henkilo)
      const uusiPerson = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      //console.log(uusiPersons)
      numbersService
        .createPerson(uusiPerson)
        .then(response => {
          console.log(response)
          this.setState({
            persons: this.state.persons.concat(response),
            newName: '',
            newNumber: '',
            notification: {message: "Henkilö lisätty onnistuneesti!", style: "notification-success"}
          })
          this.notificationTimeout(5000)
        })
      /*--- Henkilön päivitys ---*/
    } else if ((henkilo !== undefined) && this.state.newNumber !== "" ) {
    //else if (!eiArrayssa && this.state.newNumber !== "" ) {

      if(window.confirm("Korvataanko " + henkilo.name + " numero " + henkilo.number + " uudella numerolla " + this.state.newNumber + " ?")){
        console.log("Numeron korvaus")
        const muutettuTieto = {...henkilo, number: this.state.newNumber }
        numbersService
          .updatePerson(henkilo.id, muutettuTieto)
          .then(updatedHenkilo =>{
            //console.log(tieto)
            const personsCopy = this.state.persons.filter(n => n.id !== updatedHenkilo.id)
            //console.log(updatedPersons)
            this.setState({
              persons: personsCopy.concat(updatedHenkilo),
              newName: '',
              newNumber: '',
              notification: {message: "Numero muutettu onnistuneesti!", style: "notification-success"}
            })
            this.notificationTimeout(5000)
          })
          /*--- Henkilö poistettu muualla virhe, luodaan uudestaan ---*/
          .catch(error => {
            //console.log(error);
            if(window.confirm("Henkilö on jo poistettu luettelosta! Haluatko lisätä " + muutettuTieto.name + " uudelleen?")){
              console.log("Lisää uudelleen");
              numbersService
                .createPerson(muutettuTieto)
                .then(takaisinLisays => {
                  //console.log(takaisinLisays)
                  const personsCopy = this.state.persons.filter(n => n.id !== takaisinLisays.id)
                  this.setState({
                    persons: personsCopy.concat(takaisinLisays),
                    newName: '',
                    newNumber: '',
                    notification: {message: "Henkilö lisätty takaisin onnistuneesti!", style: "notification-success"}
                  })
                  this.notificationTimeout(5000)
                })
            } else { //Ei lisätä takaisin, mutta poistetaan nimi listalta
                console.log("Uudelleen lisäys peruttu");
                const personsCopy = this.state.persons.filter(n => n.id !== henkilo.id)
                //console.log(personsCopy);
                this.setState({
                  persons: personsCopy,
                  //Jätetään newName ja newNumber samoiksi -> mahdollista lisätä vielä helposti
                  notification: {message: "Henkilöä ei lisätty!", style: "notification-error"}
                })
                this.notificationTimeout(5000)
            }

          })
      }

    } else {
      alert("Sinulla on tyhjiä kenttiä!")
    }
  }

notificationTimeout(sec){
  setTimeout((sec) => {
    console.log("timeout");
    this.setState({notification: {message: null, style: null}})
    }, sec)
}

  asetaNewName = (event) => {
    //console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  asetaNewNumber = (event) => {
    //console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  asetaSuodatin = (event) => {
    //Suodatin myös lowerCase
    //console.log(event.target.value.toLowerCase())
    this.setState({ suodatin: event.target.value.toLowerCase() })
  }

  poistaYhteystieto = (id) => {
    return () => {
      console.log('klikattu ' + id)
      if(window.confirm("Varmista " + this.state.persons.find(n => n.id === id).name + " poistaminen")){
        numbersService
          .deletePerson(id)
          .then(response => {
            //console.log(response);

            this.setState({
              persons: this.state.persons.filter(n => n.id !== id),
              notification: {message: "Yhteystieto poistettu onnistuneesti!", style: "notification-success"}
            })
          })
          .catch(error => alert('Yhteystieto on jo poistettu!'))
          this.notificationTimeout(5000)
          //console.log('Poistettu ' + id)

      } else {
        console.log("Poisto peruutettu")
        }
      }
  }

  render() {
    return (
      <div>
        <div className="container">
          <h2>Puhelinluettelo</h2>
            <Suodatin suodatin={this.asetaSuodatin} />
            <h3>Lisää uusi yhteystieto</h3>
            <Notification message={this.state.notification.message} style={this.state.notification.style} />
            <UusiYhteys
              state={this.state} newName={this.asetaNewName}
              newNumber={this.asetaNewNumber} lisaatieto={this.lisaaTieto} />
          <h2>Numerot</h2>
          <Luettelo persons={this.state.persons} suodatin={this.state.suodatin} poista={this.poistaYhteystieto} />
      </div>
      </div>
    )
  }
}

export default App
