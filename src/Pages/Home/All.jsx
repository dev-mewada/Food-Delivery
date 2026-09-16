import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";
import { useSelector } from "react-redux";
import Loading from "../../Components/Loading";
function All() {
  const [allFoods, setAllFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchText = useSelector(
  (state) => state.search.searchText
);

  useEffect(() => {
    const getAllFoods = async () => {
     try{ const indianResponse = await fetch(
        "https://dummyjson.com/recipes?limit=10&skip=10&select=name,image"
      );

      const chineseResponse = await fetch(
        "https://dummyjson.com/recipes?limit=10&skip=10&select=name,image"
      );

      const indianData = await indianResponse.json();
      const chineseData = await chineseResponse.json();

    setAllFoods([
        ...indianData.recipes,
        ...chineseData.recipes
      ]);}
      finally {
      setLoading(false);
    }
    };

    getAllFoods();
  }, []);
   const filteredFoods = allFoods.filter((food) =>
  food.name.toLowerCase().includes(searchText.toLowerCase())
);

     
     
     
  return (
    <section className="food-section">
      <h2>All Food</h2>
   {loading? (<Loading/>):(
      <div className="food-container">
        
        {
        filteredFoods.map((food, index) => {
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

export default All;