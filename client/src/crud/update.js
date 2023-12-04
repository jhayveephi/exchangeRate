import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [currency, setCurrency] = useState({ name: '', rate: 0 });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessDialog, setshowSuccessDialog] = useState(false);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get(`https://server-85io.onrender.com/api/currencies/name/${name}`);
        setCurrency(response.data);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchCurrencyData();
  }, [name]);

  const updateCurrency = async (e) => {
    e.preventDefault();
    const updatedCurrency = { name: currency.name, rate: currency.rate };

    try {
      const res = await axios.put(`https://server-85io.onrender.com/api/currencies/updateByName/${name}`, updatedCurrency);
      setSuccessMessage(`Currency "${name}" updated successfully!`);
      setErrorMessage('');
      setshowSuccessDialog(true);
      // Do not navigate automatically

    } catch (error) {
      console.error('Update failed:', error);
      setErrorMessage('Failed to update currency. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleOkayClick = () => {
    setshowSuccessDialog(false);
    // Navigate to /rate/read after closing the popup
    navigate('/rate/read');
  };

  return (
    <div>
      <h2>Update Currency</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {showSuccessDialog && (
        <div className="popup">
          <div className="popup-content">
            <p>{successMessage}</p>
            <button onClick={handleOkayClick}>Okay</button>
          </div>
        </div>
      )}
      <form onSubmit={updateCurrency}>
        <label>
          Currency Name:
          <input
            type="text"
            value={name}
            disabled
          />
        </label>
        <br />
        <label>
          Currency Rate:
          <input
            type="text"
            value={currency.rate}
            onChange={(e) => setCurrency({ ...currency, rate: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Update Currency</button>
      </form>
    </div>
  );
};

export default Update;
