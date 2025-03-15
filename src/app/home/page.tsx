import React from 'react'
import Link from 'next/link'
import { FaCar, FaUserFriends } from 'react-icons/fa'

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-white">
          Welcome to RideShare
        </h1>
        <h2 className="text-center text-gray-400 mt-2">
          Choose your journey type
        </h2>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Get a Ride Option */}
          <Link href="/getRide" 
            className="flex flex-col items-center p-8 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-800 hover:border-blue-600">
            <div className="bg-gray-800 p-4 rounded-full">
              <FaUserFriends className="text-4xl text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-white mt-4">Get a Ride</h2>
            <p className="text-gray-400 text-center mt-2">
              Find available rides to your destination
            </p>
          </Link>

          {/* Offer a Ride Option */}
          <Link href="/offerRide"
            className="flex flex-col items-center p-8 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-800 hover:border-green-400">
            <div className="bg-gray-800 p-4 rounded-full">
              <FaCar className="text-4xl text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-white mt-4">Offer a Ride</h2>
            <p className="text-gray-400 text-center mt-2">
              Share your journey with others
            </p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default HomePage