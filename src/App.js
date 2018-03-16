import React, { Component } from 'react';
import ProductsPage from './productsPage';
import ProductFormPage from './productFormPage';
import './App.css';
import ProductForm from './productForm';

import { Link, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui two item menu">
          <Link className="item" to="/">Products</Link>
          <Link className="item" to="/products/new">Add new Products</Link>
        </div>        
        <Route exact path="/" component={ProductsPage}/>
        <Route path="/products/new" component={ProductFormPage}/>
        <Route path="/product/:_id" component={ProductFormPage}/>
    </div>
    );
  }
}

export default App;