import React from 'react';
import Luettelo from './components/Luettelo'
import UusiYhteys from './components/UusiYhteys'
import Suodatin from './components/Suodatin'
//import axios from 'axios'

//Omat
import numbersService from './services/numbersService'
import './app.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      suodatin: ''
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
    //Find palauttaa undefined, jos ei löydy --> vaarallinen perhaps?
    //let ehto = this.state.persons.find(nimi => this.state.newName === nimi.name)
    let eiArrayssa = !(this.state.persons.some(henkilo => this.state.newName === henkilo.name))
    let eiTyhja = (this.state.newName !== "")

    //if((ehto === undefined) && (this.state.newName !== "")){
    if(eiArrayssa && eiTyhja){
      const uusiPerson = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      //const uusiPersons = this.state.persons.concat(uusiPerson)
      //console.log(uusiPersons)
      numbersService
        .createPerson(uusiPerson)
        .then(response => {
          console.log(response)
          this.setState({
            persons: this.state.persons.concat(response),
            newName: '',
            newNumber: '',
          })
        })

    } else{
      alert("Nimi löytyy tai on tyhjä!")
    }
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
            //console.log(response.filter(n => n.id !== id))

            this.setState({
              persons: this.state.persons.filter(n => n.id !== id)
            })
          })
          .catch(error => alert('Yhteystieto on jo poistettu!'))
      console.log('Poistettu ' + id)
      
      } else {
        console.log("Poisto peruutettu")
        }
      }
  }

  render() {
    return (
      <div className="container">
        <h2>Puhelinluettelo</h2>
        <div>
          <Suodatin suodatin={this.asetaSuodatin} />
          <h3>Lisää uusi yhteystieto</h3>
          <UusiYhteys
            state={this.state} newName={this.asetaNewName}
            newNumber={this.asetaNewNumber} lisaatieto={this.lisaaTieto}
            />
        </div>
        <h2>Numerot</h2>
        <Luettelo persons={this.state.persons} suodatin={this.state.suodatin} poista={this.poistaYhteystieto} />
      </div>
    )
  }
}

export default App
