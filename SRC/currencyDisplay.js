import React, { Component } from 'react';
import Currency from './currency'
import currency from './Greet'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <div>
           
                <Link to="/" > <button>Previous Page</button></Link>
              
                <Link to="/about">  <button>Next Page</button></Link>
    
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <DisplayAllRate />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function DisplayAllRate() {

  const result = currency.map(item => (<tr key={item.name}>
    <td>{item.code}</td>
    <td>{item.name}</td>
    <td />
  </tr>))
  return (
    <div className="table">
      <h1 className="us">US Doller(USD) Exchange Rates</h1>
      <table>
        <thead>
          <tr className="title">
            <th> Currency</th>
            <th>Currency Name</th>
            <th>Exchange Rate = 1 USD</th>
          </tr>
        </thead>
        <tbody>

          {result}
        </tbody>
      </table>
    </div>
  );
}
export default App;