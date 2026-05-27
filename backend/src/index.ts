import express from "express"
import productRouter from "./routes/productRoute"
import groupRouter from "./routes/groupRoute"
import errorHandler from "./middlewares/errorHandler"

const app = express()

app.use(express.json())

app.use(productRouter)
app.use(groupRouter)

app.use(errorHandler)

export default app