import React from "react";
import { currencyFormatter } from "../util/formatting";
import { useContext } from "react";
import CartContext from "../store/cartcontext";

const CartItem = ({ item }) => {
  const CartCtx = useContext(CartContext);
  function handleRemoveItem(id) {
    CartCtx.removeItem(id);
  }
  function handleAddItem(item) {
    CartCtx.addItem(item);
  }
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} X {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => handleRemoveItem(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => handleAddItem(item)}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
