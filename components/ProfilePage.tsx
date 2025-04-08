"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "@/types";
import { Button } from "./ui/button";

// Define User type directly to avoid import issues
interface User {
  name: string;
  email: string;
  id: string;
  photoURL?: string;
}

interface ProfilePageProps {
  user: User;
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
  const [imageError, setImageError] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 p-6 border-r border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-2">Account</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Manage your account info.</p>
            
            <nav className="space-y-2">
              <button
                className={`flex items-center w-full p-3 rounded-lg ${
                  activeTab === "profile" 
                    ? "bg-primary-100/10 text-primary-100" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>
              
              <button
                className={`flex items-center w-full p-3 rounded-lg ${
                  activeTab === "security" 
                    ? "bg-primary-100/10 text-primary-100" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab("security")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Security
              </button>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 p-6">
            {activeTab === "profile" ? (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile details</h2>
                
                {/* Profile section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Profile</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border border-gray-200">
                        {user.photoURL && !imageError ? (
                          <Image
                            src={user.photoURL}
                            alt={user.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                            onError={() => setImageError(true)}
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full bg-primary-100 flex items-center justify-center text-white text-xl">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                      </div>
                    </div>
                    <Button variant="outline">Update profile</Button>
                  </div>
                </div>
                
                {/* Email addresses section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Email addresses</h3>
                    <button className="text-gray-600 hover:text-gray-900">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-2">
                    <div>
                      <p>{user.email}</p>
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Primary</span>
                    </div>
                  </div>
                  <button className="flex items-center text-primary-100 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add email address
                  </button>
                </div>
                
                {/* Connected accounts section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Connected accounts</h3>
                    <button className="text-gray-600 hover:text-gray-900">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" className="mr-3">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                      </svg>
                      <div>
                        <p>Google</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center text-primary-100 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Connect account
                  </button>
                </div>
                
                {/* Subscription section */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Current plan</h3>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-medium">Free Tier</h4>
                        <p className="text-sm text-gray-500">Basic access to PrepWise features</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-6">Security settings</h2>
                
                {/* Password section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Password</h3>
                  <p className="text-gray-500 mb-4">
                    You are signed in using Google authentication. Password management is handled through your Google account.
                  </p>
                </div>
                
                {/* Two-factor authentication */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Two-factor authentication</h3>
                  <p className="text-gray-500 mb-4">
                    Additional security features will be available in future updates.
                  </p>
                  <Button variant="outline" disabled>Enable 2FA</Button>
                </div>
                
                {/* Sessions */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Active sessions</h3>
                  <div className="p-4 border border-gray-200 rounded-lg mb-4">
                    <div className="flex items-center">
                      <div className="p-2 mr-4 bg-gray-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Current session</p>
                        <p className="text-sm text-gray-500">Last activity: Just now</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
