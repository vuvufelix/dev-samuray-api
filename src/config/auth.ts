type Auth = {
    secret: string,
    expiresIn: string
}

function authConfig(): Auth {
    return {
        secret: "usuarioEspecial54321",
        expiresIn: "7d"
    }
}

export default authConfig