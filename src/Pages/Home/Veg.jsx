import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";
import Loading from "../../Components/Loading";
function Veg() {
  const [vegFoods, setVegFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getVegFoods = async () => {
      try{const response = await fetch(
        "https://dummyjson.com/recipes?limit=10&skip=10&select=name,image"
      );

      const data = await response.json();

      setVegFoods(data.recipes);}finally {
      setLoading(false);
    }
    };

    getVegFoods();
  }, []);

  return (
    <section className="food-section">
      <h2>Veg Food</h2>
  
      {loading?(<Loading/>):(<div className="food-container">
        {vegFoods.map((food, index) => {
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

export default Veg;