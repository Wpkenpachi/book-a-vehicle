import Vehicle from "../../domain/Vehicle";
import VehicleRepository from "../../domain/VehicleRepostory";

export default class VehicleMemoryRepository implements VehicleRepository {
    private vehicles: Vehicle[] = [];

    constructor() {
        this.vehicles = [];
    }
    
    async get(plate: string): Promise<Vehicle|undefined> {
        return this.vehicles.find((vehicle) => vehicle.plate === plate);
    }

    async register(vehicle: Vehicle): Promise<void> {
        this.vehicles.push(vehicle);
    }

    async list(): Promise<any[]> {
        return this.vehicles;
    }
}