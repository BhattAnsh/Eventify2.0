'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { eventStorage } from '@/utils/storage';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useToast } from "@/components/ui/use-toast";
import Image from 'next/image';

export default function CreateEvent() {
  const router = useRouter();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.email) {
        throw new Error('User not logged in');
      }

      eventStorage.createEvent({
        ...eventData,
        userId: user.email
      });
      
      toast({
        title: "Success!",
        description: "Event created successfully"
      });
      
      router.push('/my-events');
    } catch (error) {
      console.error('Failed to create event:', error);
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12 px-4 md:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 border">
                <h1 className="text-3xl font-bold mb-8">Create New Event</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="image">Event Image</Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <label
                        htmlFor="image"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        {previewImage ? (
                          <div className="w-full h-40 relative rounded-lg overflow-hidden">
                            <Image
                              src={previewImage}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-40 bg-gray-50 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </div>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {previewImage ? 'Click to change image' : 'Click to upload event image'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={eventData.title}
                      onChange={(e) => setEventData({...eventData, title: e.target.value})}
                      className="bg-background"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={eventData.date}
                        onChange={(e) => setEventData({...eventData, date: e.target.value})}
                        className="bg-background"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={eventData.time}
                        onChange={(e) => setEventData({...eventData, time: e.target.value})}
                        className="bg-background"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={eventData.location}
                      onChange={(e) => setEventData({...eventData, location: e.target.value})}
                      className="bg-background"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={eventData.category}
                      onValueChange={(value) => setEventData({...eventData, category: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Environment">Environment</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Community Service">Community Service</SelectItem>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Animal Welfare">Animal Welfare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      value={eventData.description}
                      onChange={(e) => setEventData({...eventData, description: e.target.value})}
                      className="w-full min-h-[100px] p-3 rounded-md border bg-background"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Event'}
                  </Button>
                </form>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-6 space-y-6">
                  <div className="bg-card rounded-lg shadow-lg p-6 border">
                    <h2 className="text-xl font-semibold mb-4">Event Preview</h2>
                    <div className="space-y-6">
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                        {previewImage ? (
                          <Image
                            src={previewImage}
                            alt="Event preview"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            No image uploaded
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {eventData.title || 'Event Title'}
                          </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Date</p>
                            <p>{eventData.date || 'Not set'}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Time</p>
                            <p>{eventData.time || 'Not set'}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p>{eventData.location || 'Not set'}</p>
                        </div>

                        <div>
                          <p className="text-muted-foreground">Category</p>
                          <p>{eventData.category || 'Not set'}</p>
                        </div>

                        <div>
                          <p className="text-muted-foreground">Description</p>
                          <p className="text-sm line-clamp-3">
                            {eventData.description || 'No description provided'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg shadow-lg p-6 border">
                    <h2 className="text-xl font-semibold mb-4">Event Creation Guide</h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Add a compelling title that clearly describes your event
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Upload a high-quality image to attract participants
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Provide detailed information about date, time, and location
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Choose the most relevant category for your event
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
  );
}
