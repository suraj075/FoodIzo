import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRoutes.js"
import dotenv from "dotenv"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"
import resetRouter from "./routes/resetPassRoute.js"
import adminRouter from "./routes/adminRoutes.js"
import resetPasswordRouter from "./routes/adminPasswordRecovery.js"

dotenv.config()


//app config
const app = express()
const port = process.env.PORT || 4000
//using cosrs you can access backend from any frontend
const allowedOrigins = [
    "https://foodizo-frontend-h5rj.onrender.com",
    "https://foodizo-admin.onrender.com","https://foodizo-frontend.onrender.com"
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
app.use(express.urlencoded({extended:true}))
//middleware
app.use(express.json())
//db connection
connectDB();




// api endpoints
app.use("/api/food",foodRouter)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/reset",resetRouter)
app.use("/api/admin",adminRouter)
app.use("/api/admin/reset",resetPasswordRouter)


 //using this middleware  whenever we get request from frontend to backend that will we parse using this json
// using this we can access backend from any frontend

app.get("/",(req,res)=>{
    res.send("API WORKING")
})


app.listen(port,()=>{
    console.log(`server started on http://localhost${port}`)
})

