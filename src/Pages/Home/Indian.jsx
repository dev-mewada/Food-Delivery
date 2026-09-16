import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";
import Loading from "../../Components/Loading";

function Indian()  {
  const [indianFoods, setIndianFoods] = useState([]);
  
const [loading, setLoading] = useState(true);
 
  
  useEffect(() => {
  const getIndianFoods = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/recipes?limit=10&skip=10&select=name,image"
      );

      const data = await response.json();
      setIndianFoods(data.recipes);
    } finally {
      setLoading(false);
    }
  };

  getIndianFoods();
}, []);

  return (
    <section className="food-section">
      <h2>Indian Food</h2>
{loading ? (<Loading/>):
      (<div className="food-container">
        {indianFoods.map((food, index) => {
          const card = {
            id: index,
            name: food.name,
            image: food.image,
            cuisine: food.cuisine
          };

          return( 
               <Foodcart
               key={card.id}
               card={card}
               
                />)
        })}
      </div>)}
    </section>
  );
}

export default Indian;