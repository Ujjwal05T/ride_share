'use client'
import React, { useState } from 'react'
import { FaHistory, FaClock, FaMapMarkerAlt, FaRupeeSign, FaUser } from 'react-icons/fa'

function MyRidesPage() {

    const [activeTab, setActiveTab] = useState('current')

  const currentRides = [
    {
      id: 1,
      type: 'offering',
      source: 'IITI Main Gate',
      destination: 'Indore Airport',
      date: '2024-03-20',
      time: '14:00',
      price: 300,
      seats: 3,
      requests: [
        { id: 1, name: 'John Doe', seats: 2 },
        { id: 2, name: 'Jane Smith', seats: 1 }
      ]
    }
  ]

  const bookedRides = [
    {
      id: 1,
      driver: 'Mark Wilson',
      source: 'IITI Main Gate',
      destination: 'Railway Station',
      date: '2024-03-21',
      time: '10:00',
      price: 150,
      status: 'confirmed'
    }
  ]

  const rideHistory = [
    {
      id: 1,
      type: 'taken',
      driver: 'Alice Brown',
      source: 'IITI Main Gate',
      destination: 'Phoenix Mall',
      date: '2024-03-15',
      price: 200,
      completed: true
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl font-bold mb-4">My Rides</h1>
        
        <div className="flex space-x-4 border-b border-gray-800">
          {['current', 'booked', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab 
                  ? 'text-white border-b-2 border-gray-300' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">

        {activeTab === 'current' && (
          <div className="space-y-6">
            {currentRides.map(ride => (
              <div key={ride.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                      Offering Ride
                    </span>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-gray-400 mr-2" />
                        <span>{ride.source} → {ride.destination}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="text-gray-400 mr-2" />
                        <span>{ride.date} at {ride.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <FaRupeeSign className="text-gray-400" />
                      <span className="text-xl font-bold">{ride.price}</span>
                    </div>
                    <span className="text-gray-400">{ride.seats} seats left</span>
                  </div>
                </div>


                {ride.requests.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Ride Requests</h3>
                    <div className="space-y-3">
                      {ride.requests.map(request => (
                        <div key={request.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center">
                            <FaUser className="text-gray-400 mr-2" />
                            <span>{request.name}</span>
                            <span className="ml-2 text-gray-400">({request.seats} seats)</span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md transition-colors">
                              Accept
                            </button>
                            <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md transition-colors">
                              Decline
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'booked' && (
          <div className="space-y-6">
            {bookedRides.map(ride => (
              <div key={ride.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaUser className="text-gray-400 mr-2" />
                      <span>Driver: {ride.driver}</span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      <span>{ride.source} → {ride.destination}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-gray-400 mr-2" />
                      <span>{ride.date} at {ride.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <FaRupeeSign className="text-gray-400" />
                      <span className="text-xl font-bold">{ride.price}</span>
                    </div>
                    <span className="text-green-500">{ride.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        {activeTab === 'history' && (
          <div className="space-y-6">
            {rideHistory.map(ride => (
              <div key={ride.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800 opacity-80">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaHistory className="text-gray-400 mr-2" />
                      <span>{ride.type === 'taken' ? 'Ride Taken' : 'Ride Offered'}</span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      <span>{ride.source} → {ride.destination}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-gray-400 mr-2" />
                      <span>{ride.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <FaRupeeSign className="text-gray-400" />
                      <span className="text-xl font-bold">{ride.price}</span>
                    </div>
                    {ride.completed && (
                      <span className="text-gray-400">Completed</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyRidesPage