'use client'
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaStar, FaHistory, FaUser, FaEnvelope, FaPhone, FaCarSide, FaEdit, FaCog, FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';

function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    fullName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    rating: 3,
    totalRides: 42,
    history: [
      { date: "2025-03-12", origin: "Home", destination: "Office", fare: "1250", coRiders: 2 },
      { date: "2025-03-08", origin: "Office", destination: "Mall", fare: "875", coRiders: 3 },
      { date: "2025-03-01", origin: "Airport", destination: "Home", fare: "200", coRiders: 1 }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [expandedTrip, setExpandedTrip] = useState<number | null>(null);
  const [ratingDropdown, setRatingDropdown] = useState<number | null>(null);

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get JWT token from localStorage or cookies
        const token = localStorage.getItem('token');
        
        if (!token) {
          // Redirect to login if no token is found
          router.push('/login');
          return;
        }

        // Fetch user data from backend API using axios
        const response = await axios.get('http://localhost:5000/profile/get-profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const profileData = response.data.data;
        setUser(profileData.profile);
      } catch (err:unknown) {
        const error = err as AxiosError
        if (error.response) {
          //if server send response
          if (error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            router.push('/login');
            return;
          }
          setError(`Error ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
          // The request was made but no response was received
          setError('No response received from server. Please try again later.');
        } else {
          // Something happened in setting up the request
          setError(`Error: ${error.message}`);
        }
        console.error('Failed to fetch user data:', err);
      } finally {
        setLoading(false);
      }
    };

    // For demo purposes, simulate API call delay
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    // Comment this out when connecting to real API
    // fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#0b1018] to-[#1a1f2e] text-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-lg font-medium text-blue-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0b1018] text-white">
        <div className="p-8 border-2 border-red-500 rounded-xl bg-[#121418]">
          <h1 className="text-xl font-bold text-red-500">Error Loading Profile</h1>
          <p className="mt-4">{error}</p>
          <button 
            onClick={() => router.push('/login')}
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1018] to-[#1a1f2e] text-white pb-12">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0b1018]/80 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">My Profile</h1>
          </div>
          <div className="flex gap-3">
            <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-800">
              <Link href={`/profile/edit`}>
              <FaEdit size={18} />
              </Link>
              
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-800">
              <FaCog size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[#121418] to-[#1a1f2e] rounded-xl p-6 mb-8 shadow-2xl border border-gray-800">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0 relative">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-[#1e2330] shadow-lg">
                {user.fullName.charAt(0)}
              </div>
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold">{user.fullName}</h1>
              <p className="text-blue-400 text-lg mb-2">@{user.username}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm md:text-base">
                <div className="flex items-center text-gray-300">
                  <div className="p-1.5 rounded-full bg-blue-900/30 mr-2">
                    <FaEnvelope className="text-blue-400" size={14} />
                  </div>
                  {user.email}
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="p-1.5 rounded-full bg-blue-900/30 mr-2">
                    <FaPhone className="text-blue-400" size={14} />
                  </div>
                  {user.phone}
                </div>
              </div>

              <div className="mt-4 py-2 px-3 bg-blue-900/20 rounded-lg inline-flex items-center">
                <div className="text-yellow-400 mr-2 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar 
                      key={star}
                      className={`${star <= Math.floor(user.rating) ? 'text-yellow-400' : 'text-gray-600'} ${
                        star === Math.ceil(user.rating) && !Number.isInteger(user.rating) ? 'text-yellow-400/70' : ''
                      }`} 
                      size={16} 
                    />
                  ))}
                </div>
                <span className="text-white font-medium">{user.rating}</span>
                <span className="text-gray-400 ml-1">({user.totalRides} rides)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Statistics */}
        <div className="bg-gradient-to-br from-[#121418] to-[#131824] rounded-xl p-6 mb-8 shadow-xl border border-gray-800">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-blue-900/30 rounded-full mr-3">
              <FaCarSide className="text-blue-500" size={20} />
            </div>
            <h2 className="text-xl font-bold">Trip Statistics</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-[#1a1f2e]/80 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg border border-blue-900/20 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
              <p className="text-3xl font-bold text-blue-400">{user.totalRides}</p>
              <p className="text-gray-400 text-sm mt-1">Total Rides</p>
            </div>
            <div className="bg-[#1a1f2e]/80 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg border border-blue-900/20 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center">
                <p className="text-3xl font-bold text-yellow-400">{user.rating}</p>
                <span className="text-lg text-yellow-400 ml-1">★</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">Average Rating</p>
            </div>
            <div className="bg-[#1a1f2e]/80 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg border border-blue-900/20 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105">
              <p className="text-3xl font-bold text-green-400">12</p>
              <p className="text-gray-400 text-sm mt-1">Rides This Month</p>
            </div>
          </div>
        </div>
  
          {/* Recent Trips */}
        <div className="mb-6 flex border-b border-gray-800">
          
            <FaHistory className="mr-2" /> Recent Trips
          
        </div>

        {/* Content */}
        {  (
          <div className="space-y-4">
            {user.history.length > 0 ? (
              user.history.map((trip, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-[#121418] to-[#131824] p-5 rounded-xl shadow-md border border-gray-800 hover:border-blue-800 transition-all transform hover:translate-y-[-2px]"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-full bg-blue-900/30 mr-2">
                        <FaCalendarAlt className="text-blue-400" size={14} />
                      </div>
                      <span className="text-sm text-gray-300">{trip.date}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-full bg-blue-900/30 mr-2">
                        <FaUserFriends className="text-blue-400" size={14} />
                      </div>
                      <span className="text-sm text-gray-300">{trip.coRiders} co-riders</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <div className="flex items-center py-1.5">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3 shadow-md shadow-green-500/30"></div>
                        <p className="font-medium">{trip.origin}</p>
                      </div>
                      <div className="border-l-2 border-dashed border-gray-600 ml-1.5 my-1 h-8"></div>
                      <div className="flex items-center py-1.5">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3 shadow-md shadow-red-500/30"></div>
                        <p className="font-medium">{trip.destination}</p>
                      </div>
                    </div>
                    <div className="bg-blue-900/20 px-3 py-2 rounded-lg text-right">
                      <p className="text-xs text-gray-400 uppercase">Fare</p>
                      <p className="font-bold text-xl text-white">{trip.fare}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-700/50">
                    <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Trip Details
                    </button>
                    <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                      <FaStar className="mr-1" size={14} />
                      Rate Co-riders
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gradient-to-br from-[#121418] to-[#131824] p-8 rounded-xl text-center border border-gray-800 shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-blue-900/20">
                    <FaHistory className="text-blue-400" size={32} />
                  </div>
                </div>
                <p className="text-gray-300 text-lg mb-4">No trips yet. Start your riding journey!</p>
                <button className="bg-blue-600 hover:bg-blue-700 py-2.5 px-6 rounded-lg text-sm transition-colors shadow-lg shadow-blue-900/30 font-medium">
                  Find a Ride
                </button>
              </div>
            )}
            
            {user.history.length > 0 && (
              <div className="flex justify-center mt-6">
                <button className="flex items-center bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white py-2 px-4 rounded-full border border-gray-700 transition-colors">
                  View More Trips
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {/* {activeTab === 'ratings' && (
          <div className="bg-gradient-to-br from-[#121418] to-[#131824] rounded-xl p-6 shadow-xl border border-gray-800">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex flex-col items-center">
                <div className="relative w-36 h-36">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="3"
                      strokeDasharray={`${user.rating * 20}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{user.rating}</p>
                      <p className="text-xs text-gray-400">out of 5</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-300 text-center">Based on {user.totalRides} ratings</p>
              </div>
              
              <div className="flex-grow w-full md:w-auto">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-20 text-yellow-400 mr-2 flex">★★★★★</div>
                    <div className="flex-grow h-3 bg-gray-700 rounded-full">
                      <div className="h-full bg-yellow-400 rounded-full" style={{width: '70%'}}></div>
                    </div>
                    <span className="ml-2 text-gray-300 w-10 text-right">70%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 text-yellow-400 mr-2 flex">★★★★<span className="text-gray-600">★</span></div>
                    <div className="flex-grow h-3 bg-gray-700 rounded-full">
                      <div className="h-full bg-yellow-400 rounded-full" style={{width: '20%'}}></div>
                    </div>
                    <span className="ml-2 text-gray-300 w-10 text-right">20%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 text-yellow-400 mr-2 flex">★★★<span className="text-gray-600">★★</span></div>
                    <div className="flex-grow h-3 bg-gray-700 rounded-full">
                      <div className="h-full bg-yellow-400 rounded-full" style={{width: '8%'}}></div>
                    </div>
                    <span className="ml-2 text-gray-300 w-10 text-right">8%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 text-yellow-400 mr-2 flex">★★<span className="text-gray-600">★★★</span></div>
                    <div className="flex-grow h-3 bg-gray-700 rounded-full">
                      <div className="h-full bg-yellow-400 rounded-full" style={{width: '2%'}}></div>
                    </div>
                    <span className="ml-2 text-gray-300 w-10 text-right">2%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 text-yellow-400 mr-2 flex">★<span className="text-gray-600">★★★★</span></div>
                    <div className="flex-grow h-3 bg-gray-700 rounded-full">
                      <div className="h-full bg-yellow-400 rounded-full" style={{width: '0%'}}></div>
                    </div>
                    <span className="ml-2 text-gray-300 w-10 text-right">0%</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-900/40">
                  <h3 className="font-medium mb-2 text-blue-300">Recent Feedback</h3>
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm italic">"Great conversation and punctual!"</p>
                    <p className="text-gray-300 text-sm italic">"Really enjoyed the ride, very comfortable."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#0b1018]/80 backdrop-blur-md border-t border-gray-800 shadow-lg py-2 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-around">
            <button className="p-2 flex flex-col items-center text-gray-400 hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className="p-2 flex flex-col items-center text-gray-400 hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs mt-1">Search</span>
            </button>
            <button className="p-2 flex flex-col items-center text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs mt-1">Profile</span>
            </button>
            <button className="p-2 flex flex-col items-center text-gray-400 hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="text-xs mt-1">Alerts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;