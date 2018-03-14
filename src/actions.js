export const SET_PRODUCTS = 'SET_PRODUCTS';

export function setProducts(products) {
    return {
        type: SET_PRODUCTS,
        products
    }
}

export function fetchProducts() {
    return dispatch => {
        fetch('/api/products')
        .then(res => res.json())
        .then(data => dispatch(setProducts(data.products)));
    }
}