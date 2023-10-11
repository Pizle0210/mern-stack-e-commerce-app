export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const cartUpdate =(state)=>{
  //* calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  const FREE_SHIPPING_THRESHOLD = 500;
  const SHIPPING_FEE = 25;

  //* calculate shipping fee(items over $500 get shipped for free)
  state.shippingPrice = addDecimals(
    state.itemsPrice > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  );

  //* calculate tax(12% of items price)
  const TAX_RATE = 0.12;
  state.taxPrice = addDecimals(
    Number((TAX_RATE * state.itemsPrice).toFixed(2))
  );

  //* calculate total price
  state.totalAmount = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state
}