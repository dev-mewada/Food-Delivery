import "../../Pages/Home CSS/Cart.css";

import { useSelector, useDispatch } from "react-redux";

import {
  incrementFood,
  decrementFood,
  removeFood,
  ClearFood,
  setCart
} from "../../Redux/CartSlice";

import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../../Pages/Home/Navbar";


function Cart() {

  const [showModal, setShowModal] = useState(false);
  const [showModelSecond, setShowModelSecond] = useState(false);
  const [showPayModel, setPayModel] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));


  // ==============================
  // Get cart from database
  // ==============================

  useEffect(() => {

    const getCart = async () => {

      if (!user) {
        return;
      }

      try {

        const response = await axios.get(
          `http://localhost:5000/cart?user_id=${user.id}`
        );

        console.log("Cart from database:", response.data);


        // Convert database data into Redux cart format
        const cartData = response.data.map((item) => ({
          id: item.food_id,
          name: item.food_name,
          image: item.foodimage,
          price: Number(item.rate),
          restaurant: item.restaurant,
          description: item.description,
          rating: item.rating,
          category: item.category,
          quantity: item.quantity
        }));


        // Save database cart into Redux
        dispatch(setCart(cartData));

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Cart load nahi hua"
        );

      }

    };


    getCart();

  }, [dispatch]);


  // ==============================
  // Increment quantity
  // ==============================

  const handleIncrement = async (food) => {

    if (!user) {
      alert("Please login first");
      return;
    }


    const newQuantity = food.quantity + 1;


    try {

      await axios.put(
        `http://localhost:5000/cart/${food.id}`,
        {
          user_id: user.id,
          quantity: newQuantity
        }
      );


      // Database successful → Redux update
      dispatch(incrementFood(food.id));


    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Quantity update nahi hui"
      );

    }

  };


  // ==============================
  // Decrement quantity
  // ==============================

  const handleDecrement = async (food) => {

    if (!user) {
      alert("Please login first");
      return;
    }


    // Quantity 1 se kam nahi hogi
    if (food.quantity <= 1) {
      return;
    }


    const newQuantity = food.quantity - 1;


    try {

      await axios.put(
        `http://localhost:5000/cart/${food.id}`,
        {
          user_id: user.id,
          quantity: newQuantity
        }
      );


      // Database successful → Redux update
      dispatch(decrementFood(food.id));


    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Quantity update nahi hui"
      );

    }

  };


  // ==============================
  // Remove food
  // ==============================

  const handleRemove = async (food) => {

    if (!user) {
      alert("Please login first");
      return;
    }


    try {

      await axios.delete(
        `http://localhost:5000/cart/${food.id}`,
        {
          data: {
            user_id: user.id
          }
        }
      );


      // Database successful → Redux update
      dispatch(removeFood(food.id));


    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Food remove nahi hua"
      );

    }

  };


  // ==============================
  // Clear complete cart
  // ==============================

  const handleClear = async () => {

    if (!user) {
      alert("Please login first");
      return;
    }


    if (cart.length === 0) {
      return;
    }


    try {

      await axios.delete(
        "http://localhost:5000/cart/clear",
        {
          data: {
            user_id: user.id
          }
        }
      );


      // Database successful → Redux clear
      dispatch(ClearFood());


    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Cart clear nahi hua"
      );

    }

  };


  return (

    <>

      <Navbar />


      <main className="cart-page">


        {/* Back button */}

        <Link to="/">

          <button className="back-btn">
            ← Back to Home
          </button>

        </Link>


        {/* Cart title */}

        <div className="cart-title">

          <h1>
            My Cart
          </h1>


          <button
            className="clear-btn"
            onClick={handleClear}
          >
            Clear
          </button>

        </div>


        {/* Cart header */}

        <div className="cart-header">

          <span>
            Image
          </span>

          <span>
            Food
          </span>

          <span>
            Restaurant
          </span>

          <span>
            Price
          </span>

          <span>
            Quantity
          </span>

          <span>
            Delete
          </span>

          <span>
            Total
          </span>

        </div>


        {/* Cart items */}

        <div className="cart-container">


          {cart.length === 0 ? (

            <p>
              Your cart is empty
            </p>

          ) : (

            cart.map((food) => (

              <div
                className="cart-row"
                key={food.id}
              >


                {/* Image */}

                <div className="cart-image">

                  {food.image ? (

                    <img
                      src={food.image}
                      alt={food.name}
                      width="70"
                    />

                  ) : (

                    "🍽️"

                  )}

                </div>


                {/* Food name */}

                <div>

                  <h3>
                    {food.name}
                  </h3>

                </div>


                {/* Restaurant */}

                <div>

                  <p>
                    {food.restaurant}
                  </p>

                </div>


                {/* Price */}

                <div>

                  <p>
                    ₹{food.price}
                  </p>

                </div>


                {/* Quantity */}

                <div className="quantity">


                  <button
                    onClick={() =>
                      handleIncrement(food)
                    }
                  >
                    +
                  </button>


                  <span>
                    {food.quantity}
                  </span>


                  <button
                    onClick={() =>
                      handleDecrement(food)
                    }
                  >
                    -
                  </button>


                </div>


                {/* Delete */}

                <div>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleRemove(food)
                    }
                  >

                    <p>
                      Delete
                    </p>

                  </button>

                </div>


                {/* Total */}

                <div>

                  ₹
                  {food.price * food.quantity}

                </div>


              </div>

            ))

          )}

        </div>


        {/* Grand total */}

        {cart.length > 0 && (

          <div className="grand-total">


            Grand Total: ₹

            {cart.reduce(
              (total, food) =>
                total +
                food.price * food.quantity,
              0
            )}


            <button
              onClick={() => {

                const isLoggedIn =
                  localStorage.getItem("isLoggedIn");


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


          </div>

        )}


        {/* Order modal */}

        {showModal && (

          <div className="order-modal">

            <div className="modal-box">


              <h2>
                Place Order
              </h2>


              <input
                type="text"
                placeholder="Enter Address"
              />


              <input
                type="text"
                placeholder="Enter Mobile Number"
              />


              <h3>

                Order Total: ₹

                {cart.reduce(
                  (total, food) =>
                    total +
                    food.price *
                    food.quantity,
                  0
                )}

              </h3>


              <button
                onClick={() => {

                  setShowModal(false);

                  setPayModel(true);

                }}
              >

                Continue to Payment

              </button>


              <button
                onClick={() =>
                  setShowModal(false)
                }
              >

                Cancel

              </button>


            </div>

          </div>

        )}


        {/* Login modal */}

        {showModelSecond && (

          <div className="for-confirm">

            <div className="modal-box">


              <p>
                IF YOU ARE NOT LOGIN SO PLEASE FIRST KEEP LOGIN
              </p>


              <button
                onClick={() =>
                  navigate("/login")
                }
              >

                Login

              </button>


              <button
                onClick={() =>
                  setShowModelSecond(false)
                }
              >

                Cancel

              </button>


            </div>

          </div>

        )}


        {/* Payment modal */}

        {showPayModel && (

          <div className="payment-list">

            <div className="payment-box">


              <h2>
                Payment
              </h2>


              <h3>

                Order Total: ₹

                {cart.reduce(
                  (total, food) =>
                    total +
                    food.price *
                    food.quantity,
                  0
                )}

              </h3>


              <p>
                Select Payment Method
              </p>


              <label>

                <input
                  type="radio"
                  name="payment"
                />

                PhonePe / UPI

              </label>


              <label>

                <input
                  type="radio"
                  name="payment"
                />

                Card

              </label>


              <label>

                <input
                  type="radio"
                  name="payment"
                />

                Cash on Delivery

              </label>


              <button>
                Pay Now
              </button>


              <button
                onClick={() =>
                  setPayModel(false)
                }
              >

                Cancel

              </button>


            </div>

          </div>

        )}


      </main>

    </>

  );

}


export default Cart;