'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

// Declare the lottie type for TypeScript
declare global {
  interface Window {
    lottie: any
  }
}

export default function Home() {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAnimationsInitialized, setIsAnimationsInitialized] = useState(false)
  const constructionRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)

  // Initialize progress bar animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        return prevProgress >= 100 ? 0 : prevProgress + 1
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // Initialize Lottie animations after script is loaded
  useEffect(() => {
    if (
      isLoaded &&
      !isAnimationsInitialized &&
      constructionRef.current &&
      loadingRef.current &&
      codeRef.current
    ) {
      try {
        // Construction animation
        window.lottie.loadAnimation({
          container: constructionRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'https://assets9.lottiefiles.com/packages/lf20_kkflmtur.json', // Developer building website animation
        })

        // Loading animation for the progress bar
        window.lottie.loadAnimation({
          container: loadingRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          // Using a code/development loading animation
          path: 'https://assets4.lottiefiles.com/packages/lf20_szlepvdh.json',
        })

        // Code animation
        window.lottie.loadAnimation({
          container: codeRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'https://assets10.lottiefiles.com/packages/lf20_3vbOcw.json', // Coding animation
        })

        setIsAnimationsInitialized(true)
      } catch (error) {
        console.error('Error initializing Lottie animations:', error)
      }
    }
  }, [isLoaded, isAnimationsInitialized])

  return (
    <>
      {/* Load Lottie script */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js"
        onLoad={() => setIsLoaded(true)}
        strategy="afterInteractive"
      />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-4 overflow-hidden relative">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

        <div className="max-w-4xl w-full mx-auto text-center space-y-8 relative z-10">
          {/* Main container with glass effect */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-gray-800/50 shadow-xl">
            {/* Main Lottie animation container */}
            <div className="flex justify-center mb-4">
              <div
                ref={constructionRef}
                className="w-64 h-64 md:w-72 md:h-72"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400">
              Portfolio Under Construction
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mt-4">
              I'm currently building something{' '}
              <span className="font-semibold text-blue-400">amazing</span>.
              Please check back soon!
            </p>

            {/* Custom progress bar with Lottie animation */}
            <div className="relative mt-8 mb-6">
              <div className="w-full max-w-md mx-auto bg-gray-800/70 rounded-full h-6 overflow-hidden backdrop-blur-sm border border-gray-700/50">
                <div
                  className="bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div
                ref={loadingRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
              />
            </div>
          </div>

          {/* Secondary content container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800/50 shadow-xl">
            <div ref={codeRef} className="w-full h-56" />

            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <h2 className="text-xl font-semibold text-blue-300 mb-2">
                  Coming Soon
                </h2>
                <p className="text-gray-300">
                  My portfolio is currently in development. I'm crafting a
                  showcase of my projects and skills.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-gray-400 text-sm uppercase tracking-wide font-medium">
                  Connect With Me
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <SocialButton
                    icon="github"
                    label="GitHub"
                    link="https://github.com/ManikantaPotnuru9176"
                  />
                  <SocialButton
                    icon="linkedin"
                    label="LinkedIn"
                    link="https://www.linkedin.com/in/manikantapotnuru/"
                  />
                  <SocialButton
                    icon="twitter"
                    label="Twitter"
                    link="https://twitter.com/MANIKANTAPOTNU5"
                  />
                  <SocialButton
                    icon="email"
                    label="Email"
                    link="mailto:manikantapotnuru9176@gmail.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-sm text-gray-500 text-center w-full">
          <p>
            © {new Date().getFullYear()} • Check back soon for my complete
            portfolio!
          </p>
        </div>
      </div>
    </>
  )
}

// Enhanced social button component with animation
function SocialButton({
  icon,
  label,
  link,
}: {
  icon: string
  label: string
  link: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  const getIcon = () => {
    switch (icon) {
      case 'github':
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        )
      case 'linkedin':
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        )
      case 'twitter':
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        )
      case 'email':
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all duration-300 relative overflow-hidden ${
        isHovered ? 'text-white' : 'text-gray-300'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div
        className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 ${
          isHovered ? 'opacity-100' : ''
        } transition-opacity duration-300`}
      />
      <div
        className={`absolute inset-0 bg-gray-800 ${
          isHovered ? 'scale-95' : 'scale-100'
        } transition-transform duration-300 rounded-md`}
      />
      <div className="relative z-10 flex items-center justify-center gap-2">
        {getIcon()}
        <span
          className={`transform transition-all duration-300 ${
            isHovered ? 'translate-x-1' : ''
          }`}>
          {label}
        </span>
      </div>
    </a>
  )
}
