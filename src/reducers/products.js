import { SET_PRODUCTS, ADD_PRODUCT } from '../actions';

export default function products(state = [], action = {}) {
    switch(action.type) {
      case ADD_PRODUCT:
        return [
          ...state,
          action.product
        ]
      case SET_PRODUCTS:
        return action.products;
      default: return state;
    }
  }
  