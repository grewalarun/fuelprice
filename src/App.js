import React from 'react';
import './App.css';
import FuelPrice from './Components/FuelPrice';
import ui from './Components/Newui';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
  <Route path="/" exact component={ui}/>
  <Route path="/oldui" exact component={FuelPrice}/>
  </Switch>
      </Router>
      {/* <FuelPrice/> */}
    </div>
  );
}

export default App;
