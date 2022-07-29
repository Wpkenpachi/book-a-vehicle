import { Request, Response } from "express";
import VehicleRepository from "../domain/VehicleRepostory";
import VehicleReservationRepository from "../domain/VehicleReservationRepostory";
import VehicleMemoryRepository from "../infra/memory/VehicleMemoryRepository";
import VehicleReservationMemoryRepository from "../infra/memory/VehicleReservationMemoryRepository";
import BookVehicleDto from "./BookVehicleDto";
import ReturnVehicleDto from "./ReturnVehicleDto";

export default class VehicleController {
    vehicleRepository: VehicleRepository;
    vehicleReservationRepository: VehicleReservationRepository;

    constructor() {
        this.vehicleRepository = new VehicleMemoryRepository();
        this.vehicleReservationRepository = new VehicleReservationMemoryRepository();
    }

    async list(request: Request, response: Response): Promise<any> {
        const vehicles = await this.vehicleRepository.list();
        const mappedVehicles = vehicles.map<BookVehicleDto>(({ plate }) => ({ plate }));
        response.json(mappedVehicles);
    }

    async bookVehicle(request: Request, response: Response): Promise<any> {
        const vehicle: BookVehicleDto = request.body;
        try {
            //await this.vehicleReservationRepository.book(vehicle);
            response.end();
        } catch (error) {
            throw error;
        }
    }

    async returnVehicle(request: Request, response: Response): Promise<any> {
        const { account_id, plate }: ReturnVehicleDto = request.body;
        try {
            await this.vehicleReservationRepository.returnVehicle(account_id, plate);
            response.end();
        } catch (error) {
            throw error;
        }
    }
}