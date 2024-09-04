// src/components/ThanksMessage/ThanksMessage.jsx
import React, { useContext, useEffect, useState } from "react";
import { FeedbackContext } from "../../context/FeedbackContext";
import "./ThanksMessage.css";

const ThanksMessage = () => {
  const { feedbackSubmitted, feedbackType } = useContext(FeedbackContext);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (feedbackSubmitted) {
      switch (feedbackType) {
        case "Report an Issue":
          setMessage(
            "Thanks for bringing the issue to our attention. We'll review it shortly and provide an update soon!"
          );
          break;
        case "Share Feedback":
          setMessage("Thanks for your valuable feedback!");
          break;
        case "Give Suggestion":
          setMessage("Thanks for your valuable suggestion!");
          break;
        case "Contact Us":
          setMessage("We will get back to you as soon as possible!");
          break;
        default:
          setMessage("Thank you!");
      }
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedbackSubmitted, feedbackType]);

  if (!visible) return null;

  return (
    <div className="thanks-message">
      <p>{message}</p>
    </div>
  );
};

export default ThanksMessage;
