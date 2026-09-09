import AddIcon from "@mui/icons-material/Add";
import { addFood } from "../Redux/CartSlice";
import { useDispatch } from "react-redux";

function Foodcart({ onAdd , card }) {
     const dispatch = useDispatch()
  return (
    <div className="food-card">

      <div className="food-image">
        🍽️
      </div>

      <h3>{card.name}</h3>

      <p>{card.cuisine}</p>

      <div className="food-bottom">
        <span>₹199</span>
        <span>⭐ 4.5</span>
      </div>

      <button className="add-button"
              onClick={() => dispatch(addFood(card))
            
              }
            
           >
        <AddIcon />
        Add
      </button>

    </div>
  );
}

export default Foodcart;