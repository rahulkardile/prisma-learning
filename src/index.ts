import express, { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"

import userRoute from "./routes/route.user";
import todoRoute from "./routes/route.post";

const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res, next) => {
    try {
        res.send("running fine!");
    } catch (error) {
        next(error);
    }
})

app.use("/api/user", userRoute);
app.use("/api/todo", todoRoute);

app.use("*", (req: Request, res: Response, next: NextFunction)=>{
    try {
        res.status(404).json({
            success: true,
            message: "route not found!"
        });
    } catch (error) {
        next(error);
    }
})

app.listen(PORT, () => console.log(`server is running at ${PORT} . . .`));