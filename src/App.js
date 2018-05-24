import React from 'react';
import axios from 'axios'
//Omat
import Maat from './components/Maat'
import Suodatin from './components/Suodatin'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      suodatin: ''
    }
  }

  componentDidMount(){
  console.log('will mount')
  //Voidaan ketjuttaa axios kutsu ja tapahtumakuuntelija
  axios.get('https://restcountries.eu/rest/v2/all')
       .then(response => {
    console.log('promise fulfilled')
    this.setState({countries: response.data})
  })
}

  asetaSuodatin = (event) => {
    //Suodatin myös lowerCase
    //console.log(event.target.value.toLowerCase())
    this.setState({ suodatin: event.target.value.toLowerCase() })
  }

  
  klikkaaMaa = (event) => {
    this.setState({ suodatin: event.target.textContent.toLowerCase() })
  }

  render() {
    return (
      <div className="container">
        <h2>Etsi maita</h2>
        <div>
          <Suodatin arvo={this.state.suodatin} suodatin={this.asetaSuodatin} />
        </div>
        <Maat countries={this.state.countries} suodatin={this.state.suodatin} klikkaus={this.klikkaaMaa} />
      </div>
    )
  }
}

export default App
