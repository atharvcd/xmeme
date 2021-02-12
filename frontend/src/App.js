import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from "./components/Menu";
import "./App.css";
const App = () => {
  return (
    <div>
      <Router>
      <Menu/>
      <Switch>
        <Route exact = {true} path='/'component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contact-us' component={Contact} />
        <Route exact path='/sign-up' component={Signup} />
      </Switch>
    </Router>
    </div>
  );
};


export default App;
