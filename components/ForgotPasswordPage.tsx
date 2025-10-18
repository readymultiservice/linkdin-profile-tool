
import React, { useState } from 'react';
import type { AppView } from '../types';
import { MailIcon } from './icons/MailIcon';

interface ForgotPasswordPageProps {
    onNavigate: (view: AppView) => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        // This is a mock API call.
        console.log(`Password reset requested for: ${email}`);
        setMessage('If an account with this email exists, a password reset link has been sent.');
    };

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="flex justify-center">
                         <svg className="h-12 w-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.375a9.375 9.375 0 01-9.375-9.375c0-5.183 4.192-9.375 9.375-9.375s9.375 4.192 9.375 9.375-4.192 9.375-9.375 9.375zm0-16.875a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm-1.125 7.5a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
                        Reset your password
                    </h2>
                    <p className="mt-2 text-center text-sm text-black">
                        Enter your email to receive a reset link.
                    </p>
                </div>
                {!message ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MailIcon className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-slate-300 placeholder-slate-500 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Send Reset Link
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center bg-green-50 p-4 rounded-md">
                        <p className="text-sm font-medium text-green-800">{message}</p>
                         {/* This button is for demo purposes to navigate to the reset page without a real email link */}
                         <button onClick={() => onNavigate('reset-password')} className="mt-2 text-xs text-blue-600 hover:underline">
                            (Proceed to Reset Page)
                        </button>
                    </div>
                )}
                <div className="text-center text-sm">
                    <button onClick={() => onNavigate('login')} className="font-medium text-blue-600 hover:text-blue-500">
                        &larr; Back to Sign in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;