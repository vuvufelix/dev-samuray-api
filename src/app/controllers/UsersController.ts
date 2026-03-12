import { Request, Response } from "express"
import { prisma } from "../../database/prismaClient"
import * as Yup from "yup"
import bcrypt from "bcryptjs"

import DummyJob from "../jobs/DummyJobs"
import Queue from "../../lib/Queue"
import WelcameEmailJob from "../jobs/WelcameEmailJob"

class UsersController {

    async create(req: Request, res: Response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).max(8).required(),
            passwordConfirmation: Yup.string().when("password", (password, field) => 
                password ? field.required().oneOf([Yup.ref("password")]) : field
            )
        })

        if(!(await schema.isValid(req.body))) return res.status(400).json({ error: "Erro em validar o schema" })

        const { name, email, password, file_id } = req.body

        const password_hash = await bcrypt.hash(password, 8)

        const saveData = await prisma.usuarios.create({
            data: {
                name,
                email,
                password: password_hash,
                file: {
                    connect: { id: file_id }
                }
            }
        })

        // //Enviar mensagem
        // Mail.sendEmail({
        //     to: email,
        //     subject: "Bem-vindo ao sistema",
        //     text: `Olá ${name}, seja bem-vindo ao nosso sistema!`
        // })

        // // Redis Fila
        await Queue.add(DummyJob.key, { message: "Olá Jobs" })
        await Queue.add(WelcameEmailJob.key, { email, name })

        return res.json(saveData)

    }

    async index(req: Request, res: Response) {
        const users = await prisma.usuarios.findMany()

        if(!users) return res.status(401).json({ message: "Não existe nenhum dados no banco de dados" })
        return res.status(200).json(users)
    }

    async show(req: Request, res: Response) {
        const { id } = req.params

        const user = await prisma.usuarios.findFirst({
            where: {
                id: Number(id)
            }
        })

        if(!user) return res.status(404).json({error: "Usuário não encontrado!"})

        return res.status(200).json(user)
    }

    async update(req: Request, res: Response) {

        // Verifica que o body está a trazer dados reais
        const sanitizedBody = Object.fromEntries(
            Object.entries(req.body).filter(([key, value]) => value !== undefined && value !== null && value !== "")
        )

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email("Email inválido"),
            oldPassword: Yup.string().min(6).max(8),
            password: Yup.string().when("oldPassword", {
                is: (val: string) => val !== undefined,
                then: (schema) => schema.required("A nova senha é obrigatória")
            }),
            passwordConfirmation: Yup.string().when("password", {
                is: (val: string) => val !== undefined,
                then: (schema) => schema.required("Confirme a senha").oneOf([Yup.ref("password")], "A senha não conferem")
            })
        })

        await schema.validate(sanitizedBody, { abortEarly: false })

        const { id } = req.params
        
        const userId = await prisma.usuarios.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!userId) return res.status(404).json({error: "Usuário não encontrado!"})

        const { oldPassword } = req.body

        //console.log(userId)
        const verify = await bcrypt.compare(oldPassword, userId.password)
        // Novo hash
        if(!verify) return res.status(404).json({ message: "A senha não confere" })

        const password_hash = await bcrypt.hash(req.body.password, 8)

        const updatedUser = await prisma.usuarios.update({
            where: {
                id: Number(id)
            },
            data: {
                password: password_hash,
            }
        })

        return res.status(200).json(updatedUser)
    }

    async destroy(req: Request, res: Response) {
        const { id } = req.params

        await prisma.usuarios.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(201).json({ message: "Usuário deletado com sucesso!" })
    }
}

export default new UsersController()