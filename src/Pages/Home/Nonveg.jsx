import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";

function Nonveg({onAdd}) {
  const [nonvegFoods, setNonvegFoods] = useState([]);

  useEffect(() => {
    const getNonvegFoods = async () => {
      const response = await fetch(
        "https://randomapi.dev/api/foods?vegetarian=false&count=10&seed=5"
      );

      const data = await response.json();

      setNonvegFoods(data.data);
    };

    getNonvegFoods();
  }, []);

  return (
    <section className="food-section">
      <h2>Non Veg Food</h2>

      <div className="food-container">
        {nonvegFoods.map((food, index) => {
          const card = {
            id: index,
            name: food.dish,
            cuisine: food.cuisine
          };

          return <Foodcart key={card.id} card={card} onAdd={onAdd}/>;
        })}
      </div>
    </section>
  );
}

export default Nonveg;