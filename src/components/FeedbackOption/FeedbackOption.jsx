// src/components/FeedbackOption/FeedbackOption.jsx
import React from "react";
import "./FeedbackOption.css";

const FeedbackOption = ({ option, onSelect }) => {
  return (
    <button className="feedback-option-button" onClick={() => onSelect(option)}>
      {option}
    </button>
  );
};

export default FeedbackOption;
