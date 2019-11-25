export const addItemToCart = (cartItems, cartItemToAdd) => {
  /* 處理新增物品到購物車時，redux 的操作
   * arguments: 
   *    cartItems: 已存在 redux cart store 裡面的物品
   *    cartItemToAdd: 將要被加入 cart store 的單一 item
   * 
   * return: 合併後的 cartItems array
   */
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

  // 已經有相同的選項，所以要合併，用 quantity 來計數
  if(existingCartItem) {
    return cartItems.map(cartItem => 
      cartItem.id === cartItemToAdd.id ?
        { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // 新選項進入時的操作
  return [...cartItems, { ...cartItemToAdd, quantity: 1}]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

  if(existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

  return cartItems.map(cartItem => 
    cartItem.id === cartItemToRemove.id ?
    { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem  
  );

}