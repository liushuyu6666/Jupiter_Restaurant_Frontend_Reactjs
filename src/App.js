import React from 'react';
import Home from './Component/Home'
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Register from "./Component/Register";
import Login from "./Component/Login";
import DishesInShop from "./Component/DishesInShop";
import ShopsManage from "./Component/ShopsManage";
import ShopEdit from "./Component/ShopEdit";
import ShopAdd from "./Component/ShopAdd";
import DishesManage from "./Component/DishesManage";
import DishAdd from "./Component/DishAdd";
import OrdersList from "./Component/OrdersList";


function App() {
  return (
      <Router>
          <Switch>
              <Route path="/" exact>
                  <Home />
              </Route>
              <Route path="/shops/:shopId/dishes" exact>
                  <DishesInShop />
              </Route>
              <Route path="/orders" exact>
                  <OrdersList />
              </Route>

              <Route path="/manage/shops" exact>
                  <ShopsManage />
              </Route>
              <Route path="/add/shops" exact>
                  <ShopAdd />
              </Route>
              <Route path="/edit/shops/:shopId" exact>
                  <ShopEdit />
              </Route>
              <Route path="/manage/shops/:shopId/dishes" exact>
                  <DishesManage />
              </Route>
              <Route path="/add/shops/:shopId/dishes" exact>
                  <DishAdd />
              </Route>

              <Route path="/register" exact>
                  <Register />
              </Route>
              <Route path="/login" exact>
                  <Login />
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
