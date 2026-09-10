
import "../../Pages/Home CSS/Cart.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { incrementFood ,decrementFood,removeFood,ClearFood } from "../../Redux/CartSlice";

function Cart() {
  
const dispatch = useDispatch();
const cart = useSelector((state) => state.cart.cart);

  return (
    <main className="cart-page">
     <Link to="/">
  <button className="back-btn">
    ← Back to Home
  </button>
</Link>
      

     <div className="cart-title">
  <h1>My Cart</h1>

  <button
    className="clear-btn"
    onClick={() => dispatch(ClearFood())}
  >
    Clear
  </button>
</div>
      <div className="cart-header">
        <span>Image</span>
        <span>Food</span>
        <span>Restaurant</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Delete</span>
        <span>Total</span>
      </div>

      <div className="cart-container">

        {cart.map((food) => (
          <div className="cart-row" key={food.id}>

            <div className="cart-image">
              🍽️
            </div>

            <div>
              <h3>{food.name}</h3>
            </div>

            <div>
              <p>{food.cuisine}</p>
            </div>

            <div>
              <p>₹199</p>
            </div>

            <div className="quantity">
              <button onClick={ () => dispatch(incrementFood(food.id))}>+</button>
              <span>{food.quantity}</span>
              <button onClick={ () => dispatch(decrementFood(food.id))}>-</button>
            </div>

            <div>
              <button className="delete-btn" onClick={()=> dispatch(removeFood(food.id))}>
                <p>Delete</p>
              </button>
            </div>

            <div>
              ₹{199 * food.quantity}
            </div>

          </div>
        ))}

      </div>

      <div className="grand-total">
        Grand Total: ₹
        {cart.reduce(
          (total, food) => total + 199 * food.quantity,
          0
        )}
      </div>

    </main>
  );
}

export default Cart;