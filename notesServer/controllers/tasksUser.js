import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config/config.js"
import { Tasks } from "../models/tasks.js"
import { Users } from "../models/user.js"
// import { DatesTask } from "../models/datesTask.js"

export const getTasks = async (req, res) => {
    try {
        const { token } = req.headers
        const decode = jwt.verify(token, TOKEN_SECRET)
        if (token) {
            const tasks2 = await Tasks.find({ user: decode._id })
            if (tasks2) {
                const tasks = await Tasks.find({ user: decode._id, dateDelete: null })
                return res.status(200).json({ data: "ok!", tasks })
            }
        } else {
            return res.status(500).json({ data: "NO_LOGIN" })
        }
    } catch (error) {
        return res.status(500).json({ data: "ERROR!!", error })
    }
}

export const newTask = async (req, res) => {
    try {
        const { token } = req.headers
        const { titulo, description } = req.body
        const decode = jwt.verify(token, TOKEN_SECRET)
        if (token) {

            const task = new Tasks({
                titulo,
                description,
                user: decode._id,
                dateCreate: new Date,
                dateDelete: null
            })

            await task.save()

            return res.status(200).json({ data: "INSERT_OK", task })
        } else {
            return res.json({ data: "NO_LOGIN" })
        }
    } catch (error) {
        return res.status(500).json({ data: "ERROR!!", error })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { token } = req.headers
        const decode = jwt.verify(token, TOKEN_SECRET)
        const task = await Tasks.find({ _id: req.params.id, user: decode._id })
        if (token) {
            if (task) {
                const updateTask = await Tasks.updateOne({ _id: req.params.id }, { $set: { dateDelete: new Date } })
                return res.json({ data: "DELETE_OK", updateTask })
            } else {
                return res.json({ data: "NO_TASK", task })
            }
        } else {
            return res.json({ data: "NO_LOGIN" })
        }
    } catch (error) {
        return res.status(500).json({ data: "ERROR!!", error })
    }


}