import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";

function Chiness({ onAdd }) {
  const [chinessFoods, setChinessFoods] = useState([]);

  useEffect(() => {
    const getChinessFoods = async () => {
      const response = await fetch(
        "https://randomapi.dev/api/foods?cuisine=chinese&count=10&seed=3"
      );

      const data = await response.json();

      setChinessFoods(data.data);
    };

    getChinessFoods();
  }, []);

  return (
    <section className="food-section">
      <h2>Chinese Food</h2>

      <div className="food-container">
        {chinessFoods.map((food, index) => {
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

export default Chiness;