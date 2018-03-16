import { SET_PRODUCTS, ADD_PRODUCT, PRODUCT_FETCHED, PRODUCT_UPDATED, PRODUCT_DELECTED } from '../actions';

export default function products(state = [], action = {}) {
    switch(action.type) {
      case ADD_PRODUCT:
        return [
          ...state,
          action.product
        ]
      case PRODUCT_UPDATED:
      return state.map(item => {
        if (item._id === action.product._id) return action.product;
        return item;
      });
      case PRODUCT_FETCHED:
        const index = state.findIndex(item => item._id === action.product._id);
        if (index > -1) {
          return state.map(item => {
            if (item._id === action.product._id) return action.product;
            return item;
            });
        } else {
          return [
              ...state,
              action.product
          ];
        }          
      case PRODUCT_DELECTED:
      return state.filter(item => item._id !== action.productId);
      case SET_PRODUCTS:
        return action.products;
      default: return state;
    }
  }
  