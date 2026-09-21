import { useState } from "react";
import axios from "axios";
import "../Home CSS/AddFood.css";

function AddFood() {
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [todaySpecial, setTodaySpecial] = useState(false);
  const [foodImage, setFoodImage] = useState("");
  const [restaurant, setRestaurant] = useState("");

  const [message, setMessage] = useState("");

  // Image ko Base64 mein convert karna
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFoodImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // Food Name validation
    if (!foodName.trim()) {
      setMessage("Food name is required.");
      return;
    }

    if (foodName.trim().length < 2) {
      setMessage("Food name must be at least 2 characters.");
      return;
    }

    // Restaurant validation
    if (!restaurant.trim()) {
      setMessage("Restaurant name is required.");
      return;
    }

    if (restaurant.trim().length < 2) {
      setMessage("Restaurant name must be at least 2 characters.");
      return;
    }

    // Description validation
    if (!description.trim()) {
      setMessage("Description is required.");
      return;
    }

    if (description.trim().length < 10) {
      setMessage("Description must be at least 10 characters.");
      return;
    }

    // Rate validation
    if (!rate) {
      setMessage("Rate is required.");
      return;
    }

    if (Number(rate) <= 0) {
      setMessage("Rate must be greater than 0.");
      return;
    }

    // Rating validation
    if (rating === "") {
      setMessage("Rating is required.");
      return;
    }

    if (Number(rating) < 0 || Number(rating) > 5) {
      setMessage("Rating must be between 0 and 5.");
      return;
    }

    // Category validation
    if (!category) {
      setMessage("Please select a category.");
      return;
    }

    // Image validation
    if (!foodImage) {
      setMessage("Food image is required.");
      return;
    }

    try {
      const foodData = {
        foodimage: foodImage,
        food_name: foodName.trim(),
        description: description.trim(),
        rate: rate,
        rating: rating,
        category: category,
        restaurant: restaurant.trim(),
        today_special: todaySpecial,
      };

      const response = await axios.post(
        "http://localhost:5000/food",
        foodData
      );

      console.log(response.data);

      setMessage("Food added successfully!");

      // Form reset
      setFoodName("");
      setDescription("");
      setRate("");
      setRating("");
      setCategory("");
      setTodaySpecial(false);
      setFoodImage("");
      setRestaurant("");

    } catch (error) {
      console.log(error);

      setMessage("Food add nahi hua.");
    }
  };

  return (
    <div className="add-food-container">
      <form className="add-food-form" onSubmit={handleSubmit}>
        <h2>Add Food</h2>

        {/* Food Name */}
        <div className="food-form-group">
          <label>Food Name</label>

          <input
            type="text"
            placeholder="Enter food name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="food-form-group">
          <label>Description</label>

          <textarea
            placeholder="Enter food description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Rate */}
        <div className="food-form-group">
          <label>Rate</label>

          <input
            type="number"
            placeholder="Enter food price"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        {/* Rating */}
        <div className="food-form-group">
          <label>Rating</label>

          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="Enter rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="food-form-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Veg">Veg</option>
            <option value="Non Veg">Non Veg</option>
          </select>
        </div>

        {/* Today Special */}
        <div className="food-form-group today-special">
          <input
            type="checkbox"
            id="todaySpecial"
            checked={todaySpecial}
            onChange={(e) => setTodaySpecial(e.target.checked)}
          />

          <label htmlFor="todaySpecial">
            Today Special
          </label>
        </div>

        {/* Restaurant */}
        <div className="food-form-group">
          <label>Restaurant Name</label>

          <input
            type="text"
            placeholder="Enter restaurant name"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
          />
        </div>

        {/* Food Image */}
        <div className="food-form-group">
          <label>Food Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {foodImage && (
            <div className="food-image-preview">
              <img
                src={foodImage}
                alt="Food Preview"
              />
            </div>
          )}
        </div>

        {/* Message */}
        {message && <p>{message}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="add-food-button"
        >
          Add Food
        </button>
      </form>
    </div>
  );
}

export default AddFood;