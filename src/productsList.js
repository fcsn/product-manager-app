import React from 'react';

export default function ProductsList({ products }) {
  const emptyMessage = (
    <p>There are no products yet in your collection.</p>
  );

  const productsList = (
    <p>products list</p>
  );

  return (
    <div>
      {products.length === 0 ? emptyMessage : productsList}
    </div>
  );
}
