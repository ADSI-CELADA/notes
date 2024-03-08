import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { conect } from "../db/mongoConect.js"
import { Users } from "../models/user.js"
import { TOKEN_SECRET } from "../config/config.js"

export const signUp = async (req, res, err) => {
    try {
        const { name, password } = req.body
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)

        let user = new Users({
            name,
            password: hash
        })

        const response = await user.save(req.body)
        return res.status(200).json({ data: "INSERT_OK", response })

    } catch (error) {
        return res.json({ data: "ERROR!!", error: error.code })
    }
}

export const sigIn = async (req, res) => {
    try {
        const { name, password } = req.body

        let user = await Users.find({ name })

        if (user == "") {
            return res.json({ data: "USER_NOT_FOUND" })
        } else {
            user.map((element) => {
                bcrypt.compare(password, element.password, async (error, isMatch) => {
                    if (isMatch) {
                        const { _id } = element
                        const token = jwt.sign({ _id }, TOKEN_SECRET, {
                            expiresIn: "1d"
                        })
                        return res.json({ data: "OK", token, user })
                    } else {
                        return res.json({ data: "ERROR_PASSWORD" })
                    }
                })
            })
        }
    } catch (error) {
        return res.status(500).json({ data: "ERROR!!", error })
    }
}

export const getData = async (req, res) => {
    try {
        const { token } = req.headers
        const decode = jwt.verify(token, TOKEN_SECRET)

        if (token) {
            const dataUser = await Users.find({ _id: decode._id })
            return res.status(200).json({ data: "OK", dataUser })
        } else {
            return res.json({ data: "error", })
        }

    } catch (error) {
        return res.status(500).json({ data: "ERROR!!", error })
    }
}