// import React from "react";
// import Modal from "../UI/Modal";
// import { useContext } from "react";
// import CartContext from "../store/cartcontext";
// import { currencyFormatter } from "../util/formatting";
// import Input from "../UI/Input";
// import Button from "../UI/Button";
// import UserProgressContext from "../store/UserProgressContext";

// const Checkout = () => {
//   const CartCtx = useContext(CartContext);
//   const UserCtx = useContext(UserProgressContext);
//   const CartItems = CartCtx.items;
//   const CartTotal = CartItems.reduce(
//     (totalPrice, item) => totalPrice + item.price * item.quantity,
//     0
//   );
//   function handleClose() {
//     UserCtx.hideCheckout();
//   }
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const fd = new FormData(event.target);
//     const data = Object.fromEntries(fd.entries());
//     fetch("http://localhost:3000/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         order: {
//           items: CartCtx.items,
//           customer: data,
//         },
//       }),
//     });
//   };
//   return (
//     <Modal open={UserCtx.progress === "checkout"} onClose={handleClose}>
//       <form onSubmit={handleSubmit}>
//         <h2>Checkout</h2>
//         <p>Total Amount:{currencyFormatter.format(CartTotal)}</p>
//         <Input label="Full Name" type="text" id="name"></Input>
//         <Input label="Email Address" type="email" id="email"></Input>
//         <Input label="Street Address" type="text" id="street"></Input>
//         <div className="control-row">
//           <Input label="Postal Code" type="text" id="postal-code"></Input>
//           <Input label="City" type="text" id="city"></Input>
//         </div>
//         <p className="modal-actions">
//           <Button type="button" onClick={handleClose} textOnly>
//             Close
//           </Button>
//           <Button>Submit</Button>
//         </p>
//       </form>
//     </Modal>
//   );
// };

// export default Checkout;

//using custom hook(useHttp)
import React from "react";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../store/cartcontext";
import { currencyFormatter } from "../util/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../Hooks/usehttp";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const Checkout = () => {
  const {
    data,
    isLoading: isSending,
    error,
    clearData,
    sendRequest,
  } = useHttp("http://localhost:3000/orders", requestConfig);
  const CartCtx = useContext(CartContext);
  const UserCtx = useContext(UserProgressContext);
  const CartItems = CartCtx.items;
  const CartTotal = CartItems.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  function handleClose() {
    UserCtx.hideCheckout();
  }
  function handleFinish() {
    UserCtx.hideCheckout();
    CartCtx.clearCart();
    clearData();
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: CartCtx.items,
          customer: data,
        },
      })
    );
  };
  let actions = (
    <>
      <Button type="button" onClick={handleClose} textOnly>
        Close
      </Button>
      <Button>Submit</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }
  if (data && !error) {
    return (
      <Modal open={UserCtx.progress === "checkout"} onClose={handleFinish}>
        <h2>Success!!</h2>
        <p>Your order was submitted successfully!</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleClose}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={UserCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(CartTotal)}</p>
        <Input label="Full Name" type="text" id="name"></Input>
        <Input label="Email Address" type="email" id="email"></Input>
        <Input label="Street Address" type="text" id="street"></Input>
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"></Input>
          <Input label="City" type="text" id="city"></Input>
        </div>
        {error && (
          <Error title="Failed to submit order" message={error}></Error>
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
