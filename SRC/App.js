import React, { useEffect, useState } from 'react';
import currency from './currency';
import $ from 'jquery'
import './App.css';
import CurrencyRow from './currencyRow'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
        //console.log(data.rates[firstCurrency)
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  
  $(".ratesPage").hide();

  $(".headerLink1").click(function(){
    $(".converterPage").show();
    $(".ratesPage").hide();
  });
  $(".headerLink2").click(function(){
    $(".converterPage").hide();
    $(".ratesPage").show();
  });
  

  $(".headerLink").click(function(){
    $(".headerLink").removeClass('active');
    $(this).addClass('active');
  });


  return (
    <>
          
          
         
    <div className="headerBar">

    <div> 
        <Router  id="something">
          <div >
           
                <div class="headerLink1 headerLink active"><Link to="/" >CURRENCY CONVERTER</Link></div>

              
                <div class="headerLink2 headerLink"> <Link to="/about">CURRENT EXCHANGE RATES</Link></div>
    
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

    </div>

<div class="converterPage">

      <h1 class="header">Currency Converter</h1>
      <p class="currencyPara">Please enter the amount you want to convert in any field.</p>
<div class="currencyBox1">
  <p class=""></p>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      
      
</div>
<div class="currencyBox2">
  <p class=""></p>
      
     
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
</div>
</div>

    </>
  );
}

function Home() {
  return (
    <div>
      
    </div>
  );
}

let conversions = [];
async function request() {
  const response = await fetch(BASE_URL+"?base=USD");
  const json = await response.json();
  console.log(json);
  conversions = json.rates;
}

function DisplayAllRate() {

  request();

  console.log(conversions.EUR);
  const result = currency.map(item => (<tr key={item.name}>
    <td>{item.code}</td>
    <td>{item.name}</td>
    <td>{conversions[item.code]}</td>
  </tr>))
  return (
    <div class="ratesPage">
    <div>
      <h1 class="RateHead">US Dollar(USD) Exchange Rates</h1>
      <table class="RateTable">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Currency Name</th>
            <th>Exchange Rate = 1 USD</th>
          </tr>
        </thead>
        <tbody>
          {result}
        </tbody>
      </table>
    </div>
    </div>
  );
}
export default App;
