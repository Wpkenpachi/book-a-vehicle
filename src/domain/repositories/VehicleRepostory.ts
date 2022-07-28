import Vehicle from "../Vehicle";

export default interface VehicleRepository {
    register(vehicle: Vehicle): Promise<void>;
    list(): Promise<Vehicle[]>;
};