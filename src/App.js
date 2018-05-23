import React from 'react';
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
        { name: 'Meija Meikänen', number:'050-6547851' },
      ],
      newName: '',
      newNumber: ''
    }
  }

  //https://reactjs.org/docs/forms.html
  lisaaNimi = (event) => {
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
        suodatin: ''
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
    console.log(event.target.value)
    this.setState({ suodatin: event.target.value })
  }

  render() {
    return (
      <div className="container">
        <h2>Puhelinluettelo</h2>


        <div>
          <div className="form">
            <label className="labels">Etsi</label>
            <input onChange={this.asetaSuodatin}/>
          </div>
          <h3>Lisää uusi yhteystieto</h3>
          <form className="form" onSubmit={this.lisaaNimi}>
            <label className="labels">Nimi</label>
              <input
              value={this.state.newName}
              onChange={this.asetaNewName}
              placeholder='Lisaa nimi...'
              />
            <label className="labels">Numero</label>
              <input
              value={this.state.newNumber}
              onChange={this.asetaNewNumber}
              placeholder='Lisaa numero...'
              />
              <p></p>
            <button type="submit">lisää</button>
          </form>
        </div>
        <h2>Numerot</h2>
        <table className="taulu">
          <tbody>
            {this.state.persons.map( henkilo => <tr key={henkilo.name}><td>{henkilo.name}</td><td>{henkilo.number}</td></tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
