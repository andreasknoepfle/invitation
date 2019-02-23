import React, { Component } from 'react';
import queryString from 'query-string'
import logo from './logo.svg';
import './App.css';
import FoodRadio from './FoodRadio';
import 'whatwg-fetch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  initFood() {
    fetch(`https://wt-9933bad0e1d0fa1a4419e30b982036ad-0.sandbox.auth0-extend.com/airtable-get?key=${this.key()}`)
      .then(response => response.json())
      .then(({ food, firstName }) => this.setState({ food, firstName, loaded: true }) )
  }

  onChangeFood({ target }) {
    this.setState({ food: target.value }, () => this.submit());
  }

  submit() {
    fetch(`https://wt-9933bad0e1d0fa1a4419e30b982036ad-0.sandbox.auth0-extend.com/airtable-hook?key=${this.key()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ food: this.state.food })
    });
  }

  componentDidMount() {
    this.initFood();
  }

  key() {
    return queryString.parse(window.location.search).key;
  }

  render() {
    return (
      <div className="App">
        <main className="App-main">
          {!this.state.loaded && <FontAwesomeIcon icon={faSpinner} spin size="2x"/>}
          {this.state.loaded && <div>
            <h1>Hallo {this.state.firstName}</h1>
            <img src={logo} className="App-logo" alt="logo" />
            <form>
              Was möchtest du essen?
              <br />
              <FoodRadio
                label="Vegetarisch"
                disabled={!this.state.loaded}
                checked={this.state.food === "Vegetarisch"}
                onChange={this.onChangeFood.bind(this)}
              />
              <FoodRadio
                label="Vegan"
                disabled={!this.state.loaded}
                checked={this.state.food === "Vegan"}
                onChange={this.onChangeFood.bind(this)}
              />
              <FoodRadio
                label="Alles"
                disabled={!this.state.loaded}
                checked={this.state.food === "Alles"}
                onChange={this.onChangeFood.bind(this)}
              />
            </form>
          </div>}
        </main>
      </div>
    );
  }
}

export default App;
