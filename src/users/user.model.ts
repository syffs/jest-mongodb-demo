import mongoose, {Document, Schema} from "mongoose";
import Int32 from 'mongoose-int32'

import type {IUser} from '~/types/users'

Int32.loadType(mongoose)

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    external: {
        id: {
            type: String,
            unique: true,
            trim: true,
            index: true,
            sparse: true
        }
    },
    friend: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    child: Int32,
}, { versionKey: false });

userSchema.index({ id: 1 })

export const User = mongoose.model<IUser & Document>("User", userSchema);
