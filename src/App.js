import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
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
        name: this.state.newName
      }

      const uusiPersons = this.state.persons.concat(uusiPerson)
      //console.log(uusiPersons)
      this.setState({
        persons: uusiPersons,
        newName: ''
      })

    } else{
      alert("Nimi löytyy tai on tyhjä!")

    }
  }

  asetaNewName = (event) => {
    //console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.lisaaNimi}>
          <div>
            nimi: <input
            value={this.state.newName}
            onChange={this.asetaNewName}
            placeholder='Lisaa nimi...'
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          {this.state.persons.map( henkilo => <li key={henkilo.name}>{henkilo.name}</li>)}
      </div>
    )
  }
}

export default App
