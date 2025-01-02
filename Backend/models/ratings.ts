import mongoose, { Schema, Document } from 'mongoose';

export interface IUserRating extends Document {
    ratedUserId: mongoose.Types.ObjectId; // The user receiving the rating
    reviewerId: mongoose.Types.ObjectId; // The user giving the rating
    rating: number; // Numeric rating (e.g., 1-5)
    comment?: string; // Optional comment for feedback
    createdAt: Date;
    updatedAt: Date;
}
const UserRatingSchema: Schema = new Schema(
    {
        ratedUserId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        reviewerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            trim: true
        },
    },
    { timestamps: true }
);

export default mongoose.model<IUserRating>('UserRating', UserRatingSchema);
