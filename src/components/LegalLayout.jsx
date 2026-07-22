import React from 'react';
import { Link } from 'react-router-dom';

const LegalLayout = ({ children, currentPath }) => {
  const links = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
  ];

  // Increased pt (padding-top) on the wrapper below to push content below the fixed navbar
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#020617] pt-32 pb-10 sm:pt-40 sm:pb-16 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 sm:mb-4">
            Legal & Policies
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
            Last updated: July 2026
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                currentPath === link.path
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/30'
                  : 'bg-white dark:bg-white/[0.05] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Content Container */}
        <div className="bg-white dark:bg-[#0B0F19] rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 dark:border-white/[0.06] p-5 sm:p-8 md:p-12 leading-relaxed text-slate-700 dark:text-slate-300">
          <div className="animate-fadeIn">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LegalLayout;