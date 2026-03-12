import { Request, Response } from "express";
import nodemailer, { Transporter } from "nodemailer";
import mailConfig from "../config/mail";
import { TransportOptions } from "nodemailer";

class Mail {
    private transporter: Transporter;

    constructor() {
        const options = mailConfig as TransportOptions;
        this.transporter = nodemailer.createTransport(options);
    }
    
    sendEmail(message: nodemailer.SendMailOptions) {
        return this.transporter.sendMail({
            ...mailConfig.default,
            ...message
        });
    }
}

export default new Mail()