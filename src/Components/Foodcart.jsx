import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { addFood } from "../Redux/CartSlice";
import axios from "axios";

function Foodcart({ card }) {
  const dispatch = useDispatch();

  const [showNotification, setShowNotification] = useState(false);

  const handleAdd = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post("https://food-delivery-backend-32tm.onrender.com/cart", {
        user_id: user.id,
        food_id: card.id,
        quantity: 1,
      });

      dispatch(addFood(card));

      setShowNotification(true);

      const audio = new Audio("/sound/add-cart.wav.wav");
      audio.play();

      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Food cart me add nahi hua"
      );
    }
  };

  return (
    <>
      <div className="food-card">
        <div className="food-image">
          <img src={card.image} alt={card.name} />
        </div>

        <h3>{card.name}</h3>

        <p>{card.restaurant}</p>

        <div className="food-bottom">
          <span>₹{card.price}</span>

          <span>
            ⭐ {card.rating || 4.5}
          </span>
        </div>

        <button
          className="add-button"
          onClick={handleAdd}
        >
          <AddIcon />
          Add
        </button>
      </div>

      {showNotification && (
        <div className="notification">
          Item added to cart
        </div>
      )}
    </>
  );
}

export default Foodcart;