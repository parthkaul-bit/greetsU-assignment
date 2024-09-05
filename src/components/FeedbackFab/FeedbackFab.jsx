import React, { useContext, useState } from "react";
import FeedbackOption from "../FeedbackOption/FeedbackOption";
import "./FeedbackFab.css";
import { FeedbackContext } from "../../context/FeedbackContext";
import ThanksMessage from "../ThanksMessage/ThanksMessage";
import RateUsCard from "../RateUsCard/RateUsCard";
import ContactUsForm from "../forms/ContactUsForm";
import GiveSuggestionForm from "../forms/GiveSuggestionForm";
import ShareFeedbackForm from "../forms/ShareFeedbackForm";
import ReportIssueForm from "../forms/ReportIssueForm";

const FeedbackFab = () => {
  const { currentPage, optionsConfig } = useContext(FeedbackContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleFab = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSelectedOption(null);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <div className="fab-container">
        {isOpen && (
          <div className="fab-options">
            {optionsConfig[currentPage]?.map((option) => (
              <FeedbackOption
                key={option}
                option={option}
                onSelect={handleOptionSelect}
              />
            ))}
          </div>
        )}
        <button
          className={`fab-button ${isOpen ? "open" : ""}`}
          onClick={toggleFab}
        >
          {isOpen ? "✕" : "＋"}
        </button>
      </div>

      {/* Render the selected form */}
      {selectedOption && (
        <div className="form-overlay">
          <div className="form-container">
            <button
              className="close-form-button"
              onClick={() => setSelectedOption(null)}
            >
              ✕
            </button>
            {/* Render the corresponding form based on selectedOption */}
            {selectedOption === "Report an Issue" && <ReportIssueForm />}
            {selectedOption === "Share Feedback" && <ShareFeedbackForm />}
            {selectedOption === "Give Suggestion" && <GiveSuggestionForm />}
            {selectedOption === "Contact Us" && <ContactUsForm />}
          </div>
        </div>
      )}

      {/* Thanks Message */}
      <ThanksMessage />

      {/* Rate Us Card */}
      <RateUsCard />
    </>
  );
};

export default FeedbackFab;
