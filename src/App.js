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
import DishesInShop from "./Component/DishesInShop";
import ShopsManage from "./Component/ShopsManage";
import ShopEdit from "./Component/ShopEdit";


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
              <Route path="/shops/:shopId/dishes">
                  <DishesInShop />
              </Route>
              {/*<Route path="/shops/add">*/}
              {/*    <AddNewShop />*/}
              {/*</Route>*/}
              <Route path="/manage/shops">
                  <ShopsManage />
              </Route>
              <Route path="/edit/shops/:shopId">
                  <ShopEdit />
              </Route>
              {/*<Route path="/dishes/list">*/}
              {/*    <DishList />*/}
              {/*</Route>*/}
              {/*<Route path="/test">*/}
              {/*    <TestWidgets />*/}
              {/*</Route>*/}
          </Switch>
      </Router>
  );
}

export default App;
