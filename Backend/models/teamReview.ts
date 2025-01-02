import mongoose,{Schema} from "mongoose";
export interface ITeamReview extends Document {
  teamId: mongoose.Types.ObjectId; // Reference to the team being reviewed
  reviewerId: mongoose.Types.ObjectId; // User who submitted the review
  rating: number; // Numeric rating (1-5)
  comment: string; // Optional feedback
}

const TeamReviewSchema: Schema = new Schema(
  {
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ITeamReview>('TeamReview', TeamReviewSchema);
