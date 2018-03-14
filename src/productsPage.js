import React from 'react';
import ProductsList from './productsList';
import { connect } from 'react-redux';

class ProductsPage extends React.Component {
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

export default connect(mapStateToProps)(ProductsPage);