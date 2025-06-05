import React, { useState } from 'react';
import { createShortUrl } from '../api/shortUrl.api';
import { useSelector } from 'react-redux';
import { queryClient } from '../main'; // Assuming queryClient is correctly imported

// --- 1. Create a Simple Modal Component ---
// You can put this in a separate file (e.g., components/ErrorModal.jsx)
// and import it, or keep it in the same file for simplicity for now.
const ErrorModal = ({ message, onClose }) => {
  // Don't render the modal if there's no message or it's explicitly closed
  if (!message) return null;

  return (
    // Backdrop: fixed, covers whole screen, semi-transparent background
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-auto transform transition-all scale-100 opacity-100">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Error!</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- UrlForm Component ---
const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com");
  const [shortUrl, setShortUrl] = useState(null); // Initialize as null for clearer UI
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null); // This state will hold your error message for the modal
  const [customSlug, setCustomSlug] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  // --- 2. New state for modal visibility ---
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = async () => {
    try {
      // Clear previous states on new submission attempt
      setError(null);
      setShortUrl(null);
      setCopied(false);
      setShowErrorModal(false); // Hide any previous error modal

      // Ensure customSlug is only sent if it has a value, otherwise send null/undefined
      // This prevents sending an empty string as a slug if the user leaves the field blank
      const slugToSend = customSlug.trim() === '' ? null : customSlug.trim();

      const createdShortUrl = await createShortUrl(url, slugToSend);
      setShortUrl(createdShortUrl);
      queryClient.invalidateQueries({ queryKey: ['userUrls'] });

    } catch (err) {
      console.error("Error creating short URL on frontend:", err); // Still good for debugging in browser console

      const errorMessage = err.message || "An unexpected error occurred. Please try again.";

      setError(errorMessage);      // Set the error message
      setShowErrorModal(true);     // Show the modal
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // --- 3. Function to close the modal ---
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError(null); // Clear the error message when closing the modal
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >Shorten URL
      </button>

      {/* --- Remove the old inline error display or make it conditional --- */}
      {/* If you want to keep the red box when the modal ISN'T shown, but an error exists: */}
      {/* {!showErrorModal && error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )} */}
      {/* Or simply remove it if you always want the modal */}

      {isAuthenticated && (
        <div className="mt-4">
          <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="Enter custom slug"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${
                copied
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      {/* --- Render the new Error Modal --- */}
      <ErrorModal
        message={showErrorModal ? error : null} // Only pass message if modal should be shown
        onClose={handleCloseErrorModal}
      />

      {/* ... rest of the feature cards JSX ... */}
      {!isAuthenticated && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {/* Feature Card 1 */}
        <div className="text-center p-6 bg-white rounded-lg shadow-md md:col-span-3"> 
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
          <p className="text-gray-600 text-sm">Generate short URLs instantly with our optimized servers.</p>
        </div>

        {/* Feature Card 2 */}
        
        <div className="text-center p-6 bg-white rounded-lg shadow-md md:col-span-3"> 
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
          <p className="text-gray-600 text-sm">Your links are safe with enterprise-grade security.</p>
        </div>

        {/* Feature Card 3 */}
        <div className="text-center p-6 bg-white rounded-lg shadow-md md:col-span-3"> 
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Aliases</h3>
          <p className="text-gray-600 text-sm">Create memorable custom short links for your brand.</p>
        </div>

      {/* --- MODIFIED Feature Card for Unique Slugs --- */}
        {/* Added 'md:col-span-3' to make it span all 3 columns on medium screens and up */}
        <div className="text-center p-6 bg-white rounded-lg shadow-md md:col-span-3"> 
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9.172 7.828a4 4 0 015.656 0M12 21h.01M12 3h.01M21 12h.01M3 12h.01M8 4.077V4a2 2 0 012-2h4a2 2 0 012 2v.077m-1.687 1.687a4 4 0 01-5.656 0" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Make it Unique!</h3>
          <p className="text-gray-600 text-sm">Your custom slug must be unique globally. If it's taken, try another creative option!</p>
        </div>
      </div>
    )}
    </div>
  );
};

export default UrlForm;