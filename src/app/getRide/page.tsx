'use client'
import React, { useState } from 'react'
import { FaMapMarkerAlt, FaCar, FaUser, FaClock, FaRupeeSign } from 'react-icons/fa'

function GetRidePage() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  
  // Mock data for available rides
  const availableRides = [
    {
      id: 1,
      driver: "John Doe",
      source: "IITI Main Gate",
      destination: "Indore Railway Station",
      departure: "10:00 AM",
      price: 150,
      seatsAvailable: 3,
    },
    {
        id: 2,
        driver: "Jane Smith",
        source: "IITI Main Gate",
        destination: "Indore Airport",
        departure: "11:30 AM",
        price: 300,
        seatsAvailable: 2,
      },{
        id: 2,
        driver: "Jane Smith",
        source: "IITI Main Gate",
        destination: "Indore Airport",
        departure: "11:30 AM",
        price: 300,
        seatsAvailable: 2,
      },
      {
        id: 2,
        driver: "Jane Smith",
        source: "IITI Main Gate",
        destination: "Indore Airport",
        departure: "11:30 AM",
        price: 300,
        seatsAvailable: 2,
      }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6">
    {/* Search Section */}
    <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Find Available Rides</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Enter pickup location"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-gray-600 outline-none"
          />
        </div>
        
        <div className="relative">
          <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-gray-600 outline-none"
          />
        </div>
      </div>

      <button className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg transition-colors">
        Search Rides
      </button>
    </div>

    {/* Available Rides Section */}
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Available Rides</h2>
      
      {availableRides.length > 0 ? (
    <div className="space-y-4">
      {availableRides.map((ride) => (
        <div key={ride.id} className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-800">
          {/* ...existing ride card content... */}
        </div>
      ))}
    </div>
  ) : (
    <div className="bg-gray-900 p-8 rounded-lg text-center">
      <div className="text-gray-400 mb-4">
        <FaCar className="inline-block text-4xl mb-2" />
        <p className="text-lg">No rides available for this route</p>
      </div>
      <p className="text-gray-500">
        Try changing your search criteria or check back later
      </p>
      <button 
        className="mt-4 bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition-colors"
        onClick={() => window.location.reload()}
      >
        Refresh Results
      </button>
    </div>
  )}

      <div className="space-y-4">
        {availableRides.map((ride) => (
          <div key={ride.id} className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaUser className="text-gray-400" />
                  <span className="font-semibold">{ride.driver}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <FaClock />
                  <span>{ride.departure}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FaRupeeSign />
                <span className="font-bold text-lg">{ride.price}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <FaCar />
              <span>{ride.seatsAvailable} seats available</span>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                <p>{ride.source} → {ride.destination}</p>
              </div>
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors">
                Book Ride
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default GetRidePage