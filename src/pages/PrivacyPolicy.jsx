import React from 'react';
import LegalLayout from '../components/LegalLayout'; 

const PrivacyPolicy = () => {
  return (
    <LegalLayout currentPath="/privacy-policy">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Privacy Policy</h2>
      
      <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-gray-600 dark:text-gray-300">
        <p>
          At <strong className="dark:text-white">Stryvenix</strong>, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website, AI solutions, web development, and automation services.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 sm:mt-8 mb-2 sm:mb-3">1. Information We Collect</h3>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc pl-4 sm:pl-5 space-y-2">
          <li><strong className="dark:text-white">Personal Identification Information:</strong> Name, email address, phone number, and company details provided via contact forms or project inquiries.</li>
          <li><strong className="dark:text-white">Usage Data:</strong> Information on how you interact with our website, including IP addresses, browser types, and pages visited.</li>
          <li><strong className="dark:text-white">Project Data:</strong> Information, code, or datasets you provide to us necessary for executing web development, AI modeling, or automation tasks.</li>
        </ul>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 sm:mt-8 mb-2 sm:mb-3">2. How We Use Your Information</h3>
        <ul className="list-disc pl-4 sm:pl-5 space-y-2">
          <li>To provide and maintain our services.</li>
          <li>To communicate with you regarding project updates, proposals, and support.</li>
          <li>To improve our website, AI algorithms, and service offerings.</li>
          <li>To fulfill legal and regulatory obligations.</li>
        </ul>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 sm:mt-8 mb-2 sm:mb-3">3. AI and Automation Specifics</h3>
        <p>
          As an AI and automation agency, we may process data to build, train, or deploy automated workflows and machine learning models on your behalf. Any proprietary data provided by clients for these purposes remains the property of the client and is never used to train generalized models for other clients without explicit consent.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 sm:mt-8 mb-2 sm:mb-3">4. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <div className="bg-gray-50 dark:bg-white/[0.02] p-4 sm:p-6 rounded-xl sm:rounded-2xl mt-4 border border-gray-100 dark:border-white/[0.05] shadow-sm break-words">
          <p className="mb-2"><strong className="text-gray-800 dark:text-gray-200">Email:</strong> contact@stryvenix.com</p>
          <p><strong className="text-gray-800 dark:text-gray-200">Location:</strong> Bangalore, India</p>
        </div>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPolicy;