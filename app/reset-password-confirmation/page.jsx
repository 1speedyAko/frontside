'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


const ResetPasswordConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setLoading(false);
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/users/auth/users/reset_password_confirm/',
        {
          uid,
          token,
          new_password: password,
        }
      );

      if (response.status === 204) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen bg-ebony `}>
      <div className="w-full max-w-md p-8 bg-ebony rounded-lg shadow-md ">
        <h2 className={`text-3xl prime font-bold text-center mb-6 `}>Password Reset</h2>
        {success ? (
          <p className="text-center text-green-500">Password reset successful. Redirecting to login...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-indigo-600">
                New Password
              </label>
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                autoComplete="new-password"
                className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <div className="mb-4 relative">
              <label htmlFor="confirm-password" className="block text-indigo-600">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type={confirmPasswordVisible ? 'text' : 'password'}
                autoComplete="new-password"
                className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="relative">
              <button
                type="submit"
                className={`w-full py-2 bg-indigo-600 text-white rounded-lg ${loading ? 'opacity-50' : ''}`}
                disabled={loading}
              >
                Reset Password
              </button>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordConfirmation;
