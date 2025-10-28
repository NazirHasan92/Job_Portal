'use client'

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react'
import { Volume2, ChevronRight, ChevronLeft, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterOtpPage() {
  const router = useRouter()
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
  const [timer, setTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(countdown)
    }
  }, [timer])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]
    // Handle single character input
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
    // Handle arrow keys
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6)
    
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char
      }
    })
    setOtp(newOtp)

    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex(val => !val)
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const handleResend = () => {
    if (canResend) {
      setTimer(30)
      setCanResend(false)
      setOtp(new Array(6).fill(''))
      inputRefs.current[0]?.focus()
      console.log('Resending OTP...')
    }
  }

  const handleNext = () => {
    const otpValue = otp.join('')
    if (otpValue.length === 6) {
      // Save OTP for verification
      localStorage.setItem('otp', otpValue)
      console.log('OTP:', otpValue)
      
      // Navigate to profile creation
      router.push('/register/profile')
    }
  }

  const handleBack = () => {
    router.push('/register/phone')
  }

  const isOtpComplete = otp.every(digit => digit !== '')

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
            <div className="flex items-start justify-between mb-24">
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
              {/* Welcome Text */}
              <div className="mb-16">
                <h1 className="text-[56px] font-bold text-black mb-6 leading-tight">
                  Welcome Guest
                </h1>
                <p className="text-[24px] text-[#767676]">
                  Create a account for the job search
                </p>
              </div>

              {/* OTP Input Section */}
              <div className="mb-12">
                {/* Label */}
                <div className="flex items-center gap-3 mb-8">
                  <label className="text-[20px] font-medium text-black">
                    Enter the phone number
                  </label>
                </div>

                {/* OTP Input Boxes */}
                <div className="flex items-center gap-[30px] mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-[109px] h-[80px] text-center text-[32px] font-semibold border border-[#b5b5b5] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-transparent transition-all"
                    />
                  ))}
                  
                  {/* Audio Icon */}
                  <button
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Play audio"
                  >
                    <Volume2 className="w-[34px] h-[34px] text-gray-600" />
                  </button>
                </div>

                {/* Resend OTP */}
                <button
                  onClick={handleResend}
                  disabled={!canResend}
                  className={`text-[20px] font-medium transition-colors ${
                    canResend
                      ? 'text-primary-70 hover:text-primary-80 cursor-pointer'
                      : 'text-[#818181] cursor-not-allowed'
                  }`}
                >
                  Resend the OTP? {timer > 0 ? `${timer}s` : ''}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between max-w-[1075px] mb-16 mt-20">
                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 border border-secondary-70 hover:bg-secondary-10 text-black px-5 py-3 rounded-lg transition-colors h-[50px]"
                >
                  <ChevronLeft className="w-6 h-6" />
                  <span className="text-[18px]">Back</span>
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={!isOtpComplete}
                  className="flex items-center gap-2 bg-primary-50 hover:bg-primary-60 text-white px-12 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-[20px]">Next</span>
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Sign In Link */}
              <div className="text-center max-w-[1075px]">
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
          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-3">
              Welcome Guest
            </h1>
            <p className="text-lg text-[#767676]">
              Create a account for the job search
            </p>
          </div>

          {/* OTP Input Section */}
          <div className="mb-12">
            {/* Label */}
            <div className="flex items-center gap-2 mb-6">
              <label className="text-lg font-medium text-black">
                Enter the phone number
              </label>
            </div>

            {/* OTP Input Boxes - 3 per row on mobile */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="aspect-square text-center text-2xl font-semibold border border-[#b5b5b5] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-transparent transition-all"
                />
              ))}
            </div>

            {/* Audio Icon & Resend */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleResend}
                disabled={!canResend}
                className={`text-base font-medium transition-colors ${
                  canResend
                    ? 'text-primary-70 hover:text-primary-80 cursor-pointer'
                    : 'text-[#818181] cursor-not-allowed'
                }`}
              >
                Resend OTP? {timer > 0 ? `${timer}s` : ''}
              </button>

              <button
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                aria-label="Play audio"
              >
                <Volume2 className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-8">
            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!isOtpComplete}
              className="w-full flex items-center justify-center gap-2 bg-primary-50 hover:bg-primary-60 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-lg">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="w-full flex items-center justify-center gap-2 border border-secondary-70 hover:bg-secondary-10 text-black px-6 py-3 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-lg">Back</span>
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
