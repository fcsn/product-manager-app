export const SET_PRODUCTS = 'SET_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const PRODUCT_DELECTED = 'PRODUCT_DELECTED';

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

export function addProduct(product) {
    return {
        type: ADD_PRODUCT,
        product
    }
}

export function productDeleted(productId) {
    return {
        type: PRODUCT_DELECTED,
        productId
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
      }).then(handleResponse)
      .then(data => dispatch(addProduct(data.product)));
    }
}
  
export function deleteProduct(id) {
    return dispatch => {
        return fetch(`/api/products/${id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(productDeleted(id)));
    }
};

export function fetchProducts() {
    return dispatch => {
        fetch('/api/products')
        .then(res => res.json())
        .then(data => dispatch(setProducts(data.products)));
    }
}