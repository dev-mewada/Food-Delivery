import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";

function Indian()  {
  const [indianFoods, setIndianFoods] = useState([]);
 
  
  useEffect(() => {
    const getIndianFoods = async () => {
      const response = await fetch(
        "https://randomapi.dev/api/foods?cuisine=indian&count=10&seed=2"
      );

      const data = await response.json();

      setIndianFoods(data.data);
    };

    getIndianFoods();
  }, []);

  return (
    <section className="food-section">
      <h2>Indian Food</h2>

      <div className="food-container">
        {indianFoods.map((food, index) => {
          const card = {
            id: index,
            name: food.dish,
            cuisine: food.cuisine
          };

          return( 
               <Foodcart
               key={card.id}
               card={card}
               
                />)
        })}
      </div>
    </section>
  );
}

export default Indian;