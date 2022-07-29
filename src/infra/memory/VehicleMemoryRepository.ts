import Vehicle from "../../domain/Vehicle";
import VehicleRepository from "../../domain/VehicleRepostory";

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