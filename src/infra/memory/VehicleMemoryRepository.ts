import Vehicle from "../../domain/Vehicle";
import VehicleRepository from "../../domain/repositories/VehicleRepostory";

export default class VehicleMemoryRepository implements VehicleRepository {
    vehicles: Vehicle[];

    constructor() {
        this.vehicles = [];
    }

    async register(vehicle: Vehicle): Promise<void> {
        this.vehicles.push(vehicle);
    }

    async list(): Promise<Vehicle[]> {
        return this.vehicles;
    }

}