import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

import "../Home CSS/Hero.css";

const heroData = [
  {
   id: 1,
    title: "Delicious Food",
    subtitle: "Delivered To Your Door",
    description:
      "Fresh and tasty food delivered fast to your doorstep.",
    image: "/images/pizza.png",
    buttonText: "Order Now"
  },

  {
    id: 2,
    title: "Taste The Best",
    subtitle: "Indian Food",
    description:
      "Enjoy delicious and authentic Indian food from your favorite restaurants.",
    image: "/images/indian.png",
    buttonText: "Explore Food"
  },

  {
    id: 3,
    title: "Craving Chinese?",
    subtitle: "We Have Got You Covered",
    description:
      "Enjoy delicious Chinese dishes delivered fresh and hot.",
    image: "/images/chinese.png",
    buttonText: "Order Now"
  },

  {
    id: 4,
    title: "Fresh & Healthy",
    subtitle: "Veg Food",
    description:
      "Choose from a wide variety of fresh and delicious vegetarian food.",
    image: "/images/veg.jpg",
    buttonText: "Explore Veg"
  },

  {
    id: 5,
    title: "Non Veg Specials",
    subtitle: "Made For Food Lovers",
    description:
      "Enjoy mouth-watering non-veg dishes delivered to your doorstep.",
    image: "/images/non veg.jpg",
    buttonText: "Order Now"
  }
];

function Hero() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((previousSlide) =>
      previousSlide === heroData.length - 1
        ? 0
        : previousSlide + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((previousSlide) =>
      previousSlide === 0
        ? heroData.length - 1
        : previousSlide - 1
    );
  };

  useEffect(() => {

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(timer);
    };

  }, []);

  const currentHero = heroData[currentSlide];

  return (
    <section className="hero">

      {/* LEFT CONTENT */}

      <div className="hero-content">

        <p className="hero-small-text">
          Welcome to Foodie
        </p>

        <h1>
          {currentHero.title}
        </h1>

        <h2>
          {currentHero.subtitle}
        </h2>

        <p className="hero-description">
          {currentHero.description}
        </p>

        <button className="hero-button">
          {currentHero.buttonText}
        </button>

      </div>


      {/* RIGHT IMAGE */}

      <div className="hero-image-container">

        <img
          src={currentHero.image}
          alt={currentHero.title}
          className="hero-image"
        />

      </div>


      {/* LEFT ARROW */}

      <button
        className="hero-arrow hero-arrow-left"
        onClick={previousSlide}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>


      {/* RIGHT ARROW */}

      <button
        className="hero-arrow hero-arrow-right"
        onClick={nextSlide}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>


      {/* DOTS */}

      <div className="hero-dots">

        {heroData.map((hero, index) => (

          <button
            key={hero.id}
            className={`hero-dot ${
              currentSlide === index ? "active" : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          />

        ))}

      </div>

    </section>
  );
}

export default Hero;