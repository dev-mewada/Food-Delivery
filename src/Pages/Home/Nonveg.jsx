import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";
import Loading from "../../Components/Loading";

function Nonveg() {

    const [nonvegFoods, setNonvegFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getNonvegFoods = async () => {

            try {

                const response = await fetch(
                    "https://food-delivery-backend-32tm.onrender.com/food"
                );

                const data = await response.json();

                // Sirf Non Veg category ka food
                const nonvegData = data.filter(
                    (food) => food.category === "Non Veg"
                );

                setNonvegFoods(nonvegData);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        getNonvegFoods();

    }, []);

    return (
        <section className="food-section">

            <h2>Non Veg Food</h2>

            {loading ? (
                <Loading />
            ) : (

                <div className="food-container">

                    {nonvegFoods.map((food) => {

                        const card = {
                            id: food.id,
                            name: food.food_name,
                            image: food.foodimage,
                               restaurant: food.restaurant,
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

export default Nonveg;