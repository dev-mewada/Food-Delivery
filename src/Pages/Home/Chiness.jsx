import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";
import Loading from "../../Components/Loading";
function Chiness() {
  const [chinessFoods, setChinessFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const getChinessFoods = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/recipes?limit=10&skip=10&select=name,image"
      );

      const data = await response.json();

      setChinessFoods(data.recipes);
    } finally {
      setLoading(false);
    }
  };

  getChinessFoods();
}, []);

    

  return (
    <section className="food-section">
      <h2>Chinese Food</h2>

     {loading ? (<Loading/>): (<div className="food-container">
        {chinessFoods.map((food, index) => {
          const card = {
            id: index,
            name: food.name,
            image: food.image,
            cuisine: food.cuisine
          };

          return <Foodcart key={card.id} card={card}
           />;
        })}
      </div>)}
    </section>
  );
}

export default Chiness;