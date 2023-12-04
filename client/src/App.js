import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './Home';
import Exchange from './Exchange';
import Team from './Team';
import Footer from './Footer';
import Rate from './Rate';
import Read from './crud/read'; // Import the Read component
import Create from './crud/create'; // Import the Create component
import Update from './crud/update';


function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <NavLink to="/" activeClassName="active" end>
            Home
          </NavLink>
          <NavLink to="/exchange" activeClassName="active">
            Exchange
          </NavLink>
          <NavLink to="/team" activeClassName="active">
            Our Team
          </NavLink>
          {/* Adjust the Rate NavLink to point directly to Read */}
          <NavLink to="/rate/read" activeClassName="active">
            Rate
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/team" element={<Team />} />
          {/* Remove the wildcard from the Rate path */}
          <Route path="/rate" element={<Rate />}>
            {/* Add the nested routes for Read, Create, and Edit */}
            <Route path="read" element={<Read />} />
            <Route path="create" element={<Create />} />
            <Route path="update/:name" element={<Update />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
