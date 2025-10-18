
import React, { useState } from 'react';
import { UserIcon } from './icons/UserIcon';
import { MailIcon } from './icons/MailIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { LogoutIcon } from './icons/LogoutIcon';

interface AccountSettingsPageProps {
  onBack: () => void;
  onLogout: () => void;
}

const AccountSettingsPage: React.FC<AccountSettingsPageProps> = ({ onBack, onLogout }) => {
    const [name, setName] = useState("Jane Doe");
    const [email, setEmail] = useState("jane.doe@example.com");
    // Placeholder states for password change
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    
    const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-slate-100";
    const labelClasses = "block text-sm font-medium text-slate-700 mb-1";
    
    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock password change logic
        alert("Password change functionality is a placeholder.");
    };

    const handleDeleteAccount = () => {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            alert("Account deletion is a placeholder action.");
            onLogout(); // Simulate logout after deletion
        }
    };

    return (
        <div className="bg-slate-50 py-12 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <button onClick={onBack} className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    &larr; Back to Home
                </button>
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Account Settings</h1>
                    <p className="mt-2 text-slate-600">Manage your profile, password, and account preferences.</p>
                </header>

                <div className="space-y-10">
                    {/* Profile Information */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-slate-800 border-b pb-3 mb-4 flex items-center">
                            <UserIcon className="h-6 w-6 mr-3 text-blue-600" />
                            Profile Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className={labelClasses}>Full Name</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className={inputClasses.replace('bg-slate-100', '')} />
                            </div>
                            <div>
                                <label htmlFor="email" className={labelClasses}>Email Address</label>
                                <div className="flex items-center space-x-2">
                                    <input type="email" id="email" value={email} readOnly className={inputClasses} />
                                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 whitespace-nowrap">Change Email</button>
                                </div>
                            </div>
                            <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                                Update Profile
                            </button>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                         <h2 className="text-xl font-bold text-slate-800 border-b pb-3 mb-4 flex items-center">
                            <LockClosedIcon className="h-6 w-6 mr-3 text-blue-600" />
                            Security
                        </h2>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label htmlFor="currentPassword" className={labelClasses}>Current Password</label>
                                <input type="password" id="currentPassword" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className={inputClasses.replace('bg-slate-100', '')} />
                            </div>
                             <div>
                                <label htmlFor="newPassword" className={labelClasses}>New Password</label>
                                <input type="password" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} className={inputClasses.replace('bg-slate-100', '')} />
                            </div>
                             <div>
                                <label htmlFor="confirmNewPassword" className={labelClasses}>Confirm New Password</label>
                                <input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} className={inputClasses.replace('bg-slate-100', '')} />
                            </div>
                            <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                                Change Password
                            </button>
                        </form>
                    </div>

                     {/* Account Actions */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-red-200">
                         <h2 className="text-xl font-bold text-slate-800 border-b pb-3 mb-4 flex items-center">
                            <LogoutIcon className="h-6 w-6 mr-3 text-red-600" />
                            Account Actions
                        </h2>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-slate-800">Delete your account</p>
                                <p className="text-sm text-slate-500">Permanently remove your account and all of its data.</p>
                            </div>
                            <button onClick={handleDeleteAccount} className="bg-transparent border border-red-600 text-red-600 font-semibold py-2 px-4 rounded-lg text-sm hover:bg-red-50 transition-colors">
                                Delete Account
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <div>
                                <p className="font-semibold text-slate-800">Logout</p>
                                <p className="text-sm text-slate-500">You will be returned to the login screen.</p>
                            </div>
                            <button onClick={onLogout} className="bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-slate-700 transition-colors">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettingsPage;
