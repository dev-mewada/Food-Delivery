import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";

function Veg({onAdd}) {
  const [vegFoods, setVegFoods] = useState([]);

  useEffect(() => {
    const getVegFoods = async () => {
      const response = await fetch(
        "https://randomapi.dev/api/foods?vegetarian=true&count=10&seed=4"
      );

      const data = await response.json();

      setVegFoods(data.data);
    };

    getVegFoods();
  }, []);

  return (
    <section className="food-section">
      <h2>Veg Food</h2>

      <div className="food-container">
        {vegFoods.map((food, index) => {
          const card = {
            id: index,
            name: food.dish,
            cuisine: food.cuisine
          };

          return <Foodcart key={card.id} card={card}
          onAdd={onAdd} />;
        })}
      </div>
    </section>
  );
}

export default Veg;