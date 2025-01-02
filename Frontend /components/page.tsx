"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Users, Megaphone, ArrowRight } from "lucide-react";
import Navbar from "./navbar";
import Hero from "./Hero";
import Review from "./Review";
import Footer from "./footer";
export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Key Features Section - Clean white design */}
        <section className="relative w-full py-20 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
                Key Features
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-[600px] mx-auto text-base sm:text-lg">
                Everything you need to create and manage successful events
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Calendar,
                  title: "Event Creation",
                  description: "Easily create and customize your events with our intuitive interface."
                },
                {
                  icon: Users,
                  title: "Attendee Management",
                  description: "Efficiently manage registrations, tickets, and attendee information."
                },
                {
                  icon: Megaphone,
                  title: "Promotion Tools",
                  description: "Boost your event visibility with built-in marketing and social sharing features."
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="group relative p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="relative space-y-4">
                    <div className="inline-flex p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                      <feature.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section - Clean white design */}
        <section className="relative w-full py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
                How It Works
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-[600px] mx-auto text-base sm:text-lg">
                Get started with Eventify in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Create Your Event",
                  description: "Set up your event details, ticketing, and customize your event page."
                },
                {
                  step: "2",
                  title: "Promote and Sell",
                  description: "Use our tools to spread the word and sell tickets to your audience."
                },
                {
                  step: "3",
                  title: "Host Your Event",
                  description: "Manage attendees, track analytics, and make your event a success."
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="relative p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm"
                >
                  <div className="relative space-y-4">
                    <div className="w-12 h-12 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center text-xl font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Review />

        {/* CTA Section - Keeping the gradient here */}
        <section className="relative w-full py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0">
            {/* Subtle gradient background only for CTA */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,#faf5ff,transparent)]" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative">
            <div className="max-w-2xl mx-auto">
              <div className="text-center space-y-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                  Join thousands of event organizers and attendees on Eventify.
                </p>

                <div className="max-w-md mx-auto space-y-4">
                  <form className="flex flex-col sm:flex-row gap-3">
                    <Input
                      className="flex-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Sign Up
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    By signing up, you agree to our{" "}
                    <Link className="text-purple-600 dark:text-purple-400 hover:underline" href="#">
                      Terms & Conditions
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
