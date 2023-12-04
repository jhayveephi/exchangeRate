// Rate.js
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import axios from 'axios';

const Rate = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('http://localhost:5000/api/currencies')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="main-content crud">
      <div className="crud-header group">
        <h2>Exchange Rate</h2>
        <ul className="crud-nav">
          {/* NavLink for Read */}
          <li>
            <NavLink to="read">Read</NavLink>
          </li>
          {/* NavLink for Create */}
          <li>
            <NavLink to="create">Create</NavLink>
          </li>
        </ul>
      </div>
      {/* Use Outlet to render nested routes */}
      <Outlet data={data} />
    </div>
  );
};

export default Rate;
