'use client'

import { useEffect, useState } from 'react'
import { eventStorage } from '@/utils/storage'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  userId: string;
  createdAt: string;
  type: 'hosted' | 'volunteering' | 'participated';
  status: 'past' | 'upcoming';
}

export default function MyEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [timeRange, setTimeRange] = useState('7days')

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const userEvents = [
        ...eventStorage.getUserEvents(user.email),
        ...eventStorage.getUserEvents(user.email),
        ...eventStorage.getUserEvents(user.email),
      ]
      setEvents(userEvents as Event[])
    } catch (error) {
      console.error('Error loading events:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const filterEvents = (type: Event['type']) => events.filter(event => event.type === type)

  const handleTimeRangeChange = async (range: string) => {
    setIsUpdating(true)
    try {
      setTimeRange(range)
      // await fetchUpdatedData(range)
    } catch (error) {
      console.error('Error updating time range:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Activity Card */}
          <div className="lg:col-span-4 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Activity</h2>
              <select 
                className="text-sm text-gray-500"
                value={timeRange}
                onChange={(e) => handleTimeRangeChange(e.target.value)}
                disabled={isUpdating}
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
              </select>
            </div>
            {isUpdating ? (
              <div className="animate-pulse">Loading...</div>
            ) : (
              // Your activity chart component
              <div>{/* Chart component */}</div>
            )}
          </div>

          {/* Progress Statistics */}
          <div className="lg:col-span-4 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Progress Statistics</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{filterEvents('hosted').length}</div>
                <div className="text-sm text-gray-500">Hosted</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{filterEvents('volunteering').length}</div>
                <div className="text-sm text-gray-500">Volunteering</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{filterEvents('participated').length}</div>
                <div className="text-sm text-gray-500">Participated</div>
              </div>
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="lg:col-span-4 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Next Event</h2>
              <button className="text-sm text-indigo-600">View all</button>
            </div>
            {/* Add your next event details here */}
          </div>

          {/* Events Schedule with loading state */}
          <div className="lg:col-span-12 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">My Schedule</h2>
              <div className="flex gap-2">
                <button 
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                  disabled={isUpdating}
                >
                  <span className="sr-only">Previous</span>
                  {/* Add left arrow icon */}
                </button>
                <button 
                  className="px-4 py-2 text-sm disabled:opacity-50"
                  disabled={isUpdating}
                >
                  Today
                </button>
                <button 
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                  disabled={isUpdating}
                >
                  <span className="sr-only">Next</span>
                  {/* Add right arrow icon */}
                </button>
              </div>
            </div>
            {isUpdating ? (
              <div className="animate-pulse">Loading schedule...</div>
            ) : (
              // Your events list component
              <div>{/* Events list component */}</div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}