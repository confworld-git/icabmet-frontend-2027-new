import React from 'react'
import ConfettiCanvas from '../../components/ConfettiCanvas'
function DiscountConfetti() {
  return (
    <div><div className="md:rounded-xl md:p-6 md:mx-10 md:mt-12 bg-gradient-to-r from-orange-500 to-orange-600  p-5 h-60 md:h-46 ">
        <ConfettiCanvas>
          <div className="text-center flex flex-col justify-center items-center space-y-6">
            <h2
              data-aos="zoom-out"
              className="text-center text-2xl md:text-3xl text-white font-bold md:w-6xl"
            >
              Claim a <span className="text-blue-600">5% discount</span> on
              registration with CERADA's exclusive Premium Membership
            </h2>
            <div className="flex flex-row justify-between items-center space-x-6">
              <a
                data-aos="zoom-out"
                className="py-2 px-4 bg-blue-600 text-white hover:bg-white transition duration-500 hover:text-orange-500 rounded font-semibold"
                target="_blank"
                href="https://confworld.org/Student-Membership"
              >
                Student
              </a>
              <a
                data-aos="zoom-out"
                className="py-2 px-4 bg-blue-600 text-white hover:bg-white hover:text-orange-500 transition duration-500 rounded font-semibold"
                target="_blank"
                href="https://confworld.org/Professional-Membership"
              >
                Professional
              </a>
            </div>
          </div>
        </ConfettiCanvas>
      </div></div>
  )
}

export default DiscountConfetti