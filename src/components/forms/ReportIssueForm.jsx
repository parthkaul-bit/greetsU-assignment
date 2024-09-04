// src/components/forms/ReportIssueForm.jsx
import React, { useContext, useState } from "react";
import { FeedbackContext } from "../../context/FeedbackContext";
import "./ReportIssueForm.css";

const ReportIssueForm = () => {
  const { currentPage, sections, submitFeedback } = useContext(FeedbackContext);
  const [section, setSection] = useState(currentPage || "");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = description.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    await submitFeedback({
      type: "Report an Issue",
      section,
      description,
    });
    setIsSubmitting(false);
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Report an Issue</h2>
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
        Describe the issue in detail
        <textarea
          placeholder="Write here..."
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= 1000) {
              setDescription(e.target.value);
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

export default ReportIssueForm;
