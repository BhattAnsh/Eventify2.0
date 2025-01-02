'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Users, Share2 } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { dataManager } from '@/utils/dataManager';
import { QRCodeSVG } from 'qrcode.react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { volunteerManager } from '@/utils/volunteerManager';
import { auth } from '@/utils/auth';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date?: string;
  time?: string;
  location?: string;
  category: string;
  requirements?: string[];
  volunteersRegistered?: number;
  volunteersNeeded?: number;
}

export default function EventDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef<SVGSVGElement>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const eventData = dataManager.getEvent(id as string);
    if (eventData) {
      setEvent(eventData);
    }
  }, [id]);


  const generateEventUrl = () => {
    return typeof window !== 'undefined' ? window.location.href : '';
  };

  const QRDialog = () => (
    <Dialog open={showQR} onOpenChange={setShowQR}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Event: {event?.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6">
          <QRCodeSVG
            ref={qrRef}
            value={generateEventUrl()}
            size={256}
            level="H"
            includeMargin={true}
            className="mb-4"
          />
          <p className="text-sm text-gray-500 text-center mt-2">
            Scan this QR code to share the event
          </p>
          <Button 
            onClick={() => {
              if (!qrRef.current) return;
              const svg = qrRef.current;
              const svgData = new XMLSerializer().serializeToString(svg);
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const img = new window.Image();
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.download = `${event?.title ?? 'event'}-QR.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
              };
              img.src = "data:image/svg+xml;base64," + btoa(svgData);
            }}
            variant="outline"
            className="w-full mt-4"
          >
            Download QR Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const handleVolunteerRegistration = async () => {
    if (!auth.isAuthenticated()) {
      toast.error('Please login to volunteer');
      router.push('/login');
      return;
    }

    try {
      setIsRegistering(true);
      const user = auth.getUser();
      
      await volunteerManager.registerVolunteer(event!.id, user.id);
      setIsRegistered(true);
      toast.success('Successfully registered as volunteer!');
      
      // Refresh event data
      const updatedEvent = dataManager.getEvent(id as string);
      if (updatedEvent) {
        setEvent(updatedEvent);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to register');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCancelRegistration = async () => {
    if (!auth.isAuthenticated()) return;

    try {
      const user = auth.getUser();
      await volunteerManager.cancelRegistration(event!.id, user.id);
      setIsRegistered(false);
      toast.success('Registration cancelled successfully');
      
      // Refresh event data
      const updatedEvent = dataManager.getEvent(id as string);
      if (updatedEvent) {
        setEvent(updatedEvent);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to cancel registration');
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-12">
            <Image 
              src={event.imageUrl}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
              <span className="px-3 py-1 rounded-full bg-primary/90 text-sm">
                {event.category}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <Button
                variant="secondary"
                className="bg-white/90 hover:bg-white"
                onClick={() => setShowQR(true)}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Event
              </Button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                <p className="text-gray-600">{event.description}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {event.requirements?.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Event Details Card */}
              <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                <h3 className="text-xl font-semibold mb-4">Event Details</h3>
                <div className="space-y-3">
                  {event.date && (
                    <p className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-3 text-primary" />
                      {event.date}
                    </p>
                  )}
                  {event.time && (
                    <p className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-3 text-primary" />
                      {event.time}
                    </p>
                  )}
                  {event.location && (
                    <p className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-3 text-primary" />
                      {event.location}
                    </p>
                  )}
                  {event.volunteersRegistered !== undefined && event.volunteersNeeded !== undefined && (
                    <p className="flex items-center text-black">
                      <Users className="w-5 h-5 mr-3 text-black" />
                      {event.volunteersRegistered}/{event.volunteersNeeded} Volunteers
                    </p>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setShowQR(true)}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Generate Event QR
                </Button>
              </div>

              {/* Volunteer Registration Section */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-semibold mb-6">Volunteer Registration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Available Spots</span>
                    <span className="font-medium">
                      {event.volunteersNeeded! - event.volunteersRegistered!} remaining
                    </span>
                  </div>
                  
                  {isRegistered ? (
                    <div className="space-y-3">
                      <div className="bg-green-50 text-green-700 px-4 py-2 rounded-md text-sm">
                        You are registered for this event
                      </div>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={handleCancelRegistration}
                      >
                        Cancel Registration
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={handleVolunteerRegistration}
                      disabled={isRegistering || event.volunteersRegistered! >= event.volunteersNeeded!}
                    >
                      {isRegistering ? (
                        "Registering..."
                      ) : event.volunteersRegistered! >= event.volunteersNeeded! ? (
                        "Event Full"
                      ) : (
                        "Register Now"
                      )}
                    </Button>
                  )}
                  
                  {event.volunteersRegistered! >= event.volunteersNeeded! && !isRegistered && (
                    <p className="text-sm text-gray-500 text-center">
                      This event is fully booked. Please check other events.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <QRDialog />
    </div>
  );
}