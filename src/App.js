import React, { Component } from 'react';
import queryString from 'query-string'
import heart from './heart.png';
import './loading.css';
import './App.css';
import Invitation from './Invitation';
import Comes from './Comes';
import Eats from './Eats';
import Map from './Map';
import 'whatwg-fetch'

const dear = (gender, firstName) => `Liebe${gender === "Mann" ? "r" : ""} ${firstName}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      key: queryString.parse(window.location.search).key,
    };
  }

  wordingInvite() {
    return this.state.partner ? 'Euch' : 'Dich';
  }

  wording(name) {
    return this.state.partner ? name : null;
  }

  fetchRecord(key) {
    return fetch(`https://wt-9933bad0e1d0fa1a4419e30b982036ad-0.sandbox.auth0-extend.com/airtable-get?key=${key}`)
      .then(response => response.json())
  }

  componentDidMount() {
    this.fetchRecord(this.state.key)
      .then(({ food, firstName, gender, partner, comes}) => {
        this.setState({ food, firstName, gender, partner, comes, loaded: !partner });
        if(partner) {
          this.fetchPartner(partner);
        }
      })
  }

  fetchPartner(partner) {
    this.fetchRecord(partner)
      .then(({ food, firstName, gender, comes }) =>
        this.setState({ partnerFood: food,
                        partnerFirstName: firstName,
                        partnerGender: gender,
                        partnerComes: comes,
                        loaded: true }));
  }

  onChangeFood({ target }) {
    this.setState({ food: target.value }, () => this.submit());
  }

  onChangeComes({ target }) {
    this.setState({ comes: target.value }, () => this.submit());
  }

  onChangePartnerFood({ target }) {
    this.setState({ partnerFood: target.value }, () => this.submitPartner());
  }

  onChangePartnerComes({ target }) {
    this.setState({ partnerComes: target.value }, () => this.submitPartner());
  }

  submit() {
    this.submitRecord(this.state.key, {
      food: this.state.food,
      comes: this.state.comes,
    });
  }

  submitPartner() {
    this.submitRecord(this.state.partner, {
      food: this.state.partnerFood,
      comes: this.state.partnerComes,
    });
  }

  submitRecord(key, body) {
    fetch(`https://wt-9933bad0e1d0fa1a4419e30b982036ad-0.sandbox.auth0-extend.com/airtable-hook?key=${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  render() {
    return (
      <div className="App">
        <main className="container App-main">
          <header>
            <img src={heart} className="App-logo" alt="logo" />
            <br/>
            {!this.state.loaded &&
              <div className="lds-heart"><div></div></div>
            }
          </header>
          {this.state.loaded &&
           <div>
              <div className="Greeting">
                <h1>{dear(this.state.gender, this.state.firstName)}{this.state.partner && ", " + dear(this.state.partnerGender, this.state.partnerFirstName)}</h1>
                <p>Wir möchten {this.wordingInvite()} ganz herzlich zu unserer Hochzeit einladen.</p>
              </div>
              <Invitation />
              <div className="row">
                <div className="column column-50">
                  Can come icon
                </div>
                <div className="column column-50">
                  <Comes
                    comes={this.state.comes}
                    name={this.wording(this.state.firstName)}
                    onChange={this.onChangeComes.bind(this)}
                  />
                  { this.state.partner &&
                    <Comes
                      comes={this.state.partnerComes}
                      name={this.state.partnerFirstName}
                    onChange={this.onChangePartnerComes.bind(this)}
                    />}
                </div>
              </div>
              <div className="row">
                <div className="column column-50">
                  Happa
                </div>
                <div className="column column-50">
                  { this.state.comes === "Ja" && <Eats
                    value={this.state.food}
                    name={this.wording(this.state.firstName)}
                    onChange={this.onChangeFood.bind(this)}
                  />}
                  { this.state.partner && this.state.partnerComes === "Ja" &&
                    <Eats
                      value={this.state.partnerFood}
                      name={this.state.partnerFirstName}
                      onChange={this.onChangePartnerFood.bind(this)}
                    />
                  }
                </div>
              </div>
              <div className="row">
                <div className="column column-50">
                  Schlaf icon
                </div>
                <div className="column column-50 Sleeping">
                  <h2>Übernachtung</h2>
                  <b>Direkt im Waldparadies:</b>
                  <ul>
                    <li>Zelt <br/><small>(Platz für 10 Zelte)</small></li>
                    <li>Yogaraum über der Scheune <br /><small>(Platz für 10 Menschen)</small></li>
                    <li>Hanging-Tent im Wald <br/><small>(ca 5 Zelte verfügbar, wird vom Waldparadies gestellt)</small></li>
                  </ul>
                  <b>5 Minuten zu Fuß:</b>
                  <ul>
                    <li>Fliegerheim <br/><small>(über den Namen Gentner 20 Zimmer abrufbar)</small></li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="column column-50">
                  Road icon
                </div>
                <div className="column column-50 Sleeping">
                  <h2>Location & Anfahrt</h2>
                  <a href="https://www.waldparadies-borkheide.de/">Website vom Waldparadies</a>
                  <pre>
                    Paradiesweg 3<br/>
                    14822 Borkheide
                  </pre>
                  <p>Für die Anfahrt mit dem Zug ist der Bahnhof Borkheide direkt nebenan.</p>
                  <Map />
                </div>
              </div>
            <p>Wir freuen uns unglaublich darauf mit Euch allen kräftig zu feiern!</p>
            </div>
          }
        </main>
        <footer className="container Footer">
          <div className="Footer-signature">Andreas & Daniela</div>
        </footer>
      </div>
    );
  }
}

export default App;
// <a href="https://www.freeiconspng.com/img/38782">Hd Heart Image In Our System</a>
