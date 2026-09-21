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

            try {

                const response = await fetch(
                    "http://localhost:5000/food"
                );

                const data = await response.json();

                setAllFoods(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        getAllFoods();

    }, []);

    const filteredFoods = allFoods.filter((food) =>
        food.food_name
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    return (
        <section className="food-section">

            <h2>All Food</h2>

            {loading ? (
                <Loading />
            ) : (

                <div className="food-container">

                    {filteredFoods.map((food) => {

                        const card = {
                            id: food.id,
                            name: food.food_name,
                            restaurant: food.restaurant,
                            image: food.foodimage,
                            price: food.rate,
                            rating: food.rating,
                            category: food.category,
                            description: food.description,
                            today_special: food.today_special
                        };

                        return (
                            <Foodcart
                                key={card.id}
                                card={card}
                            />
                        );

                    })}

                </div>

            )}

        </section>
    );
}

export default All;