import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  image: string;
  price: number; // Cost for hiring the team
  specialization: string; // Area of expertise (e.g., logistics, decorations, etc.)
  members: mongoose.Types.ObjectId[]; // References to users in the team
  pastEvents: mongoose.Types.ObjectId[]; // References to past events
  reviews: mongoose.Types.ObjectId[]; // References to team reviews
  averageRating: number; // Average rating of the team
}

const TeamSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    specialization: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    pastEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'TeamReview' }],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ITeam>('Team', TeamSchema);
