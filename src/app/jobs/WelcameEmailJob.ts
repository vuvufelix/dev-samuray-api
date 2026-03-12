import Mail from "../../lib/Mail"


class WelcameEmailJob {
    get key(): string {
        return "WelcameEmailJob"
    }

    async handle(job: any) {
        const { email, name } = job.data

        Mail.sendEmail({
            to: email,
            subject: "Bem-vindo ao sistema",
            text: `Olá ${name}, seja bem-vindo ao nosso sistema!`
        })
    }
}

export default new WelcameEmailJob()