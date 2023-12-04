// src/Exchange.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const Exchange = () => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedFromCurrency, setSelectedFromCurrency] = useState(null);
  const [selectedToCurrency, setSelectedToCurrency] = useState(null);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    // Fetch currencies from the server
    axios.get('https://server-85io.onrender.com/api/currencies')
      .then(response => {
        const formattedCurrencies = response.data.map(currency => ({ value: currency.name, label: currency.name }));
        setCurrencies(formattedCurrencies);
      })
      .catch(error => console.error(error));
  }, []);

  const handleCurrencyChange = (selectedOption, action) => {
    if (action.name === 'fromCurrency') {
      setSelectedFromCurrency(selectedOption);
    } else if (action.name === 'toCurrency') {
      setSelectedToCurrency(selectedOption);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleExchange = () => {
    if (selectedFromCurrency && selectedToCurrency && amount) {
      // Send a POST request to the server for currency conversion
      axios.post('https://server-85io.onrender.com/api/convert', {
        fromCurrency: selectedFromCurrency.label,
        toCurrency: selectedToCurrency.label,
        amount: amount
      })
        .then(response => setResult(`${amount} ${selectedFromCurrency.label} is ${response.data.result} ${selectedToCurrency.label}`))
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="exchange-form">
      <Select
        className="currency-select"
        options={currencies}
        onChange={(selectedOption) => handleCurrencyChange(selectedOption, { name: 'fromCurrency' })}
        value={selectedFromCurrency}
        placeholder="Select From Currency"
      />
      <Select
        className="currency-select"
        options={currencies}
        onChange={(selectedOption) => handleCurrencyChange(selectedOption, { name: 'toCurrency' })}
        value={selectedToCurrency}
        placeholder="Select To Currency"
      />
      <input type="number" placeholder="Amount" value={amount} onChange={handleAmountChange} />
      <button onClick={handleExchange}>Exchange</button>
      {result && <p className="result">{result}</p>}
    </div>
  );
};

export default Exchange;
