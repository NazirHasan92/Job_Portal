      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8">
          <h2 className="text-3xl sm:text-[40px] font-semibold text-center mb-4">How it Works</h2>
          <p className="text-sm sm:text-base text-[#717182] text-center mb-12 sm:mb-[105px] px-4">
            Getting a job is now simple — just follow these steps.
          </p>

          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8 lg:gap-[75px] max-w-[1400px] mx-auto">
            {/* Step 1 */}
            <div className="bg-neutral-50 border-4 border-white rounded-[20px] p-8 sm:p-12 w-full max-w-[425px] min-h-[400px] sm:min-h-[425px] relative shadow-lg lg:transform lg:-rotate-[5deg] flex flex-col">
              <div className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-12 xl:-right-16 bg-white rounded-2xl p-3 sm:p-4 border border-[#efefef] shadow-lg">
                <div className="flex gap-2 sm:gap-3">
                  <button className="px-2 sm:px-3 py-1.5 sm:py-2 border border-secondary-70 rounded-lg text-xs sm:text-base text-black whitespace-nowrap">
                    Register
                  </button>
                  <button className="px-2 sm:px-3 py-1.5 sm:py-2 bg-primary-50 text-white rounded-lg text-xs sm:text-base flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                    <LogIn className="w-3 h-3 sm:w-5 sm:h-5" />
                    Login
                  </button>
                </div>
              </div>
              <div className="lg:transform lg:rotate-[5deg] text-left mt-16 sm:mt-20 flex-1 flex flex-col justify-end">
                <p className="text-[#717182] text-base sm:text-xl font-semibold mb-2">Step 1</p>
                <h3 className="text-2xl sm:text-[32px] font-semibold mb-2 leading-tight">Create your profile</h3>
                <p className="text-lg sm:text-2xl text-black">
                  Just your name, skill, and phone number.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-neutral-50 border-4 border-white rounded-[20px] p-8 sm:p-12 w-full max-w-[425px] min-h-[400px] sm:min-h-[425px] shadow-lg flex flex-col items-center justify-center">
              <div className="w-24 h-24 sm:w-[136px] sm:h-[136px] mb-6 sm:mb-8 relative flex-shrink-0">
                <Image
                  src="/assets/recruitment.png"
                  alt="Get Matched"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-[#717182] text-base sm:text-xl font-semibold mb-2">Step 2</p>
              <h3 className="text-2xl sm:text-[32px] font-semibold mb-2 text-center leading-tight">Get Matched Instantly</h3>
              <p className="text-lg sm:text-2xl text-black text-center">
                Get job matches — See work near your area.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-neutral-50 border-4 border-white rounded-[20px] p-8 sm:p-12 w-full max-w-[425px] min-h-[400px] sm:min-h-[425px] shadow-lg relative lg:transform lg:rotate-[7deg] flex flex-col">
              <div className="absolute top-8 sm:top-12 right-8 sm:right-12 w-24 h-24 sm:w-[136px] sm:h-[136px] flex-shrink-0">
                <Image
                  src="/assets/success_1.png"
                  alt="Apply & Connect"
                  width={136}
                  height={136}
                  className="object-contain"
                />
              </div>
              <div className="lg:transform lg:-rotate-[7deg] text-left mt-32 sm:mt-40 flex-1 flex flex-col justify-end">
                <p className="text-[#717182] text-base sm:text-xl font-semibold mb-2">Step 3</p>
                <h3 className="text-2xl sm:text-[32px] font-semibold mb-2 leading-tight">Apply & Connect</h3>
                <p className="text-lg sm:text-2xl text-black">
                  Apply & Connect — Talk to employers directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
