import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
    titulo : {type : String},
    description : {type : String},
    user : { type : mongoose.Schema.Types.ObjectId, ref : 'users' },
    dateCreate : {type : Date},
    dateDelete : {type : Date}
})

export const Tasks = mongoose.model('tasks', tasksSchema)