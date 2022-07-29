import { Request, response, Response } from "express";
import express from "express";
import VehicleController from "../../controller/VehicleController";
const app = express();
const router = express.Router();

app.use('/api', router);

router.get('/', function(request: Request, response: Response) {
    response.json();
});

router.get('/vehicle', new VehicleController().list);
router.post('/book/vehicle', new VehicleController().bookVehicle);
router.put('/return/vehicle', new VehicleController().returnVehicle);

app.listen(3000);