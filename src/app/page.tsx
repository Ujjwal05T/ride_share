import React from "react";

export default function Home() {
  return (
    <>
      <div className=" h-screen bg-white text-black">
        <header className=" ">
          <h1 className="text-4xl p-4 font-bold"> RideShare</h1>
          <p className="text-lg px-4 mt-2">
            Private experience at public prices
          </p>
        </header>

        <main >
          <section className=" mb-8 grid grid-cols-2">
            <div className="h-full justify-center items-center">
              <div >
                <button className="h-1/2 cursor-pointer bg-gradient-to-r from-black to-white p-2 hover:bg-blue-700 text-white font-bold py-2 w-lvh px-4 ">
                  Get a Ride
                </button>
              </div>
              <div>
                <button className="bg-gradient-to-r from-black to-white p-2 hover:bg-blue-700 text-white font-bold py-2 w-lvh px-4 rounded">
                  Give a Ride
                </button>
              </div>
            </div>
            <div
              className="bg-gray-800 p-4 border-r-2 h-[40rem] bg-cover bg-center"
              style={{ backgroundImage: "url('./LAnding_page.jpg')" }}
            ></div>
          </section>
        </main>
        <footer className="text-center p-4 bg-gray-800 text-gray-400">
          <p>&copy; 2025 RideShare. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
