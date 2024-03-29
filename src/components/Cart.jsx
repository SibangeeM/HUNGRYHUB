import React from "react";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../store/cartcontext";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

const Cart = () => {
  const CartCtx = useContext(CartContext);
  const UserCtx = useContext(UserProgressContext);
  const CartItems = CartCtx.items;
  const CartTotal = CartItems.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  function handleClose() {
    UserCtx.hideCart();
  }
  function handleCheckout() {
    UserCtx.showCheckout();
  }
  return (
    <Modal className="cart" open={UserCtx.progress === "cart"} onClose={UserCtx.progress === "cart" ? handleClose : null}>
      <h2>Your Cart</h2>
      <ul>
        {CartItems.map((item) => (
          <CartItem key={item.id} item={item}></CartItem>
        ))}
      </ul>
      <p className="cart-total"> {currencyFormatter.format(CartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {CartCtx.items.length > 0 && (
          <Button onClick={handleCheckout}> Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
