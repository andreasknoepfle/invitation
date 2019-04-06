import React, { Component } from 'react';
import queryString from 'query-string'
import banner from './banner.png';
import heart from './heart-small.png';
import sleep from './sleep.png';
import food from './food.png';
import drive from './drive.png';
import coming from './coming.png';
import './loading.css';
import './App.css';
import Invitation from './Invitation';
import Comes from './Comes';
import Eats from './Eats';
import Map from './Map';
import 'whatwg-fetch'
import debounce from 'lodash.debounce';

const dear = (gender, firstName) => `Liebe${gender === "Mann" ? "r" : ""} ${firstName}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      key: queryString.parse(window.location.search).key,
    };
    this.debouncedSubmit = debounce(this.submit.bind(this), 500)
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
      .then(({ food, firstName, gender, partner, comes, extra}) => {
        this.setState({ food, firstName, gender, partner, extra, comes, loaded: !partner });
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

  onChangeExtra({ target }) {
    console.log(target.value);
    this.setState({ extra: target.value }, () => this.debouncedSubmit());
  }

  submit() {
    this.submitRecord(this.state.key, {
      food: this.state.food,
      comes: this.state.comes,
      extra: this.state.extra,
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
        <img src={banner} className="App-logo" alt="logo" />
        <main className="container App-main">
          <header>
            <br/>
            {!this.state.loaded &&
             <div className="lds-heart"><div></div></div>
            }
          </header>
          {this.state.loaded &&
           <div>
             <div className="Greeting">
               <h1>{dear(this.state.gender, this.state.firstName)}{this.state.partner && ", " + dear(this.state.partnerGender, this.state.partnerFirstName)}</h1>
               <p>Wir möchten {this.wordingInvite()} ganz herzlich zu unserer <span class="wedding">Hochzeit</span> einladen.</p>
             </div>
             <Invitation />
             <div className="row">
               <div className="column column-50 iconContainer">
                 <img src={coming} alt="coming" className="icon" />
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
             { (this.state.comes === "Ja" || this.state.partnerComes === "Ja" ) &&
               <div className="row">
                 <div className="column column-50 iconContainer">
                   <img src={food} alt="coming" className="icon"/>
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
                   <h2>M&uuml;ssen wir sonst noch etwas wissen?</h2>
                   <textarea onChange={this.onChangeExtra.bind(this)} placeholder="Allergien oder so?" className="extra">
                     {this.state.extra}
                   </textarea>
                 </div>
               </div>
             }
             <div className="row">
               <div className="column column-50 iconContainer">
                 <img src={sleep} alt="sleep" className="icon"/>
               </div>
               <div className="column column-50 Sleeping">
                 <h2>Übernachtung</h2>
                 <b>Direkt im Waldparadies:</b>
                 <ul>
                   <li>Eigenes Zelt <br/><small>10&euro; pro Person, Platz für ca. 8 Zelte</small></li>
                   <li>Yogaraum über der Scheune <br /><small>25&euro; pro Person, Platz für 10 Personen</small></li>
                   <li>Hanging-Tent im Wald <br/><small>59-75&euro; insgesamt 6 Zelte verfügbar f&uuml;r 2 oder 3 Personen, wird vom Waldparadies gestellt</small></li>
                 </ul>
                 <p>Alles &uuml;ber <a href="mailto:waldparadies@online.de">waldparadies@online.de</a> buchbar.</p><br/>
                 <b>5 Minuten zu Fuß:</b>
                 <ul>
                   <li><a href="http://www.fliegerheim.de">Fliegerheim</a><br/><small>über den Namen Kn&ouml;pfle sind 20 Zimmer abrufbar<br/> Doppelzimmer 110&euro; oder Einzelzimmer 85&euro;<br/> Zimmer sind reserviert bis zum 15.07.2019</small></li>
                 </ul>
                 <b>In Borkheide (15 Minuten und mehr)</b>
                 <ul>
                   <li><a href="http://www.kieltyka.de">Hotel Kieltyka</a><br/>
                     <small>ca 50&euro; pro Person</small>
                   </li>
                   <li>Verschiedene Ferienwohnungen<br/>
                     <small>Einfach mal <a href="http://www.ferienwohnungen.de/europa/deutschland/borkheide">hier</a> oder auf Airbnb schauen.</small>
                   </li>
                 </ul>
               </div>
             </div>
             <Map />
             <div className="row">
               <div className="column column-50 iconContainer">
                 <img src={drive} alt="drive" className="icon"/>
               </div>
               <div className="column column-50 Sleeping">
                 <h2>Location & Anfahrt</h2>
                 Die Adresse vom <a href="https://www.waldparadies-borkheide.de/">Waldparadies Borkheide</a> ist:
                 <pre>
                   Paradiesweg 3<br/>
                   14822 Borkheide
                 </pre>
                 <p>Für die Anfahrt mit dem Zug ist der Bahnhof Borkheide direkt nebenan.</p>
               </div>
             </div>
             <div className="row">
               <div className="column">
                <h2>FAQ</h2>
                <ul>
                  <li>Ich m&ouml;chte Euch einen &Uuml;berraschungselefanten vorbeibringen. <br/>Wann kann er kommen?<br/>
                    <small>Unsere zwei Trauzeuginnen/Schwestern k&ouml;nnt ihr in solchen F&auml;llen gerne unter <a href="mailto:gentner.kathrin@gmail.com">gentner.kathrin@gmail.com</a> oder <a href="mailto:miriam.knoepfle@gmail.com">miriam.knoepfle@gmail.com</a> kontaktieren.</small>
                  </li>
                  <li>Hilfe, was kann ich anziehen?<br/>
                    <small>Komm am besten so wie ihr Euch wohlf&uuml;hlt. Da unsere Zeremonie im Wald hinter dem Haus stattfinden wird empfehlen wir euch bequeme gartentaugliche Schuhe (sind auch besser zum tanzen).</small>
                  </li>
                  <li>Ich m&ouml;chte Euch was schenken, ich wei&szlig; aber nicht was.<br/><small>Knete geht immer.</small></li>
                  <li>Ich m&ouml;chte gerne mit meiner Kutsche kommen. Wo kann ich sie parken?<br/><small>Am Bahnhof von Borkheide gibt es ausreichen Parkpl&auml;tze.</small></li>
                </ul>
               </div>
             </div>
           </div>
          }
        </main>
        {this.state.loaded &&
         <footer className="container Footer">
           <p>Wir freuen uns unglaublich darauf mit Euch allen kräftig zu feiern!</p>
           <img src={heart} alt="coming" className="heart" />
           <span className="Footer-signature">Andreas & Daniela</span>
         </footer>
        }
      </div>
    );
  }
}

export default App;
// <a href="https://www.freeiconspng.com/img/38782">Hd Heart Image In Our System</a>
