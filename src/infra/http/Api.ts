import { NextFunction, Request, Response } from "express";
import express from "express";
import VehicleController from "../../controller/VehicleController";
import errorMiddleware from "./middlewares/error";
import { authorize } from "./middlewares/authentication";
import AccountController from "../../controller/AccountController";
import PgPromiseConnectionAdapter from "../database/PgPromiseConnectionAdapter";
const app = express();
const router = express.Router();

// Database Connection
const connection = new PgPromiseConnectionAdapter()

app.use(express.json());
app.use('/api', router);

// Main Route
router.get('/', async (request: Request, response: Response) => response.end());

// Vehicle Routes
const vehicleConroller = new VehicleController(connection);
router.get('/vehicle', authorize, async (req: Request, res: Response, next: NextFunction) => await vehicleConroller.list(req, res, next), errorMiddleware);
router.post('/book/vehicle', authorize, async (req: Request, res: Response, next: NextFunction) => await vehicleConroller.bookVehicle(req, res, next), errorMiddleware);
router.put('/return/vehicle', authorize, async (req: Request, res: Response, next: NextFunction) => await vehicleConroller.returnVehicle(req, res, next), errorMiddleware);

// Account | Authenticate Routes
const accountController = new AccountController(connection);
router.post('/authenticate', async (req: Request, res: Response, next: NextFunction) => await accountController.authenticate(req, res, next), errorMiddleware);

export default app;