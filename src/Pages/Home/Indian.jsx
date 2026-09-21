import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";
import Loading from "../../Components/Loading";

function Indian() {

    const [indianFoods, setIndianFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getIndianFoods = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5000/food"
                );

                const data = await response.json();

                // Sirf Indian category ka food
                const indianData = data.filter(
                    (food) => food.category === "Indian"
                );

                setIndianFoods(indianData);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        getIndianFoods();

    }, []);

    return (
        <section className="food-section">

            <h2>Indian Food</h2>

            {loading ? (
                <Loading />
            ) : (

                <div className="food-container">

                    {indianFoods.map((food) => {

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

export default Indian;