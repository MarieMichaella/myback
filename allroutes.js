import express from "express"
import blogRoute from "./blogRoute.js"
import signupRoute from "./signuproute.js"
import loginRoute from "./loginroute.js"
import messageRoute from "./messageroute.js"
import logoutroute from "./loginroute.js"
const router = express.Router()

router.use("/blogs",  blogRoute )
router.use("/signup", signupRoute)
router.use("/login", loginRoute)
router.use("/sendmessage", messageRoute)
router.use("/logout", logoutroute)


export default router