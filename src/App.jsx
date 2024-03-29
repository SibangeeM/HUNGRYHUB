import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/cartcontext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header></Header>
        <Meals />
        <Cart></Cart>
        <Checkout></Checkout>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;