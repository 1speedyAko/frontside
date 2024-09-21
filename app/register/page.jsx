'use client'

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL
export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}users/auth/users/`, {
        email: formData.email,
        password: formData.password,
        re_password: formData.confirmPassword,
      });
      router.push("/login");
    } catch (err) {
      setError("Error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="h-screen flex items-center justify-center bg-ebony px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold prime">
            Sign up here
          </h2>
        </div>
        <form className="mt-8" onSubmit={handleSignUp}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className=" gap-4">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="appearance rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'text':'password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="appearance rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <span className="absolute right-3 bottom-3 cursor-pointer"
                onClick={()=>setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
              </span>
            </div>
            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={confirmPasswordVisible ? 'text':'password'}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
              <span className="absolute bottom-3 right-3 cursor-pointer"
                onClick={()=>setConfirmPasswordVisible(!confirmPasswordVisible)}>
                {confirmPasswordVisible ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
              </span>
            </div>
          </div>
          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border mt-10 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm mt-6">
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
