'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import {  FaUser, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-10 bg-[#0b1018]/80 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/home" className="flex items-center">
              {/* <FaCar className="h-8 w-8 text-gray-300" /> */}
              <span className="ml-2 text-xl font-bold text-white">RideShare</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link 
                href="/getRide" 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                Get a Ride
              </Link>
              <Link 
                href="/offerRide" 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                Offer a Ride
              </Link>
              <Link 
                href="/myRides" 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                My Rides
              </Link>
              <Link 
                href="/profile" 
                className="text-gray-300 hover:text-white p-2 rounded-full transition-colors"
              >
                <FaUser className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900">
            <Link 
              href="/getRide" 
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Ride
            </Link>
            <Link 
              href="/offerRide" 
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Offer a Ride
            </Link>
            <Link 
              href="/myRides" 
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              My Rides
            </Link>
            <Link 
              href="/profile" 
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar