import React from "react";
import { useContext } from "react";
import CartContext from "../store/cartcontext";
import Button from "../UI/Button";
import { currencyFormatter } from "../util/formatting";

const MealItem = ({ meal }) => {
  const CartCtx = useContext(CartContext);
  function handleAddMealToCart() {
    CartCtx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
