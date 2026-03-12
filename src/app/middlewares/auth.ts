import { Request, Response, NextFunction } from "express"
import { promisify } from "util"
import authConfig from "../../config/auth"
import jwt from "jsonwebtoken"

export default async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization

    if(!authHeader) return res.status(401).json({ error: "Token não aprovado" })

    const tokenWithoutBearer = authHeader.split(" ")[1]

    try {
        const  decoded = await jwt.verify(tokenWithoutBearer, authConfig().secret)

        next()
    } catch (error) {
        return res.status(401).json({ error: "Token inválido!" })
    }

}