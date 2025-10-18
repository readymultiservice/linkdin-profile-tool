
import React, { useState } from 'react';
import type { AppView } from '../types';
import { MailIcon } from './icons/MailIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface AdminLoginPageProps {
    onNavigate: (view: AppView) => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock admin login logic
        console.log("Attempting admin login with:", { email });
        // In a real app, you'd verify credentials. Here, we just navigate.
        onNavigate('admin');
    };

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-800">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <div>
                    <div className="flex justify-center">
                         <ShieldCheckIcon className="h-12 w-auto text-blue-600" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
                        Admin Panel Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-black">
                        Access the platform's control center.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MailIcon className="h-5 w-5 text-slate-400" />
                                </div>
                                <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-slate-300 placeholder-slate-500 text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Admin email address" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-slate-400" />
                                </div>
                                <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-slate-300 placeholder-slate-500 text-black rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700">
                            Secure Sign In
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm">
                    <button onClick={() => onNavigate('login')} className="font-medium text-blue-600 hover:text-blue-500">
                        &larr; Not an admin? Go to user login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
