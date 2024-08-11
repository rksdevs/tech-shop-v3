export const convertToDecimals = (num) => {
    return (Math.round(num * 100)/100).toFixed(2);
}

export const updateCart = (state) => {
     //calculate item price
     state.itemsPrice = convertToDecimals(state.cartItems.reduce((acc,item)=> acc + item.currentPrice * item.qty, 0));

     //calculate shipping price - if order is above 1000rs shipping is free else 100rs shipping cost
     state.shippingPrice = convertToDecimals(state.itemsPrice > 1000 ? 0 : 100);

     //calculate tax price - 18%
     state.taxPrice = convertToDecimals(Number((0.18 * state.itemsPrice).toFixed(2)));

     //calculate total price
     state.totalPrice = (
         Number(state.itemsPrice) +
         Number(state.shippingPrice)
        //  Number(state.taxPrice)
     ).toFixed(2);

     localStorage.setItem('cart', JSON.stringify(state));

     return state;
}