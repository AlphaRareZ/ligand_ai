"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { 
  Hourglass, 
  ShieldCheck, 
  Gauge, 
  Mail, 
  Building2, 
  Lock, 
  Eye, 
  User
} from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  
  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form States (matching your backend schema)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Keeping affiliation for the UI, though it's not in the current backend schema. 
  // You can easily add it to the fetch body later if your backend updates.
  const [affiliation, setAffiliation] = useState(''); 

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('https://auth.aml2ligand.online/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password, 
          firstName, 
          lastName 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors || 'Registration failed. Please check your inputs.');
      }

      const data = await response.json();

      // If your backend automatically logs the user in and returns tokens upon registration:
      if (data.accessToken) {
        Cookies.set('accessToken', data.accessToken, { secure: true, sameSite: 'strict' });
        if (data.refreshToken) {
          Cookies.set('refreshToken', data.refreshToken, { secure: true, sameSite: 'strict', expires: 30 });
        }
        router.push('/lab');
      } else {
        // If the backend just creates the account and expects a manual login, route to sign-in:
        router.push('/sign-in');
      }
      
    } catch (err: any) {
      setErrorMsg(err.errors?.map((e: any) => e.message).join('\n') || err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#11141c] text-slate-300 font-sans">
      
      {/* Left Panel - Branding & Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0d2149] relative overflow-hidden flex-col justify-center">
        
        {/* Absolute Header - Logo */}
        <div className="absolute top-12 left-12 xl:left-24 flex items-center gap-3 text-white">
          <div className="bg-white text-blue-900 p-1.5 rounded text-sm font-bold flex items-center justify-center">
            <Hourglass size={20} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-wide">
            AML <sub className="text-xs bottom-0">2</sub> Ligand
          </span>
        </div>

        {/* Main Centered Content */}
        <div className="px-12 xl:px-24 w-full max-w-2xl z-10">
          <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
            Accelerate <br/> Molecular Discovery
          </h1>
          <p className="text-lg text-blue-100/80 mb-12 leading-relaxed max-w-md">
            Harness the power of high-fidelity computational biology and AI-driven ligand analysis to unlock breakthrough insights in record time.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-white/5 p-2 rounded-full text-blue-200 mt-1">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-blue-50 mt-1 font-medium">Institutional grade security and compliance protocols.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/5 p-2 rounded-full text-blue-200 mt-1">
                <Gauge size={20} />
              </div>
              <div>
                <p className="text-blue-50 mt-1 font-medium">Real-time binding affinity predictions and docking simulations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Absolute Footer - Copyright */}
        <div className="absolute bottom-12 left-12 xl:left-24 text-sm text-blue-200/50">
          © 2024 Ligand AI Research Lab. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 py-12">
        <div className="w-full max-w-md mx-auto">
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-sm text-slate-400">
              Join the research platform or <Link href="/sign-in" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">Sign in to your account</Link>
            </p>
          </div>

          {/* Error Message Display */}
          {errorMsg && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 text-red-400 text-sm rounded-lg">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* Split Names to match Schema */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-slate-500" />
                  </div>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane" 
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] text-slate-900 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white">Last Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe" 
                    required
                    className="w-full px-4 py-3 bg-[#f0f4f8] text-slate-900 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-slate-500" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu" 
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] text-slate-900 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white">Institutional Affiliation</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 size={16} className="text-slate-500" />
                </div>
                <input 
                  type="text" 
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  placeholder="Harvard Medical School, Pfizer, etc." 
                  className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] text-slate-900 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-slate-500" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  minLength={6}
                  className="w-full pl-10 pr-10 py-3 bg-[#1e2333] border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#1e5eff] hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-[#1e5eff] text-white font-semibold py-3 rounded-lg transition-colors mt-6 text-sm flex justify-center items-center"
            >
              {isLoading ? 'Creating Account...' : 'Register Account'}
            </button>
          </form>

          <p className="mt-10 text-center text-xs text-slate-500">
            By registering, you agree to our <a href="#" className="underline hover:text-slate-400">Terms of Service</a> and <a href="#" className="underline hover:text-slate-400">Privacy Policy</a>.
          </p>
          
        </div>
      </div>
    </div>
  );
}