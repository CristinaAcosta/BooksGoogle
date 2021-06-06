import React from "react";
import './App.css';
import Navbar from './compontents/Nav';
import { Switch, Route } from 'react-router-dom';
import Save from './compontents/Save';
import Search from  './compontents/Search';


function App() {
  return (
    <div>
      <Navbar/>
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path='/' component={ Search }></Route>
        <Route exact path='/Save' component={ Save }></Route>
      </Switch>
    </div>
  );
}
export default App;

