import React from 'react';
import Home from './Component/Home'
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Register from "./Component/Register";
import Login from "./Component/Login";
import FlexTest from "./Component/FlexTest";
import AddNewShop from "./Component/AddNewShop";
// import Drawer from "./Component/Drawer";

function App() {
  return (
      <Router>
          <Switch>
              <Route path="/" exact>
                  <Home />
              </Route>
              <Route path="/register" exact>
                  <Register />
              </Route>
              <Route path="/login" exact>
                  <Login />
              </Route>
              <Route path="/test" exact>
                  {/*<Drawer />*/}
              </Route>
              <Route path="/shops/add">
                  <AddNewShop />
              </Route>
          </Switch>
      </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
