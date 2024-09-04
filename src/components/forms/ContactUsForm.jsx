// src/components/forms/ContactUsForm.jsx
import React, { useContext, useState } from "react";
import { FeedbackContext } from "../../context/FeedbackContext";
import "./ContactUsForm.css";

const ContactUsForm = () => {
  const { isLoggedIn, submitFeedback } = useContext(FeedbackContext);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid =
    name.trim() !== "" &&
    query.trim() !== "" &&
    (isLoggedIn || mobile.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    await submitFeedback({
      type: "Contact Us",
      name,
      query,
      email: isLoggedIn ? "user@example.com" : email,
      mobile: isLoggedIn ? null : mobile,
    });
    setIsSubmitting(false);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
      <hr />
      <label>
        Name
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      {!isLoggedIn && (
        <>
          <label>
            Your Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Your Mobile Number
            <input
              type="tel"
              placeholder="1234567890"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </label>
        </>
      )}
      <label>
        What would you like to ask
        <textarea
          placeholder="Write your query..."
          value={query}
          onChange={(e) => {
            if (e.target.value.length <= 1000) {
              setQuery(e.target.value);
            }
          }}
          required
        ></textarea>
      </label>
      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ContactUsForm;
