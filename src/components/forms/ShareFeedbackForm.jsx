import React, { useContext, useState } from "react";
import { FeedbackContext } from "../../context/FeedbackContext";
import "./ShareFeedbackForm.css";

const ShareFeedbackForm = () => {
  const { isLoggedIn, submitFeedback } = useContext(FeedbackContext);
  const [feedback, setFeedback] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const isValid =
    feedback.trim().length > 0 &&
    (isLoggedIn || (!isLoggedIn && (anonymous || validateEmail(email))));

  function validateEmail(email) {
    // Simple email regex
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    if (!anonymous && !isLoggedIn && !validateEmail(email)) {
      setEmailError("Invalid email");
      return;
    }
    setIsSubmitting(true);
    await submitFeedback({
      type: "Share Feedback",
      feedback,
      anonymous: isLoggedIn ? !anonymous : false,
      email: isLoggedIn ? (anonymous ? null : "user@example.com") : email,
    });
    setIsSubmitting(false);
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Share Feedback</h2>
      <hr />
      <label>
        Your Feedback
        <textarea
          placeholder="Write here..."
          value={feedback}
          onChange={(e) => {
            if (e.target.value.length <= 1000) {
              setFeedback(e.target.value);
            }
          }}
          required
        ></textarea>
      </label>
      {isLoggedIn ? (
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />
          Send anonymously
        </label>
      ) : (
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
            required={!anonymous}
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

export default ShareFeedbackForm;
