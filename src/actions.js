export const SET_PRODUCTS = 'SET_PRODUCTS';

function handleResponse(response) {
    if(response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function setProducts(products) {
    return {
        type: SET_PRODUCTS,
        products
    }
}

export function saveProduct(data) {
    return dispatch => {
      return fetch('/api/products', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(handleResponse);
    }
  }

export function fetchProducts() {
    return dispatch => {
        fetch('/api/products')
        .then(res => res.json())
        .then(data => dispatch(setProducts(data.products)));
    }
}