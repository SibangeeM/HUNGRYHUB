// import React from "react";
// import { useState, useEffect } from "react";
// import MealItem from "./MealItem";

// const Meals = () => {
//   const [isFetching, setIsFetching] = useState(false);
//   const [meals, setMeals] = useState([]);
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function fetchMeals() {
//       setIsFetching(true);
//       try {
//         const response = await fetch("http://localhost:3000/meals");
//         if (!response.ok) {
//           throw new error("Something went wrong while fetching meals.");
//         }
//         const resData = await response.json();
//         setMeals(resData);
//       } catch (error) {
//         setError({
//           message: error.message || "Couldn't fetch places, please try again.",
//         });
//         setIsFetching(false);
//       }
//     }
//     fetchMeals();
//   }, []);

//   return (
//     <ul id="meals">
//       {meals.map((meal) => (
//         <MealItem key={meal.id} meal={meal} />
//       ))}
//     </ul>
//   );
// };

// export default Meals;


//using custom hooks

import React from "react";
import usehttp from "../Hooks/usehttp";
import MealItem from "./MealItem";
import Error from "./Error";
const resquestConfig = {};
const Meals = () => {
  const {
    data: meals,
    isLoading,
    error,
  } = usehttp("http://localhost:3000/meals", resquestConfig, []);
  if (isLoading) {
    return <p className="center">Fetching meals....</p>;
  }
  if (error) {
    return <Error title="An error occurred!" message={error} />;
  }
  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
