import React from 'react';
import LegalLayout from '../components/LegalLayout';

const CookiePolicy = () => {
  return (
    <LegalLayout currentPath="/cookie-policy">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Cookie Policy</h2>
      
      <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-gray-600 dark:text-gray-300">
        <p>
          This Cookie Policy explains how <strong className="dark:text-white">Stryvenix</strong> uses cookies and similar technologies to recognize you when you visit our website.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 sm:mt-8 mb-2 sm:mb-3">1. What are Cookies?</h3>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide reporting information.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 sm:mt-8 mb-2 sm:mb-3">2. How We Use Cookies</h3>
        <p>We use cookies for the following purposes:</p>
        <ul className="list-disc pl-4 sm:pl-5 space-y-2">
          <li><strong className="dark:text-white">Essential Cookies:</strong> Strictly necessary for the website to function, such as routing traffic or maintaining security.</li>
          <li><strong className="dark:text-white">Performance & Analytics Cookies:</strong> To understand how visitors interact with our site, track performance metrics, and improve our user interface and content.</li>
          <li><strong className="dark:text-white">Functional Cookies:</strong> To remember your preferences, such as language or region settings.</li>
        </ul>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 sm:mt-8 mb-2 sm:mb-3">3. Managing Cookies</h3>
        <p>
          You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
        </p>
      </div>
    </LegalLayout>
  );
};

export default CookiePolicy;