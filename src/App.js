import React, { Component } from 'react';
import ProductsPage from './productsPage';
import './App.css';
import ProductForm from './productForm';

import { Link, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <Link className="item" to="/">Home</Link>
          <Link className="item" to="/products">Products</Link>
          <Link className="item" to="/products/new">Add new Products</Link>
        </div>        
        <Route exact path="/products" component={ProductsPage}/>
        <Route path="/products/new" component={ProductForm}/>
    </div>
    );
  }
}

export default App;