'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Clock} from 'lucide-react';
import { dataManager } from '@/utils/dataManager';
import Image from 'next/image';
import { Search } from 'lucide-react';
import Navbar from '@/components/navbar';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date?: string;
  time?: string;
  location?: string;
  category: string;
}

export default function FindEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get categories using dataManager
  const categories = dataManager.getCategories();


  useEffect(() => {
    // Load initial data
    const allEvents = dataManager.getAllEvents();
    setEvents(allEvents);
    setFilteredEvents(allEvents);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let filtered = events;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, events]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Find Events
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
              Discover meaningful opportunities to make a difference in your community
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 h-12 bg-gray-50 border-gray-200"
                />
              </div>
              
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-[180px] h-12 bg-gray-50 border-gray-200">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300">
                {event.imageUrl && (
                  <div className="relative w-full pt-[66%] overflow-hidden">
                    <Image 
                      src={event.imageUrl} 
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={false}
                    />
                  </div>
                )}

                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <p className="text-sm text-gray-500 line-clamp-2">{event.description}</p>
                </CardHeader>

                <CardContent className="flex-grow space-y-3">
                  <div className="space-y-2 text-sm text-gray-500">
                    {event.date && (
                      <p className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </p>
                    )}
                    {event.time && (
                      <p className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </p>
                    )}
                    {event.location && (
                      <p className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {event.category}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Link href={`/events/${event.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No Results State */}
          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <p className="text-lg text-gray-500">
                No events found matching your criteria.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
