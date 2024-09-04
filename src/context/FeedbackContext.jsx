// src/context/FeedbackContext.jsx
import React, { createContext, useState } from "react";

// Create the context
export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  // Assume currentPage is determined elsewhere in your app
  const [currentPage, setCurrentPage] = useState("Concept Card");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [optionsConfig, setOptionsConfig] = useState({
    "Landing Page": ["Contact Us"],
    "Concept Card": [
      "Contact Us",
      "Report an Issue",
      "Share Feedback",
      "Give Suggestion",
    ],
    // Add more pages as needed
  });

  const sections = ["Landing Page", "Concept Card", "Interview Question"];

  const submitFeedback = async (data) => {
    // Add page tracking
    const payload = {
      page: currentPage,
      ...data,
    };

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFeedbackSubmitted(true);
        setFeedbackType(data.type);
        // Reset form states if needed
      } else {
        // Handle errors
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        feedbackSubmitted,
        setFeedbackSubmitted,
        feedbackType,
        isLoggedIn,
        setIsLoggedIn,
        optionsConfig,
        setOptionsConfig,
        sections,
        submitFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
