import { Request, Response } from "express";
import authConfig from "../../config/auth";
import { prisma } from "../../database/prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

class SessionsController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body

        const user = await prisma.usuarios.findFirst({
            where: {
                email: email
            }
        })

        if(!user) return res.status(404).json({ error: "Usuários não encontrado!" })

        const verify = await bcrypt.compare(password, user.password)

        if(!verify) return res.status(401).json({ error: "Pawword não existe no banco" })

        return res.json({
            user: user,
            token: jwt.sign({ id: user.id.toString() }, authConfig().secret, {
                expiresIn: "7d"
            })
        })

        
    }
}

export default new SessionsController()