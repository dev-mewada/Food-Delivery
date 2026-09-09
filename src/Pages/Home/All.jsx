import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";
import { useSelector } from "react-redux";

function All({ onAdd }) {
  const [allFoods, setAllFoods] = useState([]);
  const searchText = useSelector(
  (state) => state.search.searchText
);

  useEffect(() => {
    const getAllFoods = async () => {
      const indianResponse = await fetch(
        "https://randomapi.dev/api/foods?cuisine=indian&count=10&seed=2"
      );

      const chineseResponse = await fetch(
        "https://randomapi.dev/api/foods?cuisine=chinese&count=10&seed=3"
      );

      const indianData = await indianResponse.json();
      const chineseData = await chineseResponse.json();

      setAllFoods([
        ...indianData.data,
        ...chineseData.data
      ]);
      
    };

    getAllFoods();
  }, []);
   const filteredFoods = allFoods.filter((food) =>
  food.dish.toLowerCase().includes(searchText.toLowerCase())
);

     
     
     
  return (
    <section className="food-section">
      <h2>All Food</h2>

      <div className="food-container">
        
        {
        filteredFoods.map((food, index) => {
          const card = {
            id: index,
            name: food.dish,
            cuisine: food.cuisine
          };

          return <Foodcart key={card.id} card={card}
          onAdd={onAdd}  />;
        })}
      </div>
    </section>
  );
}

export default All;