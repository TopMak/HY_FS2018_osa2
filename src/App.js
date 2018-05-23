import React from 'react';
import Luettelo from './components/Luettelo'
import UusiYhteys from './components/UusiYhteys'
import Suodatin from './components/Suodatin'
import './app.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number:'020-1236457' },
        { name: 'Arto Kiuas', number:'020-8549867' },
        { name: 'Tero Esa', number:'010-3256945' },
        { name: 'Tiina Terävä', number:'050-9865478' },
        { name: 'Maija Meikänen', number:'050-6547851' },
      ],
      newName: '',
      newNumber: '',
      suodatin: ''
    }
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

      const uusiPersons = this.state.persons.concat(uusiPerson)
      //console.log(uusiPersons)
      this.setState({
        persons: uusiPersons,
        newName: '',
        newNumber: '',
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
        <Luettelo persons={this.state.persons} suodatin={this.state.suodatin} />
      </div>
    )
  }
}

export default App
