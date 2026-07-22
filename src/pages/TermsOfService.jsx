import React from 'react';
import LegalLayout from '../components/LegalLayout'; 

const TermsOfService = () => {
  return (
    <LegalLayout currentPath="/terms-of-service">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Terms of Service</h2>
      
      <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-gray-600 dark:text-gray-300">
        <p>
          Welcome to <strong className="dark:text-white">Stryvenix</strong>. By accessing our website or utilizing our web design, AI, and automation services, you agree to be bound by these Terms of Service.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 sm:mt-8 mb-2 sm:mb-3">1. Services Provided</h3>
        <p>
          Stryvenix provides premium digital experiences, custom software engineering, AI solution integration, and business automation. The specific scope, deliverables, timelines, and fees for any project will be outlined in a separate Statement of Work (SOW) or project agreement.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 sm:mt-8 mb-2 sm:mb-3">2. Client Responsibilities</h3>
        <p>
          Clients agree to provide timely access to necessary resources, branding assets, API keys, and feedback required for the successful completion of web, AI, and automation projects. Delays in client feedback may result in adjusted project timelines.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 sm:mt-8 mb-2 sm:mb-3">3. Intellectual Property</h3>
        <p>
          Upon full payment, the client retains ownership of the final deliverables (e.g., website source code, custom automation scripts). Stryvenix retains the right to reuse generalized, non-proprietary code snippets, AI prompts, and foundational frameworks developed during the project. Stryvenix also reserves the right to showcase the completed work in our portfolio.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 sm:mt-8 mb-2 sm:mb-3">4. Limitation of Liability</h3>
        <p>
          Stryvenix shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our web platforms, AI solutions, or automated workflows. Clients are responsible for ensuring that any automated systems we build comply with their industry's specific regulations.
        </p>
      </div>
    </LegalLayout>
  );
};

export default TermsOfService;