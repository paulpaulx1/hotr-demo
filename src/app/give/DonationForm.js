"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ReCAPTCHA from "react-google-recaptcha";
import { Loader2 } from "lucide-react";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Card Element Styling
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#1e293b",
      fontFamily: "system-ui, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#94a3b8",
      },
    },
    invalid: {
      color: "#dc2626",
      iconColor: "#dc2626",
    },
  },
};

function DonationFormContent() {
  const stripe = useStripe();
  const elements = useElements();
  const recaptchaRef = React.useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    amount: "",
    customAmount: "",
  });

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Preset donation amounts
  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage("");
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setFormData((prev) => ({
      ...prev,
      amount: amount,
      customAmount: "",
    }));
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      customAmount: value,
      amount: value,
    }));
    setSelectedAmount(null);
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required";
    if (!formData.lastName.trim()) return "Last name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.address.trim()) return "Address is required";
    if (!formData.city.trim()) return "City is required";
    if (!formData.state.trim()) return "State is required";
    if (!formData.zipCode.trim()) return "Zip code is required";
    if (!formData.amount || parseFloat(formData.amount) <= 0)
      return "Please select or enter a donation amount";
    if (!agreedToPrivacy) return "Please agree to the privacy policy";
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

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded. Please refresh and try again.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      // Create payment intent on your server
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(parseFloat(formData.amount) * 100), // Convert to cents
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          recaptchaToken,
        }),
      });

      const { clientSecret, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Confirm the payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              address: {
                line1: formData.address,
                city: formData.city,
                state: formData.state,
                postal_code: formData.zipCode,
                country: "US",
              },
            },
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === "succeeded") {
        setSuccessMessage(
          "Thank you for your generous donation! A receipt has been sent to your email."
        );
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: "United States",
          amount: "",
          customAmount: "",
        });
        setSelectedAmount(null);
        setAgreedToPrivacy(false);
        elements.getElement(CardElement).clear();
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setRecaptchaToken(null);
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
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
          Donation Successful!
        </h3>
        <p className="text-slate-600 mb-6">{successMessage}</p>
        <button
          onClick={() => setSuccessMessage("")}
          className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Error Message */}
      {errorMessage && (
        <div className='bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md'>
          {errorMessage}
        </div>
      )}

      {/* Personal Information */}
      <div>
        <h3 className='text-lg font-medium text-slate-900 mb-4 pb-2 border-b border-slate-200'>
          Personal Information
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='firstName'
              className='block text-sm font-medium text-slate-700 mb-1'
            >
              First Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={formData.firstName}
              onChange={handleInputChange}
              className='w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent'
              required
            />
          </div>
          <div>
            <label
              htmlFor='lastName'
              className='block text-sm font-medium text-slate-700 mb-1'
            >
              Last Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={formData.lastName}
              onChange={handleInputChange}
              className='w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent'
              required
            />
          </div>
        </div>
        <div className='mt-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-slate-700 mb-1'
          >
            Email Address <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className='w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent'
            required
          />
        </div>
      </div>

      {/* Billing Address */}
      <div>
        <h3 className='text-lg font-medium text-slate-900 mb-4 pb-2 border-b border-slate-200'>
          Billing Address
        </h3>
        <div className='space-y-4'>
          <div>
            <label
              htmlFor='address'
              className='block text-sm font-medium text-slate-700 mb-1'
            >
              Street Address <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='address'
              name='address'
              value={formData.address}
              onChange={handleInputChange}
              className='w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent'
              required
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label
                htmlFor='city'
                className='block text-sm font-medium text-slate-700 mb-1'
              >
                City <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='city'
                name='city'
                value={formData.city}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent'
                required
              />
            </div>
            <div>
              <label
                htmlFor='state'
                className='block text-sm font-medium text-slate-700 mb-1'
              >
                State <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='state'
                name='state'
                value={formData.state}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent'
                required
              />
            </div>
            <div>
              <label
                htmlFor='zipCode'
                className='block text-sm font-medium text-slate-700 mb-1'
              >
                Zip Code <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='zipCode'
                name='zipCode'
                value={formData.zipCode}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent'
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Donation Amount */}
      <div>
        <h3 className='text-lg font-medium text-slate-900 mb-4 pb-2 border-b border-slate-200'>
          Donation Amount <span className='text-red-500'>*</span>
        </h3>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mb-4'>
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              type='button'
              onClick={() => handleAmountSelect(amount)}
              className={`py-3 px-4 rounded-md border-2 font-medium transition-all ${
                selectedAmount === amount
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-900'
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>
        <div>
          <label
            htmlFor='customAmount'
            className='block text-sm font-medium text-slate-700 mb-1'
          >
            Or enter custom amount
          </label>
          <div className='relative'>
            <span className='absolute left-4 top-2.5 text-slate-600'>$</span>
            <input
              type='number'
              id='customAmount'
              name='customAmount'
              value={formData.customAmount}
              onChange={handleCustomAmountChange}
              placeholder='0.00'
              min='1'
              step='0.01'
              className='w-full pl-8 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent'
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div>
        <h3 className='text-lg font-medium text-slate-900 mb-4 pb-2 border-b border-slate-200'>
          Payment Information
        </h3>
        <div className='bg-slate-50 p-4 rounded-md border border-slate-200'>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Credit Card <span className='text-red-500'>*</span>
          </label>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <p className='text-xs text-slate-500 mt-2'>
          Your payment information is encrypted and secure.
        </p>
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
      <div className='flex items-start'>
        <input
          type='checkbox'
          id='privacyPolicy'
          checked={agreedToPrivacy}
          onChange={(e) => setAgreedToPrivacy(e.target.checked)}
          className='mt-1 h-4 w-4 text-slate-900 focus:ring-slate-900 border-slate-300 rounded'
          required
        />
        <label htmlFor='privacyPolicy' className='ml-3 text-sm text-slate-600'>
          I agree to the{' '}
          <a
            href='/privacy'
            target='_blank'
            rel='noopener noreferrer'
            className='text-slate-900 underline hover:text-slate-700'
          >
            Privacy Policy
          </a>{' '}
          and consent to the processing of my personal data.{' '}
          <span className='text-red-500'>*</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className='pt-4'>
        <button
          type='submit'
          disabled={isProcessing || !stripe}
          className='w-full bg-[#6b2f2a] hover:[#4e1f1a] disabled:bg-slate-400 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center cursor-pointer'
        >
          {isProcessing ? (
            <>
              <Loader2 className='animate-spin mr-2' size={20} />
              Processing...
            </>
          ) : (
            `Donate $${formData.amount || '0.00'}`
          )}
        </button>
        <p className='text-xs text-center text-slate-500 mt-3'>
          Secure payment powered by Stripe
        </p>
      </div>
    </form>
  );
}

export default function DonationForm() {
  return (
    <Elements stripe={stripePromise}>
      <DonationFormContent />
    </Elements>
  );
}
