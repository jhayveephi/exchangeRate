import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Currency = (props) => (
  <tr className="d-flex">
    <td className="col-5">{props.name}</td>
    <td className="col-5">{props.rate}</td>
    <td className="col-2" style={{ textAlign: 'right' }}>
      <button onClick={() => props.updateCurrency(props.name)}>Edit</button>
      <button onClick={() => props.deleteCurrency(props.name)}>Delete</button>
    </td>
  </tr>
);

const Read = () => {
  const [currencies, setCurrencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/currencies');
      console.log('Fetched currencies:', response.data);
      const sortedCurrencies = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setCurrencies(sortedCurrencies);
    } catch (error) {
      console.log('Error fetching currencies:', error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const deleteCurrency = async (name) => {
    try {
      await axios.delete(`http://localhost:5000/api/currencies/deleteByName/${name}`);
      console.log('Currency deleted from DB:', name);

      setCurrencies((prevCurrencies) =>
        prevCurrencies.filter((el) => el.name !== name)
      );
    } catch (error) {
      console.log('Error deleting currency:', error);
    }
  };

  const updateCurrency = (name) => {
    console.log('Updating currency:', name);
    navigate(`/rate/update/${name}`);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      // If the search term is empty, fetch the complete list of currencies
      fetchCurrencies();
    } else {
      // Filter currencies based on the search term
      const filteredCurrencies = currencies.filter((currency) =>
        currency.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCurrencies(filteredCurrencies);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h3>Currencies</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search by currency name"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Currency Name</th>
            <th>Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <Currency
              name={currency.name}
              rate={currency.rate}
              key={currency.name}
              updateCurrency={updateCurrency}
              deleteCurrency={deleteCurrency}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
  