'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiCheckCircle } from 'react-icons/fi';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  // Calculate discounted annual prices (2 months free)
  const premiumAnnual = Math.floor(9.99 * 10);
  const premiumPlusAnnual = Math.floor(19.99 * 10);
  
  // Toggle FAQs
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const toggleFAQ = (index: number): void => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choose The Right Plan For You</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're just getting started or looking for advanced features, we have a plan that fits your needs.
          </p>
          
          {/* Billing toggle - improved design */}
          <div className="mt-10 inline-flex items-center justify-center bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setIsAnnual(false)} 
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                !isAnnual 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsAnnual(true)} 
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
                isAnnual 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Annual
              <span className="ml-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch mb-16">
          {/* Free Plan */}
          <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-sm flex flex-col">
            <div className="mb-auto">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Free</h2>
              <p className="text-gray-600 mb-6">Get started with the basics</p>
              <p className="text-5xl font-bold mb-2 text-gray-900">$0</p>
              <p className="text-gray-700 mb-6">forever</p>
              <p className="text-gray-700 mb-8">
                Perfect for exploring our AI tools and creating your first CV.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">1 basic CV template</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">3 AI headshots per month</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">10 job searches per month</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">2 CV exports per month</p>
                  </div>
                </div>
                
                <div className="flex items-start text-gray-400">
                  <svg className="h-5 w-5 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-500">Job ad optimization</p>
                  </div>
                </div>
                
                <div className="flex items-start text-gray-400">
                  <svg className="h-5 w-5 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-500">AI cover letters</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Link 
              href="/signup" 
              className="block w-full py-3 px-4 bg-gray-100 text-gray-900 font-medium rounded-lg text-center hover:bg-gray-200 transition-colors"
            >
              Get Started for Free
            </Link>
          </div>
          
          {/* Premium Plan */}
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm border-2 border-indigo-600 relative lg:scale-105 z-10 flex flex-col">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white py-1 px-6 rounded-full text-sm font-medium">
              MOST POPULAR
            </div>
            
            <div className="mb-auto">
              <h2 className="text-2xl font-bold mb-2 text-indigo-600">Premium</h2>
              <p className="text-gray-600 mb-6">Everything you need</p>
              <p className="text-5xl font-bold mb-2 text-gray-900">${isAnnual ? premiumAnnual : '9.99'}</p>
              <p className="text-gray-700 mb-6">per {isAnnual ? 'year' : 'month'}</p>
              <p className="text-gray-700 mb-8">
                Ideal for active job seekers who need professional tools to stand out.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800"><strong>5</strong> professional CV templates</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800"><strong>20</strong> AI headshots per month</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">Unlimited job searches</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">Job ad optimization</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800"><strong>5</strong> AI cover letters per month</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800"><strong>15</strong> CV exports per month</p>
                  </div>
                </div>
                
                <div className="flex items-start text-gray-400">
                  <svg className="h-5 w-5 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-500">AI interview coaching</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Link 
              href={`/signup?plan=premium${isAnnual ? '&billing=annual' : ''}`}
              className="block w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg text-center hover:bg-indigo-700 transition-colors"
            >
              Get Premium
            </Link>
          </div>
          
          {/* Professional Plan */}
          <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-sm flex flex-col">
            <div className="mb-auto">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Professional</h2>
              <p className="text-gray-600 mb-6">For serious job seekers</p>
              <p className="text-5xl font-bold mb-2 text-gray-900">${isAnnual ? premiumPlusAnnual : '19.99'}</p>
              <p className="text-gray-700 mb-6">per {isAnnual ? 'year' : 'month'}</p>
              <p className="text-gray-700 mb-8">
                Complete suite of advanced tools for maximum career advancement.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800"><strong>All</strong> premium CV templates</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800"><strong>Unlimited</strong> AI headshots</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">Advanced job ad optimization</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800"><strong>Unlimited</strong> AI cover letters</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800"><strong>Unlimited</strong> CV exports</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">Unlimited interview coaching</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">Priority support</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Link 
              href={`/signup?plan=premiumplus${isAnnual ? '&billing=annual' : ''}`}
              className="block w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg text-center hover:opacity-90 transition-opacity"
            >
              Get Professional
            </Link>
          </div>
        </div>
        
        {/* Feature comparison table */}
        <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden border border-gray-200 mb-16">
          <h3 className="text-xl font-semibold mb-6 text-center">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider">Free</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-indigo-600 uppercase tracking-wider">Premium</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-purple-600 uppercase tracking-wider">Professional</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* CV Templates */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CV Templates</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">1 basic</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">5 professional</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">All templates</td>
                </tr>
                {/* CV Exports */}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CV Exports (PDF)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">2 per month</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">15 per month</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">Unlimited</td>
                </tr>
                {/* AI Headshots */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AI Headshots</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">3 per month</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">20 per month</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">Unlimited</td>
                </tr>
                {/* Job Ad Optimization */}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Job Ad Optimization</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <svg className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">Advanced</td>
                </tr>
                {/* AI Cover Letters */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AI Cover Letters</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">5 per month</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">Unlimited</td>
                </tr>
                {/* Job Search */}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Job Searches</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">10 per month</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">Unlimited</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">Unlimited</td>
                </tr>
                {/* Interview Coaching */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AI Interview Coach</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">Unlimited</td>
                </tr>
                {/* Priority Support */}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Priority Support</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Email</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">Email + Chat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* FAQ Section with dropdowns */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* FAQ 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(0)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-gray-900">Can I cancel my subscription anytime?</h3>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${openFAQ === 0 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQ === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-4 pt-2">
                  <p className="text-gray-700">
                    Yes, you can cancel your subscription at any time. You'll continue to have access to Premium features until the end of your billing period.
                  </p>
                </div>
              </div>
            </div>
            
            {/* FAQ 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(1)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-gray-900">What happens to my documents if I downgrade?</h3>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${openFAQ === 1 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQ === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-4 pt-2">
                  <p className="text-gray-700">
                    Your documents will remain in your account, but you'll only be able to access the features available in your current plan. You can still view all your saved documents.
                  </p>
                </div>
              </div>
            </div>
            
            {/* FAQ 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(2)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-gray-900">What's the difference between Premium and Professional?</h3>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${openFAQ === 2 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQ === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-4 pt-2">
                  <p className="text-gray-700">
                    Professional offers unlimited access to all features including unlimited AI headshots, cover letters, and the exclusive AI interview coach. It's ideal for serious job seekers who need comprehensive tools.
                  </p>
                </div>
              </div>
            </div>
            
            {/* FAQ 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(3)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-gray-900">Do you offer refunds?</h3>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${openFAQ === 3 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQ === 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-4 pt-2">
                  <p className="text-gray-700">
                    We offer a 14-day money-back guarantee if you're not satisfied with your subscription. Contact our support team to request a refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Career?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who have accelerated their job search with our AI-powered tools.
          </p>
          <Link 
            href="/signup" 
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-indigo-700 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
} 