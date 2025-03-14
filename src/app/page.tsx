import React from 'react';
import Link from 'next/link';
import { FaUsers, FaStar, FaHistory, FaShieldAlt } from 'react-icons/fa';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Share Your Ride, <span className="text-blue-600">Share The Journey</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Connect with travelers heading to the same destination. Save money, reduce emissions, 
              and make new connections along the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-center transition-all">
                Get Started
              </Link>
              <Link href="/about" className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-lg text-center transition-all">
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/assets/hero-image.svg" 
              alt="People sharing ride" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Ride Share?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-all">
              <div className="text-blue-600 text-3xl mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Shared Destinations</h3>
              <p className="text-gray-600">
                Match with riders heading to the same place and split the costs.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-all">
              <div className="text-blue-600 text-3xl mb-4">
                <FaStar />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Rate Co-travelers</h3>
              <p className="text-gray-600">
                Rate your experience and help build a trusted community.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-all">
              <div className="text-blue-600 text-3xl mb-4">
                <FaHistory />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Trip History</h3>
              <p className="text-gray-600">
                Keep track of all your past rides and experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Share Your Journey?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users already saving money and reducing their carbon footprint.
          </p>
          <Link href="/auth/signup" className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg inline-block transition-all">
            Sign Up Now
          </Link>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <FaShieldAlt className="text-blue-600 text-3xl mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Safe and Secure</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your safety is our priority. All users are verified and trips are monitored.
            Our rating system ensures quality experiences for everyone.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© 2025 RideShare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;