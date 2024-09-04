// src/components/RateUsCard/RateUsCard.jsx
import React, { useState } from "react";
import "./RateUsCard.css";

const RateUsCard = () => {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Trigger to show the rate us card (e.g., after feedback submission)
  const showRateUs = () => {
    setVisible(true);
  };

  // Placeholder for showing the Rate Us card after feedback
  // In a real scenario, you might trigger this based on certain conditions
  // For demo purposes, let's show it when the component mounts
  React.useEffect(() => {
    // Example: show rate us card 2 seconds after component mounts
    const timer = setTimeout(showRateUs, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRating = (star) => {
    setRating(star);
  };

  const handleSubmit = () => {
    // Handle rating submission
    setSubmitted(true);
    setTimeout(() => setVisible(false), 2000);
  };

  if (!visible) return null;

  return (
    <div className="rateus-overlay">
      <div className="rateus-card">
        {!submitted ? (
          <>
            <button
              className="close-rateus-button"
              onClick={() => setVisible(false)}
            >
              ✕
            </button>
            <h3>Rate Us</h3>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? "filled" : ""}`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            {rating > 0 && (
              <button className="submit-rating-button" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </>
        ) : (
          <p>Thanks for your rating!</p>
        )}
      </div>
    </div>
  );
};

export default RateUsCard;
