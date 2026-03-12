export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  default: {
    from: string;
  };
}

const mailConfig: MailConfig = {
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "0eb47b50e39841",
    pass: "11fba6ea083792",
  },
  default: {
    from: "Sistema <dev@Samuray.com>",
  },
};

export default mailConfig;