"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const recaptchaRef = React.useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    heardAbout: "",
    hasStayed: false,
    isAffiliated: false,
    interests: {
      groupRetreat: false,
      overnight: false,
      rentSpace: false,
      filmPhoto: false,
      other: false,
    },

    // ✅ NEW fields
    affiliationOrg: "",
    affiliationLocation: "",
    stayedDetails: "",
    requestedDates: "",
    groupSize: "",

    message: "",
  });

  const [privacyAccepted, setPrivacyAccepted] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name.startsWith("interest-")) {
      const interestKey = name.replace("interest-", "");
      setFormData((prev) => ({
        ...prev,
        interests: {
          ...prev.interests,
          [interestKey]: checked,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrorMessage("");
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required";
    if (!formData.lastName.trim()) return "Last name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.phone.trim()) return "Phone number is required";
    if (!formData.heardAbout.trim())
      return "Please tell us how you heard about us";

    // Check if at least one interest is selected
    const hasInterest = Object.values(formData.interests).some(
      (val) => val === true
    );
    if (!hasInterest) return "Please select at least one area of interest";

    // Conditional requirements
    if (formData.isAffiliated) {
      if (!formData.affiliationOrg.trim())
        return "Please tell us what church or organization you’re affiliated with";
      if (!formData.affiliationLocation.trim())
        return "Please tell us where that organization is located";
    }

    if (formData.hasStayed) {
      if (!formData.stayedDetails.trim())
        return "Please tell us when you stayed and what retreat/event it was";
    }

    const wantsScheduling =
      formData.interests.groupRetreat ||
      formData.interests.overnight ||
      formData.interests.rentSpace ||
      formData.interests.filmPhoto;

    if (wantsScheduling) {
      if (!formData.requestedDates.trim())
        return "Please tell us what dates you are interested in";
      if (!formData.groupSize.trim())
        return "Please tell us approximately how many people";
    }

    if (!formData.message.trim()) return "Please provide a message";
    if (privacyAccepted !== "yes")
      return "You must accept the Privacy Policy to continue";
    if (!recaptchaToken) return "Please complete the reCAPTCHA verification";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      setSuccessMessage(
        "Thank you for contacting us! We'll get back to you within 1-2 business days."
      );

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        heardAbout: "",
        hasStayed: false,
        isAffiliated: false,
        interests: {
          groupRetreat: false,
          overnight: false,
          rentSpace: false,
          filmPhoto: false,
          other: false,
        },

        affiliationOrg: "",
        affiliationLocation: "",
        stayedDetails: "",
        requestedDates: "",
        groupSize: "",

        message: "",
      });

      setPrivacyAccepted("");
      if (recaptchaRef.current) recaptchaRef.current.reset();
      setRecaptchaToken(null);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successMessage) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-serif font-medium text-slate-900 mb-3">
          Message Sent Successfully!
        </h3>
        <p className="text-slate-600 mb-6">{successMessage}</p>
        <button
          onClick={() => setSuccessMessage("")}
          className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const wantsScheduling =
    formData.interests.groupRetreat ||
    formData.interests.overnight ||
    formData.interests.rentSpace ||
    formData.interests.filmPhoto;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
          {errorMessage}
        </div>
      )}

      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-4 pb-2 border-b border-slate-200">
          Your Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="heardAbout"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            How did you hear about House of the Redeemer?{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            id="heardAbout"
            name="heardAbout"
            value={formData.heardAbout}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            required
          >
            <option value="">Select an option</option>
            <option value="search">Search Engine (Google, Bing, etc.)</option>
            <option value="social">Social Media</option>
            <option value="friend">Friend or Colleague</option>
            <option value="church">Church or Religious Organization</option>
            <option value="event">Attended an Event</option>
            <option value="website">Another Website</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Experience Questions */}
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-4 pb-2 border-b border-slate-200">
          Your Experience
        </h3>

        <div className="space-y-3">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="hasStayed"
              name="hasStayed"
              checked={formData.hasStayed}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 text-slate-900 focus:ring-slate-900 border-slate-300 rounded"
            />
            <label htmlFor="hasStayed" className="ml-3 text-sm text-slate-700">
              Have you stayed at the House or held a retreat or event here
              before?
            </label>
          </div>

          {formData.hasStayed && (
            <div className="ml-7">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                When did you stay, and what retreat/event?{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="stayedDetails"
                value={formData.stayedDetails}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="e.g. June 2023 — Diocesan retreat"
              />
            </div>
          )}

          <div className="flex items-start">
            <input
              type="checkbox"
              id="isAffiliated"
              name="isAffiliated"
              checked={formData.isAffiliated}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 text-slate-900 focus:ring-slate-900 border-slate-300 rounded"
            />
            <label
              htmlFor="isAffiliated"
              className="ml-3 text-sm text-slate-700"
            >
              Are you affiliated with a church or a non-profit?
            </label>
          </div>

          {formData.isAffiliated && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-7">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Church / organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="affiliationOrg"
                  value={formData.affiliationOrg}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="e.g. St. Mark’s Church / ABC Nonprofit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="affiliationLocation"
                  value={formData.affiliationLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="City, State"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Areas of Interest */}
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-4 pb-2 border-b border-slate-200">
          What are you interested in? <span className="text-red-500">*</span>
        </h3>

        <div className="space-y-3">
          {[
            ["groupRetreat", "Holding a group retreat at the House"],
            ["overnight", "Staying overnight at the House"],
            ["rentSpace", "Renting space at the House for my event"],
            ["filmPhoto", "Film & photography at the House"],
            ["other", "Other (please indicate below)"],
          ].map(([key, label]) => (
            <div className="flex items-start" key={key}>
              <input
                type="checkbox"
                id={`interest-${key}`}
                name={`interest-${key}`}
                checked={formData.interests[key]}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-slate-900 focus:ring-slate-900 border-slate-300 rounded"
              />
              <label
                htmlFor={`interest-${key}`}
                className="ml-3 text-sm text-slate-700"
              >
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduling Details (free text) */}
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-4 pb-2 border-b border-slate-200">
          Scheduling Details
          {wantsScheduling && <span className="text-red-500"> *</span>}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              What dates are you interested in?
              {wantsScheduling && <span className="text-red-500"> *</span>}
            </label>
            <input
              type="text"
              name="requestedDates"
              value={formData.requestedDates}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              placeholder="e.g. Feb 12–14, or any weekend in March"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              How many people?
              {wantsScheduling && <span className="text-red-500"> *</span>}
            </label>
            <input
              type="text"
              name="groupSize"
              value={formData.groupSize}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              placeholder="e.g. 2, 8–10, ~25"
            />
          </div>
        </div>

        {!wantsScheduling && (
          <p className="text-xs text-slate-500 mt-2">
            (Optional unless you’re requesting a stay, retreat, event rental, or
            film/photo.)
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={6}
          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-vertical"
          placeholder="Please provide details about your inquiry..."
          required
        />
      </div>

      {/* reCAPTCHA */}
      <div>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={handleRecaptchaChange}
        />
      </div>

      {/* Privacy Policy Agreement */}
      <div>
        <h3 className="text-sm font-medium text-slate-900 mb-3">
          Before submitting this form, please review and acknowledge that you
          accept our Privacy Policy <span className="text-red-500">*</span>
        </h3>
        <p className="text-sm text-slate-700 mb-3">
          I have read and accept the{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 underline hover:text-slate-700"
          >
            Privacy Policy
          </a>
          .
        </p>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="privacy-yes"
              name="privacyAccepted"
              value="yes"
              checked={privacyAccepted === "yes"}
              onChange={(e) => setPrivacyAccepted(e.target.value)}
              className="h-4 w-4 text-slate-900 focus:ring-slate-900 border-slate-300"
              required
            />
            <label
              htmlFor="privacy-yes"
              className="ml-2 text-sm text-slate-700"
            >
              Yes
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="privacy-no"
              name="privacyAccepted"
              value="no"
              checked={privacyAccepted === "no"}
              onChange={(e) => setPrivacyAccepted(e.target.value)}
              className="h-4 w-4 text-slate-900 focus:ring-slate-900 border-slate-300"
            />
            <label htmlFor="privacy-no" className="ml-2 text-slate-700">
              No
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#6b2f2a] hover:bg-[#4e1f1a] disabled:bg-slate-400 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </div>
    </form>
  );
}
