// src/components/forms/GiveSuggestionForm.jsx
import React, { useContext, useState } from "react";
import { FeedbackContext } from "../../context/FeedbackContext";
import "./GiveSuggestionForm.css";

const GiveSuggestionForm = () => {
  const { isLoggedIn, currentPage, sections, submitFeedback } =
    useContext(FeedbackContext);
  const [section, setSection] = useState(currentPage || "");
  const [suggestion, setSuggestion] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const isValid =
    suggestion.trim().length > 0 &&
    (isLoggedIn || (!isLoggedIn && (validateEmail(email) || false)));

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    if (!isLoggedIn && !validateEmail(email)) {
      setEmailError("Invalid email");
      return;
    }
    setIsSubmitting(true);
    await submitFeedback({
      type: "Give Suggestion",
      section,
      suggestion,
      email: isLoggedIn ? "user@example.com" : email,
    });
    setIsSubmitting(false);
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Give Suggestion</h2>
      <hr />
      <label>
        Choose a section
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          required
        >
          {sections.map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Your Suggestion
        <textarea
          placeholder="Write here..."
          value={suggestion}
          onChange={(e) => {
            if (e.target.value.length <= 1000) {
              setSuggestion(e.target.value);
            }
          }}
          required
        ></textarea>
      </label>
      {!isLoggedIn && (
        <label>
          Your Email
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError && validateEmail(e.target.value)) {
                setEmailError("");
              }
            }}
            required
          />
          {emailError && <span className="error-message">{emailError}</span>}
        </label>
      )}
      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default GiveSuggestionForm;
