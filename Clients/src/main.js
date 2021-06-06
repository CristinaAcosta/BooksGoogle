import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Save from './compontents/Save';
import Search from './compontents/Search';


const Main = () => {
    return (
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path='/' component={ Search }></Route>
        <Route exact path='/' component={ Save }></Route>
      </Switch>
    );
  }
  
  export default Main;