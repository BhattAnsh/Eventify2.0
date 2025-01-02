import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    user_id: string;
    name: string;
    email: string;
    eventCreated:mongoose.Types.ObjectId[];
    eventJoined:mongoose.Types.ObjectId[];
    eventVolunteered:mongoose.Types.ObjectId[];
    appliedEvent:mongoose.Types.ObjectId[];
    teamJoined:mongoose.Types.ObjectId[];
    ratings:mongoose.Types.ObjectId[];

}

const userSchema = new Schema({
    user_id:{
        type:String,
        required:true,
        unique:true,
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    eventCreated: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event"

        }
    ],
    eventJoined: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event"

        }
    ],
    eventVolunteered: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event"

        }
    ],
    appliedEvent: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event"

        }
    ],
    teamJoined: [
        {
            type: Schema.Types.ObjectId,
            ref: "Team"

        }
    ],
    ratings: [
        {
            type: Schema.Types.ObjectId,
            ref: "Ratings"

        }
    ]

}, {
  timestamps: true
});


// Method to compare password

export default mongoose.model<IUser>('User', userSchema);
