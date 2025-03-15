'use client'
import React, { useState } from 'react'
import { FaMapMarkerAlt, FaCar, FaUser, FaClock, FaRupeeSign, FaSearch, FaExclamationCircle } from 'react-icons/fa'
import SearchSuggestion from '../../components/SearchSuggestion';
import axios from 'axios';


interface RideInterface {
  id: string;
  origin: string;
  destination: string;
  departure: string;
  fare: number;
  seatsAvailable: number;
  
}
function GetRidePage() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [availableRides, setAvailableRides] = useState([])

  const searchRides = async () => {
    if (!source.trim() || !destination.trim()) {
      setError('Please enter both pickup and drop locations');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await axios.get(`http://localhost:5000/rides/?origin=${source}&destination=${destination}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      });
      setAvailableRides(response.data.data.rides);
      setHasSearched(true);
      console.log(availableRides);
      setIsLoading(false);
      
      const count = response.data.data.count;
      if (response.data.data.count === 0) {
        console.log('No rides found');
      }
      
    } catch (err:any) {
      console.error('Error fetching rides:', err);
      setError(err.response?.data?.message || 'Failed to fetch rides. Please try again.');
      setIsLoading(false);
      setAvailableRides([]);
    }
  };

  const handleSearch = (e:any) => {
    e.preventDefault();
    searchRides();

  }
 


  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Search Section */}
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Find Available Rides</h1>
        
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <SearchSuggestion 
                placeholder="Enter pickup location"
                value={source}
                onChange={setSource}
              />
            </div>
            
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <SearchSuggestion 
                placeholder="Enter drop location"
                value={destination}
                onChange={setDestination}
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-lg flex items-center">
              <FaExclamationCircle className="mr-2" />
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center py-3 rounded-lg transition-colors ${
              isLoading 
                ? 'bg-gray-700 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </>
            ) : (
              <>
                <FaSearch className="mr-2" />
                Search Rides
              </>
            )}
          </button>
        </form>
      </div>

      {/* Available Rides Section */}
      {hasSearched && (
        <div className="max-w-4xl mx-auto mt-8">
          <h2 className="text-xl font-bold mb-4">Available Rides</h2>
          
          {isLoading ? (
            <div className="bg-gray-900 p-10 rounded-lg flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-400">Finding rides from {source} to {destination}...</p>
            </div>
          ) : 6 > 0 ? (
            <div className="space-y-4">
              {availableRides.map((ride:RideInterface) => (
                <div key={ride.id} className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-800">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      
                      <div className="flex items-center gap-2 text-gray-500">
                        <FaClock />
                        <span>{ride.departure}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <FaRupeeSign />
                      <span className="font-bold text-lg">{ride.fare}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <FaCar />
                    <span>{ride.seatsAvailable} seats available</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                      <p>{ride.origin} → {ride.destination}</p>
                    </div>
                    <button 
                      onClick={() => window.location.href = `/bookRide/${ride.id}`}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                    >
                      Book Ride
                    </button>
                  </div>
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
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                  onClick={() => {
                    setSource('');
                    setDestination('');
                  }}
                >
                  Clear Search
                </button>
                <button 
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                  onClick={searchRides}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GetRidePage