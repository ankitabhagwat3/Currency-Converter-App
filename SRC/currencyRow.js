import React from 'react'

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props
  return (
    <div>
      <label for="formSelect">Currency</label>
      <select id="formSelect" value={selectedCurrency} onChange={onChangeCurrency} className="input">
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <label for="formInput">Enter Amount</label>
      <input id="formInput" type="number" className="input" value={amount} onChange={onChangeAmount} />
    
    </div>
  )
}
