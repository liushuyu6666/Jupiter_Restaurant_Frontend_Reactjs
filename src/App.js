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
import ShopList from "./Component/ShopList";
import TestWidgets from "./Component/TestWidgets";
import DishList from "./Component/DishList";


function App() {
  return (
      <Router>
          <Switch>
              {/*<Route path="/" exact>*/}
              {/*    <Home />*/}
              {/*</Route>*/}
              <Route path="/register" exact>
                  <Register />
              </Route>
              <Route path="/login" exact>
                  <Login />
              </Route>
              {/*<Route path="/shops/add">*/}
              {/*    <AddNewShop />*/}
              {/*</Route>*/}
              {/*<Route path="/shops/list">*/}
              {/*    <ShopList />*/}
              {/*</Route>*/}
              {/*<Route path="/dishes/list">*/}
              {/*    <DishList />*/}
              {/*</Route>*/}
              {/*<Route path="/test">*/}
              {/*    <TestWidgets />*/}
              {/*</Route>*/}
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
