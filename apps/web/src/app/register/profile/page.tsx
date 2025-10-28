'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { Volume2, ChevronRight, X, ImageIcon, Pencil } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterProfilePage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [locationEnabled, setLocationEnabled] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleNext = () => {
    if (name.trim()) {
      // Save profile data
      localStorage.setItem('profileName', name)
      localStorage.setItem('locationEnabled', locationEnabled.toString())
      if (profileImage) {
        localStorage.setItem('profileImage', profileImage)
      }
      console.log('Profile data:', { name, locationEnabled, profileImage })
      
      // Navigate to experience step (skipping categories for now)
      router.push('/register/experience')
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Side - Blue Section (Fixed Width) */}
        <div className="w-[527px] bg-primary-50 relative flex-shrink-0">
          <div className="relative h-full flex flex-col">
            {/* Text Content */}
            <div className="px-12 pt-20">
              <h2 className="text-[40px] font-bold text-white leading-[1.2] max-w-[448px]">
                Your Next Opportunity Is Just a Click Away
              </h2>
            </div>

            {/* Illustration at Bottom */}
            <div className="absolute bottom-0 left-0 w-full">
              <div className="relative w-[522px] h-[348px]">
                <Image
                  src="/assets/421.svg"
                  alt="Job Portal Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="flex-1 bg-white overflow-auto">
          <div className="max-w-[1400px] mx-auto px-16 py-16">
            {/* Header */}
            <div className="flex items-start justify-between mb-12">
              {/* Logo */}
              <div className="relative w-[236px] h-[66px]">
                <Image
                  src="/assets/logo.png"
                  alt="Job Portal Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>

              {/* Close Button */}
              <Link
                href="/"
                className="flex items-center gap-2 bg-error-500 hover:bg-error-600 text-white px-5 py-3 rounded-lg transition-colors"
              >
                <span className="text-[18px]">Close</span>
                <X className="w-5 h-5" />
              </Link>
            </div>

            {/* Main Content */}
            <div className="max-w-[1200px]">
              {/* Page Title */}
              <div className="mb-8">
                <h1 className="text-[56px] font-bold text-black mb-4 leading-tight">
                  Create Account
                </h1>
                <p className="text-[24px] text-[#767676]">
                  Complete the full profile set up for the job search
                </p>
              </div>

              {/* Progress Stepper */}
              <div className="flex items-center mb-16 max-w-[1075px]">
                {/* Step 1 - Profile (Active) */}
                <div className="flex flex-col items-center">
                  <div className="w-[37px] h-[37px] rounded-full bg-primary-50 flex items-center justify-center mb-3">
                    <span className="text-[24px] font-medium text-white">1</span>
                  </div>
                  <span className="text-[16px] font-medium text-black">Profile</span>
                </div>

                {/* Progress Line 1 */}
                <div className="flex-1 h-[5px] bg-[#d9d9d9] rounded-[4px] mx-4 max-w-[427px]" />

                {/* Step 2 - Categories */}
                <div className="flex flex-col items-center">
                  <div className="w-[37px] h-[37px] rounded-full bg-[#d9d9d9] flex items-center justify-center mb-3">
                    <span className="text-[24px] font-medium text-[#767676]">2</span>
                  </div>
                  <span className="text-[16px] font-medium text-[#818181]">Categories</span>
                </div>

                {/* Progress Line 2 */}
                <div className="flex-1 h-[5px] bg-[#d9d9d9] rounded-[4px] mx-4 max-w-[427px]" />

                {/* Step 3 - Experience */}
                <div className="flex flex-col items-center">
                  <div className="w-[37px] h-[37px] rounded-full bg-[#d9d9d9] flex items-center justify-center mb-3">
                    <span className="text-[24px] font-medium text-[#767676]">3</span>
                  </div>
                  <span className="text-[16px] font-medium text-[#818181]">Experience</span>
                </div>
              </div>

              {/* Profile Picture Upload */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <label className="text-[20px] font-medium text-black">
                    Upload your profile picture (Optional)
                  </label>
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Play audio"
                  >
                    <Volume2 className="w-[22px] h-[22px] text-gray-600" />
                  </button>
                </div>

                {/* Image Upload Area */}
                <div className="relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  <button
                    onClick={handleImageClick}
                    className="relative w-[131px] h-[131px] rounded-full bg-[#d9d9d9] flex items-center justify-center hover:bg-[#c9c9c9] transition-colors overflow-hidden"
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-[82px] h-[82px] text-gray-400" />
                    )}
                    
                    {/* Edit Icon */}
                    <div className="absolute bottom-2 right-2 w-[28px] h-[28px] bg-[#d9d9d9] rounded-[14px] flex items-center justify-center">
                      <Pencil className="w-[17px] h-[17px] text-gray-600" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Name Input */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <label htmlFor="name" className="text-[20px] font-medium text-black">
                    Enter the Name *
                  </label>
                </div>

                <div className="relative max-w-[953px]">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter the Name"
                    className="w-full h-[69px] px-3 border border-[#b5b5b5] rounded-[10px] text-[20px] text-black placeholder:text-[#aaaaaa] focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-transparent transition-all"
                  />
                  
                  {/* Audio Icon */}
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Play audio"
                  >
                    <Volume2 className="w-[32px] h-[32px] text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Location Access Toggle */}
              <div className="mb-20">
                <div className="flex items-center justify-between max-w-[953px]">
                  <div className="flex items-center gap-3">
                    <label htmlFor="location" className="text-[28px] font-medium text-black">
                      Enable the Location Access (Optional)
                    </label>
                    <button
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      aria-label="Play audio"
                    >
                      <Volume2 className="w-[30px] h-[30px] text-gray-600" />
                    </button>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    id="location"
                    onClick={() => setLocationEnabled(!locationEnabled)}
                    className={`relative w-[59px] h-[33px] rounded-full transition-colors ${
                      locationEnabled ? 'bg-primary-50' : 'bg-[#d9d9d9]'
                    }`}
                  >
                    <div
                      className={`absolute top-[2px] w-[29px] h-[29px] rounded-full bg-white shadow-md transition-transform ${
                        locationEnabled ? 'translate-x-[28px]' : 'translate-x-[2px]'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end max-w-[953px] mb-16">
                <button
                  onClick={handleNext}
                  disabled={!name.trim()}
                  className="flex items-center gap-2 bg-primary-50 hover:bg-primary-60 text-white px-12 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-[20px]">Next</span>
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Sign In Link */}
              <div className="text-center max-w-[953px]">
                <p className="text-[20px]">
                  <span className="text-black">Already have an account? </span>
                  <Link
                    href="/login"
                    className="text-primary-70 font-semibold hover:text-primary-80 transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Layout */}
      <div className="lg:hidden min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
          {/* Logo */}
          <div className="relative w-[140px] h-[40px]">
            <Image
              src="/assets/logo.png"
              alt="Job Portal Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>

          {/* Close Button */}
          <Link
            href="/"
            className="flex items-center gap-2 bg-error-500 hover:bg-error-600 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <span className="text-sm">Close</span>
            <X className="w-4 h-4" />
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white px-4 py-8 overflow-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">
              Create Account
            </h1>
            <p className="text-base text-[#767676]">
              Complete the full profile set up for the job search
            </p>
          </div>

          {/* Progress Stepper - Mobile */}
          <div className="flex items-center mb-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center mb-2">
                <span className="text-lg font-medium text-white">1</span>
              </div>
              <span className="text-xs font-medium text-black">Profile</span>
            </div>

            {/* Line 1 */}
            <div className="flex-1 h-1 bg-[#d9d9d9] mx-2" />

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#d9d9d9] flex items-center justify-center mb-2">
                <span className="text-lg font-medium text-[#767676]">2</span>
              </div>
              <span className="text-xs font-medium text-[#818181]">Categories</span>
            </div>

            {/* Line 2 */}
            <div className="flex-1 h-1 bg-[#d9d9d9] mx-2" />

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#d9d9d9] flex items-center justify-center mb-2">
                <span className="text-lg font-medium text-[#767676]">3</span>
              </div>
              <span className="text-xs font-medium text-[#818181]">Experience</span>
            </div>
          </div>

          {/* Profile Picture Upload */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <label className="text-base font-medium text-black">
                Upload profile picture (Optional)
              </label>
              <button
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Play audio"
              >
                <Volume2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <button
              onClick={handleImageClick}
              className="relative w-24 h-24 rounded-full bg-[#d9d9d9] flex items-center justify-center hover:bg-[#c9c9c9] transition-colors overflow-hidden"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-12 h-12 text-gray-400" />
              )}
              
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#d9d9d9] rounded-full flex items-center justify-center">
                <Pencil className="w-3.5 h-3.5 text-gray-600" />
              </div>
            </button>
          </div>

          {/* Name Input */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <label htmlFor="name-mobile" className="text-base font-medium text-black">
                Enter the Name *
              </label>
            </div>

            <div className="relative">
              <input
                id="name-mobile"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the Name"
                className="w-full h-14 px-3 pr-12 border border-[#b5b5b5] rounded-[10px] text-base text-black placeholder:text-[#aaaaaa] focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-transparent transition-all"
              />
              
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded transition-colors"
                aria-label="Play audio"
              >
                <Volume2 className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Location Access Toggle */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1">
                <label className="text-base font-medium text-black">
                  Enable Location (Optional)
                </label>
                <button
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Play audio"
                >
                  <Volume2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <button
                onClick={() => setLocationEnabled(!locationEnabled)}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  locationEnabled ? 'bg-primary-50' : 'bg-[#d9d9d9]'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                    locationEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Next Button */}
          <div className="mb-8">
            <button
              onClick={handleNext}
              disabled={!name.trim()}
              className="w-full flex items-center justify-center gap-2 bg-primary-50 hover:bg-primary-60 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-lg">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-base">
              <span className="text-black">Already have an account? </span>
              <Link
                href="/login"
                className="text-primary-70 font-semibold hover:text-primary-80 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Blue Decorative Section at Bottom */}
        <div className="bg-primary-50 py-8 px-4">
          <h2 className="text-2xl font-bold text-white text-center leading-tight">
            Your Next Opportunity Is Just a Click Away
          </h2>
        </div>
      </div>
    </div>
  )
}
