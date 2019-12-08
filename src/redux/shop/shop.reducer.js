import SHOP_DATA from './shop.data';

const INITAIL_STATE = {
  collections: SHOP_DATA
};

const shopReducer = (state = INITAIL_STATE, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default shopReducer;