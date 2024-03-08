import mongoose from "mongoose";

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: { type: String, require: true, unique: true },
    password: { type: String, require: true }
})

export const Users = mongoose.model('users', UserSchema)

