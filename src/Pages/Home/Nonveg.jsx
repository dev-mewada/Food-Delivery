import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";
import Loading from "../../Components/Loading";
function Nonveg() {
  const [nonvegFoods, setNonvegFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getNonvegFoods = async () => {
      try {const response = await fetch(
        "https://dummyjson.com/recipes?limit=10&skip=10&select=name,image"
      );

      const data = await response.json();

      setNonvegFoods(data.recipes);}finally {
      setLoading(false);
    }
    };

    getNonvegFoods();
  }, []);

  return (
    <section className="food-section">
      <h2>Non Veg Food</h2>

      {loading?(<Loading/>):(<div className="food-container">
        {nonvegFoods.map((food, index) => {
          const card = {
            id: index,
            name: food.name,
            image: food.image,
            cuisine: food.cuisine
          };

          return <Foodcart key={card.id} card={card} />;
        })}
      </div>)}
    </section>
  );
}

export default Nonveg;