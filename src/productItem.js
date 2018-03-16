import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductItem({ product }) {
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
                    <td>{product.subject}</td>
                    <td>{product.detail}</td>
                    <td>{product.quantity}</td>
                    <td>
                        delete
                    </td>
                </tr>
            </tbody>
    </table>
  );
}