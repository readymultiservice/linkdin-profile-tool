
import React, { useState } from 'react';
import type { AppView } from '../types';
import { LockClosedIcon } from './icons/LockClosedIcon';

interface ResetPasswordPageProps {
    onNavigate: (view: AppView) => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const validatePassword = (pass: string) => {
        // 8+ chars, uppercase, lowercase, number, symbol
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(pass);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be 8+ characters and contain an uppercase, lowercase, number, and symbol.');
            return;
        }

        // Mock API call to reset password with token
        console.log('Password has been successfully reset.');
        setSuccessMessage('Your password has been reset successfully. You can now sign in.');
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
                        Set a new password
                    </h2>
                </div>
                {successMessage ? (
                    <div className="text-center space-y-4">
                        <p className="text-green-600">{successMessage}</p>
                        <button
                            onClick={() => onNavigate('login')}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Proceed to Sign in
                        </button>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="new-password" className="sr-only">New password</label>
                                <div className="relative">
                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockClosedIcon className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="new-password"
                                        name="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-slate-300 placeholder-slate-500 text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="New password"
                                    />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="confirm-password" className="sr-only">Confirm new password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockClosedIcon className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-slate-300 placeholder-slate-500 text-black rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Set New Password
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;