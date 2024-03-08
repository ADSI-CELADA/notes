import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env["PORT"]
export const URIMGDB = process.env["URI"]
export const TOKEN_SECRET = process.env["TOKEN_SECRET"]

