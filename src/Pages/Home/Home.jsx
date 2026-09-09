import { useState } from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import Main from "./Main";
import Navbar from "./Navbar";


function Home () {
    const [cart ,setCart] = useState([]);

    const addToCart = (food) => {
  const exists = cart.some(
    (item) => item.name === food.name
  );

  if (exists) {
    setCart(
      cart.map((item) =>
        item.name === food.name
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );

    alert(`${food.name} quantity increased`);
  } else {
    setCart([
      ...cart,
      {
        ...food,
        quantity: 1
      }
    ]);

    alert(`${food.name} added to cart`);
  }
};

    // console.log(cart);
  return(
<>
<Navbar cart={cart}/>
<Hero/>
<Main onAdd ={addToCart}/>
<Footer/>
</>

  )

}

export default Home ;