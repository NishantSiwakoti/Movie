import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-4 md:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs md:text-sm">
          This project is for educational purposes only.
        </p>
        <p className="text-base mt-4">
          Developed by
          <a
            href="https://www.nishantshiwakoti.com.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 ml-1"
          >
            Nishant Siwakoti
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
