import { Router } from "express";
import UsersController from "./app/controllers/UsersController";
import SessionsController from "./app/controllers/SessionsController";
import auth from "./app/middlewares/auth";
import multer from "multer";
import multerConfig from "./config/multer";
import FilesController from "./app/controllers/FilesController";

const routes = Router()
const upload = multer(multerConfig)

// Sessão
routes.post("/session", SessionsController.login)

routes.use(auth)

routes.get("/user", UsersController.index)
routes.post("/user", UsersController.create)
routes.get("/user/:id", UsersController.show)
routes.put("/user/:id", UsersController.update)
routes.delete("/user/:id", UsersController.destroy)

routes.post("/file", upload.single("file"), FilesController.create)

export default routes