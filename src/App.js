import React, { Component } from 'react';
import ProductsPage from './productsPage';
import './App.css';

import { Link, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Welcome to React</h2>
        </div>
        <p>
        <Link className="item" to="/products">Products</Link>
        </p>

        <Route exact path="/products" component={ProductsPage}/>
    </div>
    );
  }
}

export default App;