import mongoose, { Schema, Document} from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  locationCoordinates: {
    latitude: number;
    longitude: number;
  };
  category: string;
  capacity: number;
  price?: number;
  imageUrl?: string;
  createdBy: string;
  attendees: mongoose.Types.ObjectId[];
  appliedVolunteers: mongoose.Types.ObjectId[];
  appliedAttendees: mongoose.Types.ObjectId[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'canceled';
  tags: string[];
  faq: { question: string; answer: string }[];
  agenda: { time: string; activity: string; speaker?: string }[];
  totalAttendees?: number;
}

const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    locationCoordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    category: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number, default: 0 },
    imageUrl: { type: String },
    createdBy:{type:String, required: true},
    attendees: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },
    appliedVolunteers: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },
    appliedAttendees: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'canceled'],
      default: 'upcoming',
    },
    tags: { type: [String], default: [] },
    faq: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
      default: [],
    },
    agenda: {
      type: [
        {
          time: { type: String },
          activity: { type: String },
          speaker: { type: String },
        },
      ],
      default: [],
    },
    totalAttendees: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>('Event', EventSchema);
