import express from "express"
import {login,logout,signup} from "../controllers/auth.controllers.js"
const routes = express()

routes.get("/login",login)
routes.get("/logout",logout)
routes.get("/signup",signup)

export default routes