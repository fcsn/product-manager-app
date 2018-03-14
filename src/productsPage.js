import React from 'react';
import ProductsList from './productsList';
import { connect } from 'react-redux';
import { fetchProducts } from './actions';

class ProductsPage extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    return (
      <div>
        <h1>Products List</h1>

        <ProductsList products={this.props.products} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps, { fetchProducts })(ProductsPage);