"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import axios from 'axios';
function Hero() {
    const test = () =>{
        axios.get("http://127.0.0.1:8000/api/auth/test")
    }
  return (
    <section className="w-full min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-gray-950 py-16 lg:py-24">
      {/* Background gradients - adjusted for mobile */}
      <div className="absolute inset-0 w-full h-full bg-white dark:bg-gray-950">
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_400px_at_50%_100px,#e9d5ff,transparent)]" />
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      </div>

      {/* Decorative elements - adjusted size for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 md:w-96 md:h-96 rounded-full bg-purple-200/50 dark:bg-purple-900/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 md:w-96 md:h-96 rounded-full bg-blue-200/50 dark:bg-blue-900/20 blur-3xl" />
      </div>

      <div className="container mx-auto relative px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left content - centered on mobile */}
          <div className="flex-1 text-center space-y-6 lg:space-y-8 lg:text-left">
            <div className="space-y-4">
              {/* Launch badge - made more compact on mobile */}
              <div className="inline-block">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-xs sm:text-sm leading-6 text-purple-600 dark:text-purple-400 ring-1 ring-purple-600/10 dark:ring-purple-400/30 hover:ring-purple-600/20 bg-purple-50/50 dark:bg-purple-400/10">
                  🎉 Launching Soon
                  <a href="#waitlist" className="font-semibold text-purple-600 dark:text-purple-400 ml-1">
                    Join waitlist <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>

              {/* Heading - centered on mobile */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 animate-gradient">
                Create, Manage, and Promote Your Events
              </h1>

              {/* Description - centered on mobile */}
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-[90%] mx-auto lg:mx-0">
                Eventify is your all-in-one platform for seamless event planning
                and attendance. Bring your ideas to life and connect with your
                audience.
              </p>
            </div>

            {/* Buttons - centered horizontally on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center lg:justify-start">
              <Button
                size="lg"
                className="w-[160px] sm:w-auto bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 animate-gradient bg-[length:200%_auto]"
              >
                <Link href="/find-events" className="flex items-center justify-center gap-2 w-full">
                  Find Events
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-[160px] sm:w-auto border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <Link href="/create-event" className="flex items-center justify-center gap-2 w-full">
                  Create Event
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-[160px] sm:w-auto border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              onClick={test}>
              </Button>
            </div>
          </div>

          {/* Right side illustration - hidden on mobile */}
          <div className="flex-1 relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[600px] aspect-square mt-8 lg:mt-0 hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl sm:rounded-3xl transform rotate-3 scale-95" />
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl sm:rounded-3xl transform -rotate-3 scale-95" />
            <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
