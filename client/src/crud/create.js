import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create =()=> {
  const [name, setName] = useState('');
  const [rate, setRate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const currencyData = { name, rate };
      console.log('Currency Data:', currencyData);

      // Check if the currency with the same name already exists
      const existingCurrency = await axios.get(`https://server-85io.onrender.com/api/currencies/name/${name}`);
      if (existingCurrency.data && existingCurrency.data.length > 0) {
        // Currency already exists, show error message and clear the form
        setErrorMessage('Currency with this name already exists. Please choose a different name.');
        setName('');
        setRate('');
        return;
      }

      // Currency does not exist, proceed with creating it
      const response = await axios.post('https://server-85io.onrender.com/api/currencies', currencyData);
      console.log('Response:', response.data);

      console.log('Currency created successfully!');

      setName('');
      setRate('');
      setErrorMessage('');
      // Set the state to show the success dialog
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error creating currency:', error.response || error);
      setErrorMessage('Failed to create currency. Please try again.');
    }
  };

  const handleOkayClick = () => {
    // Use the navigate function to go to the '/rate/read' route
    navigate('/rate/read');
  };

  // Update the setName handler to ensure 3 uppercase letters
  const handleNameChange = (e) => {
    let newName = e.target.value.toUpperCase().slice(0, 3);
    setName(newName);
  };

  return (
    <div>
      <h3>Create New Currency</h3>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {showSuccessDialog && (
        <div className="popup">
          <div className="popup-content">
            <p>Currency created successfully!</p>
            <button onClick={handleOkayClick}>Okay</button>
          </div>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Currency Name: </label>
          <input
            type="text"
            required
            className="form-control"
            value={name}
            onChange={handleNameChange} // Use the updated handler
          />
        </div>
        <div className="form-group">
          <label>Currency Rate: </label>
          <input
            type="text"
            required
            className="form-control"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Create Currency"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default Create;
