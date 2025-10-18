
import React, { useState } from 'react';
import type { AppView } from '../types';
import { LinkedInIcon } from './icons/LinkedInIcon';

interface SignupPageProps {
    onNavigate: (view: AppView) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setIsSuccess(false);

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        // Password complexity validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setMessage("Password must be 8+ characters and contain an uppercase, lowercase, number, and a special symbol (@$!%*?&).");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        if (!agreedToTerms) {
            setMessage("You must agree to the Terms of Service and Privacy Policy.");
            return;
        }

        // Mock API call
        console.log("Creating account for:", { fullName, email });
        setMessage("Account created successfully! A verification email has been sent. Please sign in.");
        setIsSuccess(true);
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
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-black">
                        Already have an account?{' '}
                        <button onClick={() => onNavigate('login')} className="font-medium text-blue-600 hover:text-blue-500">
                           Sign in
                        </button>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                     <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="full-name" className="sr-only">Full name</label>
                            <input id="full-name" name="name" type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Full name" />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" required value={password} onChange={e => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Choose a strong password" />
                        </div>
                         <div>
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <input id="confirm-password" name="confirm-password" type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-black rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Re-enter password" />
                        </div>
                    </div>

                    <p className="text-xs text-center text-black">Use 8+ characters, with an uppercase, lowercase, number and symbol.</p>

                     {message && <p className={`text-sm text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="terms" name="terms" type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} required
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-medium text-black">I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a></label>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                           Create account
                        </button>
                    </div>
                </form>

                 <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-slate-50 text-black">Or continue with</span>
                    </div>
                </div>

                <div>
                     <button
                        type="button"
                        className="w-full inline-flex justify-center py-3 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-black hover:bg-slate-50"
                    >
                        <LinkedInIcon className="h-5 w-5 mr-2 text-[#0077B5]" />
                        Sign up with LinkedIn
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;