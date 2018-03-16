import React from 'react';
import { Link } from 'react-router-dom';
import ModalDelete from './modalDelete';

export default function ProductItem({ product, deleteProduct }) {
  return (
    <table className="ui compact table">
            <thead>
            <tr>
                <th>subject</th>
                <th>detail</th>
                <th>quantity</th>
                <th></th>
            </tr>
            </thead>
            
            <tbody>
                <tr>
                    <td><Link to={`/product/${product._id}`}>{product.subject}</Link></td>
                    <td>{product.detail}</td>
                    <td>{product.quantity}</td>
                    <td>
                        <ModalDelete 
                            product={product} 
                            key={product._id}
                            deleteProduct={deleteProduct}
                        />
                    </td>
                </tr>
            </tbody>
    </table>
  );
}