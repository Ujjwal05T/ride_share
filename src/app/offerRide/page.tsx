'use client'
import React, { useState } from 'react'
import { FaMapMarkerAlt, FaClock, FaRupeeSign, FaUsers } from 'react-icons/fa'

function OfferRidePage() {
  const [rideData, setRideData] = useState({
    origin: '',
    destination: '',
    date: '',
    fare: '',
    seatsAvailable: '',
    description: ''
  })



  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/rides/offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(rideData),
      })

      if (response.ok) {
        alert('Ride offered successfully!')
        setRideData({
          origin: '',
          destination: '',
          date: '',
          fare: '',
          seatsAvailable: '',
          description: ''
        })
      }
    } catch (error) {
      console.error('Error offering ride:', error)
      alert('Failed to offer ride. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Offer a Ride</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* origin Input */}
          <div className="relative">
            <label className="block text-gray-400 mb-2">Pickup Location</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                value={rideData.origin}
                onChange={(e) => setRideData({...rideData, origin: e.target.value})}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 rounded-lg border border-gray-800 focus:ring-2 focus:ring-gray-700 outline-none"
                placeholder="Enter pickup location"
                required
              />
            </div>
          </div>

          {/* Destination Input */}
          <div className="relative">
            <label className="block text-gray-400 mb-2">Destination</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                value={rideData.destination}
                onChange={(e) => setRideData({...rideData, destination: e.target.value})}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 rounded-lg border border-gray-800 focus:ring-2 focus:ring-gray-700 outline-none"
                placeholder="Enter destination"
                required
              />
            </div>
          </div>

          {/* Time Input */}
          <div className="relative">
            <label className="block text-gray-400 mb-2">date Time</label>
            <div className="relative">
              <FaClock className="absolute left-3 top-3 text-gray-500" />
              <input
                type="datetime-local"
                value={rideData.date}
                onChange={(e) => setRideData({...rideData, date: e.target.value})}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 rounded-lg border border-gray-800 focus:ring-2 focus:ring-gray-700 outline-none"
                required
              />
            </div>
          </div>

          {/* fare Input */}
          <div className="relative">
            <label className="block text-gray-400 mb-2">fare per Seat</label>
            <div className="relative">
              <FaRupeeSign className="absolute left-3 top-3 text-gray-500" />
              <input
                type="number"
                value={rideData.fare}
                onChange={(e) => setRideData({...rideData, fare: e.target.value})}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 rounded-lg border border-gray-800 focus:ring-2 focus:ring-gray-700 outline-none"
                placeholder="Enter fare per seat"
                required
                min="0"
              />
            </div>
          </div>

          {/* dateseatsAvailableAvailable Input */}
          <div className="relative">
            <label className="block text-gray-400 mb-2">Available seats</label>
            <div className="relative">
              <FaUsers className="absolute left-3 top-3 text-gray-500" />
              <input
                type="number"
                value={rideData.seatsAvailable}
                onChange={(e) => setRideData({...rideData, seatsAvailable: e.target.value})}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 rounded-lg border border-gray-800 focus:ring-2 focus:ring-gray-700 outline-none"
                placeholder="Enter number of seats available"
                required
                min="1"
                max="6"
              />
            </div>
          </div>

          {/* Description Input */}
          <div className="relative">
            <label className="block text-gray-400 mb-2">Additional Details</label>
            <textarea
              value={rideData.description}
              onChange={(e) => setRideData({...rideData, description: e.target.value})}
              className="w-full p-4 bg-gray-900 rounded-lg border border-gray-800 focus:ring-2 focus:ring-gray-700 outline-none"
              placeholder="Add any additional information about the ride"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-lg transition-colors font-medium"
          >
            Offer Ride
          </button>
        </form>
      </div>
    </div>
  )
}

export default OfferRidePage