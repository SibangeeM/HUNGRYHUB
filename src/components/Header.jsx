import React from "react";
import logo from "../assets/logo.jpg";
import Button from "../UI/Button";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

const Header = () => {
  const CartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);
  let totalCartItems = 0;
  {
    CartCtx.items.map((item) => {
      totalCartItems = totalCartItems + item.quantity;
    });
  }

  //   const totalCartItems = CartCtx.items.reduce((totalNumberOfItems, item) => {
  //     return totalNumberOfItems + item.quantity;
  //   }, 0);
  const handleShowCart = () =>{
    userCtx.showCart()
  }
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="logo" />
          <h1>HungryHub</h1>
        </div>
        <nav>
          <Button textOnly={true} onClick={handleShowCart}>Cart ({totalCartItems})</Button>
        </nav>
      </header>
    </>
  );
};

export default Header;
