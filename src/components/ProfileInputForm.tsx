import React from 'react';
import type { ProfileData, Experience } from '../types';
import { TrashIcon } from './icons/TrashIcon';

interface ProfileInputFormProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const ProfileInputForm: React.FC<ProfileInputFormProps> = ({ profileData, setProfileData, onSubmit, isLoading }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [name]: value } : exp
      ),
    }));
  };

  const addExperience = () => {
    if (profileData.experiences.length >= 6) {
        alert("A maximum of 6 experiences is allowed.");
        return;
    }
    setProfileData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { id: Date.now(), jobTitle: '', company: '', description: '' }],
    }));
  };

  const removeExperience = (id: number) => {
    setProfileData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id),
    }));
  };

  const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
  const labelClasses = "block text-sm font-medium text-black mb-1";

  return (
    <form onSubmit={(e) => {e.preventDefault(); onSubmit();}} className="space-y-6">
      <div>
        <label htmlFor="fullName" className={labelClasses}>Full Name</label>
        <input type="text" id="fullName" name="fullName" value={profileData.fullName} onChange={handleInputChange} className={inputClasses} placeholder="e.g., Jane Doe" />
      </div>
      <div>
        <label htmlFor="headline" className={labelClasses}>Headline</label>
        <input type="text" id="headline" name="headline" value={profileData.headline} onChange={handleInputChange} className={inputClasses} placeholder="e.g., Senior Software Engineer at Tech Corp" />
      </div>
      <div>
        <label htmlFor="summary" className={labelClasses}>Summary / About</label>
        <textarea id="summary" name="summary" value={profileData.summary} onChange={handleInputChange} rows={5} className={inputClasses} placeholder="A short bio about your professional journey..."></textarea>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-black mb-2">Work Experience</h3>
        <div className="space-y-4">
          {profileData.experiences.map((exp, index) => (
            <div key={exp.id} className="p-4 border border-slate-200 rounded-lg space-y-3 relative">
                {profileData.experiences.length > 1 && (
                    <button type="button" onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-black hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50">
                        <TrashIcon className="h-5 w-5" />
                    </button>
                )}
              <div>
                <label htmlFor={`jobTitle-${exp.id}`} className={labelClasses}>Job Title</label>
                <input type="text" id={`jobTitle-${exp.id}`} name="jobTitle" value={exp.jobTitle} onChange={(e) => handleExperienceChange(exp.id, e)} className={inputClasses} placeholder="e.g., Product Manager" />
              </div>
              <div>
                <label htmlFor={`company-${exp.id}`} className={labelClasses}>Company</label>
                <input type="text" id={`company-${exp.id}`} name="company" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, e)} className={inputClasses} placeholder="e.g., Innovate Inc." />
              </div>
              <div>
                <label htmlFor={`description-${exp.id}`} className={labelClasses}>Description</label>
                <textarea id={`description-${exp.id}`} name="description" value={exp.description} onChange={(e) => handleExperienceChange(exp.id, e)} rows={4} className={inputClasses} placeholder="Describe your responsibilities and achievements..."></textarea>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addExperience} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 transition">
          + Add another experience
        </button>
      </div>
      
      <div>
        <label htmlFor="skills" className={labelClasses}>Skills</label>
        <textarea id="skills" name="skills" value={profileData.skills} onChange={handleInputChange} rows={3} className={inputClasses} placeholder="e.g., React, TypeScript, Project Management, Agile..."></textarea>
      </div>

      <div>
        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center">
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : 'Analyze & Enhance Profile'}
        </button>
      </div>
    </form>
  );
};

export default ProfileInputForm;