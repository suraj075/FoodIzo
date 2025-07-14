import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder,verifyOrder,userOrders, allOrders, statusUpdate } from '../controller/orderController.js'

const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.post('/verify',verifyOrder)
orderRouter.post('/userorders',authMiddleware,userOrders)
orderRouter.post('/allorders',allOrders)
orderRouter.post('/status',statusUpdate)

export default orderRouter;