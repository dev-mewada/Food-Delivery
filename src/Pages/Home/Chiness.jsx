import { useEffect, useState } from "react";
import Foodcart from "../../Components/Foodcart";
import Loading from "../../Components/Loading";

function Chiness() {

    const [chinessFoods, setChinessFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getChinessFoods = async () => {

            try {

                const response = await fetch(
                    "https://food-delivery-backend-32tm.onrender.com/food"
                );

                const data = await response.json();

                // Sirf Chinese category ka food
                const chinessData = data.filter(
                    (food) => food.category === "Chinese"
                );

                setChinessFoods(chinessData);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        getChinessFoods();

    }, []);

    return (
        <section className="food-section">

            <h2>Chinese Food</h2>

            {loading ? (
                <Loading />
            ) : (

                <div className="food-container">

                    {chinessFoods.map((food) => {

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

export default Chiness;