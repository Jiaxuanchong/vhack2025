import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import fblogo from "../assets/fblogo.png";
import googlelogo from "../assets/googlelogo.png";
import logo from "../assets/logo.png";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); 

  
  const handleSignup = () => {
    navigate("/survey"); // Navigate to the dashboard after signing up
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#09001b] to-[#170f2e] text-white">
      {/* Left Side (Illustration) */}
      <div className="w-1/2 flex flex-col items-start justify-center p-12 bg-gradient-to-br  text-white relative">
      {/* Logo Section */}
      <div className="absolute top-6 left-8 flex items-center space-x-3">
        <img src={logo} alt="SwiftTrade Logo" className="w-6 h-auto opacity-90" />
        <p className="text-x0.5 font-medium tracking-wide">SwiftTrade</p>
      </div>

      {/* Quote Section */}
      <div className="max-w-lg pl-18">
        <p className="text-3xl font-bold leading-snug">
          "Risk comes from <span className="text-purple-400">not knowing</span> what you're doing."
        </p>
        <p className="text-lg text-gray-400 mt-4 font-medium italic">– Warren Buffett</p>
      </div>
    </div>


      {/* Right Side (Signup Form) */}
      <div className="w-1/2 flex items-center justify-center pr-10 pt-4  overflow-auto">
        <div className="w-full max-w-md bg-[#1b1135] p-6 rounded-lg shadow-lg mt-4">
          <h2 className="text-3xl font-bold text-center mb-1">SIGN UP</h2>
          <p className=" italic text-center mb-4">to SwiftTrade explore more</p>

          <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-1/2 p-3 bg-[#2a1f46] rounded-lg border border-gray-500 text-white"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-1/2 p-3 bg-[#2a1f46] rounded-lg border border-gray-500 text-white"
          />
        </div>

          <input type="text" placeholder="Username" className="w-full p-3 bg-[#2a1f46] rounded-lg border border-gray-500 text-white mb-4" />

          <div className="relative mb-4">
            <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full p-3 bg-[#2a1f46] rounded-lg border border-gray-500 text-white pr-10" />
            <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-400" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative mb-6">
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className="w-full p-3 bg-[#2a1f46] rounded-lg border border-gray-500 text-white pr-10" />
            <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-400" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Button to Navigate to Another Page */}
          <button onClick={handleSignup} className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-400 rounded-lg font-bold">
            Create Account
          </button>

          <div className="text-center my-4 text-gray-400">Or continue with</div>
          <div className="flex gap-4">
            <button className="flex-1 py-3 bg-[#2a1f46] rounded-lg font-bold flex items-center justify-center gap-2">
              <img src={googlelogo} alt="Google" className="h-5 w-5" /> Google
            </button>
            <button className="flex-1 py-3 bg-[#2a1f46] rounded-lg font-bold flex items-center justify-center gap-2">
              <img src={fblogo} alt="Facebook" className="h-5 w-5" /> Facebook
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-4">
            By registering you agree to our <span className="text-blue-300">Terms and Conditions</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
