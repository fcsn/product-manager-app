import React from 'react';
import ProductItem from './productItem';

export default function ProductsList({ products, deleteProduct }) {
  const emptyMessage = (
    <p>There are no products yet in your collection.</p>
  );

  const productsList = (
        <div>
          { products.map(product => 
          <ProductItem 
              product={product} 
              key={product._id}
              deleteProduct={deleteProduct}
          />)}
        </div>
  );

  return (
    <div>
      {products.length === 0 ? emptyMessage : productsList}
    </div>
  );
}
