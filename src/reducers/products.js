import { SET_PRODUCTS, ADD_PRODUCT, PRODUCT_DELECTED } from '../actions';

export default function products(state = [], action = {}) {
    switch(action.type) {
      case ADD_PRODUCT:
        return [
          ...state,
          action.product
        ]
      case PRODUCT_DELECTED:
      return state.filter(item => item._id !== action.productId);
      case SET_PRODUCTS:
        return action.products;
      default: return state;
    }
  }
  