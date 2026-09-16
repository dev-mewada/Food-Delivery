import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { addFood } from "../Redux/CartSlice";

function Foodcart({ card }) {
  const dispatch = useDispatch();

  const [showNotification, setShowNotification] = useState(false);

  const handleAdd = () => {
    // Add food to Redux cart
    dispatch(addFood(card));

    // Play sound
    const audio = new Audio("/sound/add-cart.wav.wav");
    audio.play();

    // Show notification
    setShowNotification(true);

    // Hide notification after 2 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <>
      <div className="food-card">

        <div className="food-image">
          <img src={card.image} alt={card.name} />
        </div>

        <h3>{card.name}</h3>

        <p>{card.cuisine}</p>

        <div className="food-bottom">
          <span>₹199</span>
          <span>⭐ {card.rating || 4.5}</span>
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