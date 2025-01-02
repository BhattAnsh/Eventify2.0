import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface VolunteerFormProps {
  eventId: string;
  eventTitle: string;
}

interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function VolunteerForm({ eventId, eventTitle }: VolunteerFormProps) {
  const [formData, setFormData] = useState<VolunteerFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone) {
        toast.error('Please fill in all required fields');
        return;
      }

      console.log('Submitting form data:', { eventId, ...formData });
      toast.success('Successfully volunteered for the event!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to volunteer for event');
      console.error('Error:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
        >
          Volunteer Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Volunteer Registration</DialogTitle>
          <DialogDescription>
            Sign up to volunteer for: {eventTitle}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us why you'd like to volunteer..."
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <Button 
            onClick={handleSubmit}
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
          >
            Submit Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 