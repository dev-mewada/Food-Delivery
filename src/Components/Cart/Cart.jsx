
import "../../Pages/Home CSS/Cart.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { incrementFood ,decrementFood,removeFood,ClearFood } from "../../Redux/CartSlice";
import Navbar from "../../Pages/Home/Navbar";
import { useState } from "react";

function Cart() {
  
 const [showModal, setShowModal] = useState(false); 
 const [showModelSecond , setShowModelSecond] = useState(false);

 const navigate = useNavigate();

 
const dispatch = useDispatch();
const cart = useSelector((state) => state.cart.cart);

  return (
   
    <>
    <Navbar/>
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

      {cart.length>0&&<div className="grand-total">
        Grand Total: ₹
        {cart.reduce(
          (total, food) => total + 199 * food.quantity,
          0
        )}

        <button
  onClick={() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      setShowModal(true);
    } else {
      setShowModelSecond(true);
    }
  }}
  className="order-now"
>
  Order Now
</button>
      </div>}
  {showModal && (
  <div className="order-modal">
    <div className="modal-box">
      <h2>Place Order</h2>

      <input
        type="text"
        placeholder="Enter Address"
      />

      <input
        type="text"
        placeholder="Enter Mobile Number"
      />

      <button>Submit Order</button>

      <button onClick={() => setShowModal(false)}>
        Cancel
      </button>
    </div>
  </div>
)}

{showModelSecond && (
   <div className="for-confirm">
       <div className="modal-box">
        <p>IF YOU ARE NOT LOGIN SO PLESE FIRST KEEP LOGIN</p>
         <button
         onClick= { () => navigate ("/Login")}
         >Login</button>
         <button  onClick={ () => setShowModelSecond(false)}
         >Cancle</button>

       </div>



   </div>

)}
    </main>
    </>
  );
}

export default Cart;