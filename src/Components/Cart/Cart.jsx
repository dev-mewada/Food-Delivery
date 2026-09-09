import { useLocation, useNavigate } from "react-router-dom";
import "../../Pages/Home CSS/Cart.css";

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();

  const cart = location.state?.cart || [];

  return (
    <main className="cart-page">

      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h1>My Cart</h1>

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
              ₹199
            </div>

            <div className="quantity">
              <button>-</button>
              <span>{food.quantity}</span>
              <button>+</button>
            </div>

            <div>
              <button className="delete-btn">
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
        {/* {cart.reduce(
          (total, food) => total + 199 * food.quantity,
          0
        )} */}
      </div>

    </main>
  );
}

export default Cart;