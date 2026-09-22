import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";
import Loading from "../../Components/Loading";

function Veg() {

    const [vegFoods, setVegFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getVegFoods = async () => {

            try {

                const response = await fetch(
                    "https://food-delivery-backend-32tm.onrender.com/food"
                );

                const data = await response.json();

                // Sirf Veg category ka food
                const vegData = data.filter(
                    (food) => food.category === "Veg"
                );

                setVegFoods(vegData);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        getVegFoods();

    }, []);

    return (
        <section className="food-section">

            <h2>Veg Food</h2>

            {loading ? (
                <Loading />
            ) : (

                <div className="food-container">

                    {vegFoods.map((food) => {

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

export default Veg;