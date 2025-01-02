"use client";
import React from "react";


function Review() {
  return (
    <>
      <section className="w-full h-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Eventify has revolutionized how we manage our conferences. Its
                user-friendly and feature-packed!
              </p>
              <p className="font-bold">- Sarah J., Event Organizer</p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                I love how easy it is to find and register for events in my
                area. Great platform!
              </p>
              <p className="font-bold">- Mike T., Attendee</p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                The promotional tools have helped us increase our event
                attendance by 50%. Highly recommended!
              </p>
              <p className="font-bold">- Emily R., Marketing Manager</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Review;
